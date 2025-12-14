import { useState, useEffect } from 'react';
import { ArrowRight, DollarSign, Clock, Shield, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import heroImage from '@/assets/hero-bg.jpg';

interface HeroSectionProps {
  onCalculatorOpen: () => void;
}

import { useToast } from "@/components/ui/use-toast";
import { submitLead } from "@/lib/supabase";

const HeroSection = ({ onCalculatorOpen }: HeroSectionProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [offset, setOffset] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    monthlyRevenue: '',
    fundingAmount: '',
    phone: ''
  });

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      setOffset(header.offsetHeight);
      const resizeObserver = new ResizeObserver(() =>
        setOffset(header.offsetHeight)
      );
      resizeObserver.observe(header);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await submitLead({
      business_name: formData.businessName,
      monthly_revenue: formData.monthlyRevenue,
      funding_amount: formData.fundingAmount,
      phone: formData.phone,
      lead_type: 'pre_approval'
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Please try again or call us at (347) 596-7722.",
      });
      return;
    }

    toast({
      title: "Pre-Approval Request Sent",
      description: "We are reviewing your details and will call you instantly.",
    });

    setFormData({ businessName: '', monthlyRevenue: '', fundingAmount: '', phone: '' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden transition-all duration-300"
      style={{ paddingTop: offset }}
    >
      {/* Background */}
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Legacy Capital NYC Office Background"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute inset-0 animate-shimmer"></div>
      </div>

      <div className="container mx-auto px-6 py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-12 animate-fadeIn">
            <div>
              <h1 className="text-6xl lg:text-7xl font-display font-light leading-tight mb-8 tracking-tight">
                <span className="text-gradient-gold">Premium</span> Business
                <br />
                Funding in <span className="text-accent">24 Hours</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Skip the banks. Get up to <strong className="text-foreground font-medium">$500,000</strong> in working capital
                with transparent terms, no hidden fees, and same-day approvals.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-accent" />
                <span className="text-sm font-medium tracking-luxury">24-Hour Funding</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-accent" />
                <span className="text-sm font-medium tracking-luxury">No Hidden Fees</span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="w-6 h-6 text-accent" />
                <span className="text-sm font-medium tracking-luxury">Up to $500K</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                variant="premium"
                size="lg"
                className="text-base px-10 py-7"
                onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Funded Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="premium"
                size="lg"
                className="text-base px-10 py-7"
                onClick={onCalculatorOpen}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Funding
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-display font-light text-gradient-gold flex items-center justify-center tracking-tight">
                  $2.5B+
                </div>
                <div className="text-xs text-muted-foreground mt-2 tracking-luxury uppercase">Funded</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-display font-light text-gradient-gold flex items-center justify-center tracking-tight">
                  15K+
                </div>
                <div className="text-xs text-muted-foreground mt-2 tracking-luxury uppercase">Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-display font-light text-gradient-gold flex items-center justify-center tracking-tight">
                  24hrs
                </div>
                <div className="text-xs text-muted-foreground mt-2 tracking-luxury uppercase">Avg. Approval</div>
              </div>
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div id="apply-form" className="card-premium p-10 rounded-2xl animate-slideUp">
            <div className="mb-8">
              <h3 className="text-2xl font-display font-light mb-3 text-gradient-gold tracking-tight">Quick Pre-Qualification</h3>
              <p className="text-muted-foreground text-sm">Get approved in minutes, funded in hours</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <Label htmlFor="businessName" className="text-xs font-medium mb-3 block tracking-luxury uppercase text-muted-foreground">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  placeholder="Your Business Name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="glass-input text-base"
                />
              </div>

              <div>
                <Label htmlFor="monthlyRevenue" className="text-xs font-medium mb-3 block tracking-luxury uppercase text-muted-foreground">
                  Monthly Revenue
                </Label>
                <Select
                  value={formData.monthlyRevenue}
                  onValueChange={(value) => setFormData({...formData, monthlyRevenue: value})}
                >
                  <SelectTrigger className="glass-input text-base">
                    <SelectValue placeholder="Select monthly revenue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                    <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                    <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                    <SelectItem value="100k+">$100K+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fundingAmount" className="text-xs font-medium mb-3 block tracking-luxury uppercase text-muted-foreground">
                  Funding Needed
                </Label>
                <Select
                  value={formData.fundingAmount}
                  onValueChange={(value) => setFormData({...formData, fundingAmount: value})}
                >
                  <SelectTrigger className="glass-input text-base">
                    <SelectValue placeholder="How much do you need?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                    <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                    <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                    <SelectItem value="250k+">$250K+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="phone" className="text-xs font-medium mb-3 block tracking-luxury uppercase text-muted-foreground">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="(555) 555-5555"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="glass-input text-base"
                />
              </div>

              <Button type="submit" variant="premium" className="w-full text-base py-7 mt-8" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Get Instant Pre-Approval'}
                {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>

              <p className="text-xs text-muted-foreground text-center tracking-luxury">
                Secure application • No impact on credit score • Same-day decisions
              </p>

              <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/5 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-1.5" title="SSL Secure Encryption">
                  <Shield className="w-3 h-3" />
                  <span className="text-[10px] uppercase tracking-widest">256-Bit SSL Secure</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

