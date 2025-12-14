import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

import { useToast } from "@/components/ui/use-toast";
import { submitLead } from "@/lib/supabase";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await submitLead({
      contact_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      lead_type: 'contact'
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error requesting call",
        description: "Please try again or call us strictly at 347-596-7722.",
      });
      return;
    }

    toast({
      title: "Request Received",
      description: "A funding specialist will contact you shortly.",
    });

    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Get in <span className="text-gradient-gold">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to get funded? Our team of funding experts is standing by to help 
            you secure the capital your business needs to grow.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="card-premium p-8">
              <h3 className="text-2xl font-display font-bold mb-6">
                Contact Our Funding Experts
              </h3>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Call Us Now</h4>
                    <p className="text-2xl font-bold text-accent mb-1">347-596-7722</p>
                    <p className="text-sm text-muted-foreground">
                      Speak with a funding specialist immediately
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Us</h4>
                    <p className="text-lg text-accent mb-1">info@legacycapnyc.com</p>
                    <p className="text-sm text-muted-foreground">
                      Get a response within 1 hour
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Headquarters</h4>
                    <p className="text-accent mb-1">90 Broad Street</p>
                    <p className="text-accent">New York, NY 10004</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Business Hours</h4>
                    <p className="text-accent mb-1">Monday - Friday: 8 AM - 8 PM</p>
                    <p className="text-accent">Saturday: 9 AM - 5 PM</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Emergency funding available 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-4">
              <Button className="w-full btn-hero text-lg py-6">
                <Phone className="w-5 h-5 mr-2" />
                Call Now for Instant Pre-Approval
              </Button>
              <Button variant="premium" className="w-full text-lg py-6">
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Live Chat
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-premium p-8">
            <h3 className="text-2xl font-display font-bold mb-6">
              Send Us a Message
            </h3>
            <p className="text-muted-foreground mb-6">
              Tell us about your funding needs and we'll get back to you within the hour.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="(555) 555-5555"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="bg-secondary border-border"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                  Tell us about your funding needs
                </Label>
                <Textarea
                  id="message"
                  placeholder="How much funding do you need and what will you use it for?"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="bg-secondary border-border resize-none"
                />
              </div>

              <Button type="submit" className="w-full btn-hero text-lg py-6" disabled={isSubmitting}>
                {isSubmitting ? 'Sending Request...' : 'Send Message & Get Pre-Qualified'}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By submitting this form, you consent to be contacted by Legacy Capital NYC 
                regarding your funding needs.
              </p>
            </form>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 text-center">
          <div className="glass p-6 rounded-xl inline-block">
            <h4 className="text-lg font-semibold mb-2">
              Need Emergency Funding?
            </h4>
            <p className="text-muted-foreground mb-4">
              Call our 24/7 emergency funding hotline
            </p>
            <p className="text-2xl font-bold text-accent">
              347-596-7722
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;