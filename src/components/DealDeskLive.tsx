import { useState, useEffect } from 'react';
import { MessageSquare, Upload, Clock, CheckCircle, X, Phone, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const DealDeskLive = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'button' | 'form' | 'upload' | 'submitted'>('button');
  const [queueTime, setQueueTime] = useState(11);
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Simulate dynamic queue time
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueTime((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(8, Math.min(15, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // MOCK - In production, this would upload to server
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(f => f.name);
      setUploadedFiles([...uploadedFiles, ...fileNames]);
    }
  };

  const handleSubmit = () => {
    // MOCK - In production, this would send to API/webhook
    console.log('Deal desk submission:', {
      businessName,
      contactName,
      phone,
      message,
      files: uploadedFiles,
      timestamp: new Date(),
    });
    setStep('submitted');
  };

  if (step === 'button') {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
        <Button
          onClick={() => {
            setIsOpen(true);
            setStep('form');
          }}
          className="btn-hero px-6 py-6 rounded-full shadow-gold-glow hover:shadow-gold-glow hover:scale-110 transition-all duration-300 group"
        >
          <MessageSquare className="w-5 h-5 mr-2 group-hover:animate-pulse" />
          <div className="text-left">
            <div className="font-bold">Deal Desk Live</div>
            <div className="text-xs opacity-90">~{queueTime} min wait</div>
          </div>
        </Button>

        {/* Pulsing indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl card-premium p-8 relative animate-slideUp">
        <button
          onClick={() => {
            setIsOpen(false);
            setStep('button');
          }}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>

        {step === 'form' && (
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold">Deal Desk Live</h2>
                <p className="text-sm text-muted-foreground">Human response in 30 minutes, guaranteed</p>
              </div>
            </div>

            {/* Queue Time Banner */}
            <div className="glass p-4 rounded-lg mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-accent mr-3" />
                <div>
                  <p className="font-semibold">Current Queue Time</p>
                  <p className="text-sm text-muted-foreground">Estimated response</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-accent">~{queueTime} min</p>
                <p className="text-xs text-muted-foreground">3 deals ahead of you</p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="ABC Company LLC"
                  className="mt-1"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Your Name</Label>
                  <Input
                    id="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="John Smith"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message">What do you need? (Optional)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="E.g., Need $150K for expansion, have 3 months bank statements ready..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep('upload')}
                className="flex-1 btn-hero"
                disabled={!businessName || !contactName || !phone}
              >
                Continue to Upload
              </Button>
              <Button
                onClick={handleSubmit}
                variant="premium"
                disabled={!businessName || !contactName || !phone}
              >
                Skip Upload
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Upload documents now or email them later - we'll reach out either way
            </p>
          </div>
        )}

        {step === 'upload' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-display font-bold mb-2">Upload Documents (Optional)</h2>
              <p className="text-muted-foreground">
                Speed up underwriting by uploading now. Or we'll request via email after our call.
              </p>
            </div>

            {/* What to Upload */}
            <div className="glass p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-4">What We Need:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                  3 months business bank statements (PDF)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                  Voided business check or bank letter
                </li>
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 opacity-50" />
                  Driver's license (optional, speeds up verification)
                </li>
              </ul>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-accent/30 rounded-lg p-8 text-center mb-6 hover:border-accent/50 transition-colors">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="font-semibold mb-2">Drop files here or click to upload</p>
                <p className="text-sm text-muted-foreground">PDF, JPG, PNG up to 10MB each</p>
              </label>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="glass p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-3 text-sm">Uploaded Files ({uploadedFiles.length})</h4>
                <ul className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-2" />
                        {file}
                      </span>
                      <button
                        onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={() => setStep('form')} variant="premium">
                Back
              </Button>
              <Button onClick={handleSubmit} className="flex-1 btn-hero">
                Submit to Deal Desk
              </Button>
            </div>
          </div>
        )}

        {step === 'submitted' && (
          <div className="text-center py-8 animate-fadeIn">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>

            <h2 className="text-3xl font-display font-bold mb-3">You're in the Queue!</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We'll call {contactName} at {phone} within {queueTime} minutes
            </p>

            <div className="glass p-6 rounded-lg mb-8 max-w-md mx-auto">
              <h3 className="font-semibold mb-4">What Happens Next:</h3>
              <ol className="text-left space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="font-bold text-accent mr-3">1.</span>
                  <span>Underwriter calls you to discuss your needs</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-accent mr-3">2.</span>
                  <span>You email bank statements (if you didn't upload)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-accent mr-3">3.</span>
                  <span>Receive verbal offer within 30 minutes of review</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-accent mr-3">4.</span>
                  <span>Sign contract, funds in bank next business day</span>
                </li>
              </ol>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => {
                  setIsOpen(false);
                  setStep('button');
                }}
                className="btn-hero"
              >
                <Phone className="w-4 h-4 mr-2" />
                Got It
              </Button>
              <Button variant="outline" onClick={() => setStep('form')}>
                Submit Another Deal
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Confirmation sent to {phone}. Check your phone!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealDeskLive;
