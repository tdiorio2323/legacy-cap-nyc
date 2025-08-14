import { useState } from 'react';
import { ArrowRight, DollarSign, Clock, Shield, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import heroImage from '@/assets/hero-bg.jpg';

interface HeroSectionProps {
  onCalculatorOpen: () => void;
}

const HeroSection = ({ onCalculatorOpen }: HeroSectionProps) => {
  const [formData, setFormData] = useState({
    businessName: '',
    monthlyRevenue: '',
    fundingAmount: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                <span className="text-gradient-gold">Premium</span> Business
                <br />
                Funding in <span className="text-accent">24 Hours</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Skip the banks. Get up to <strong className="text-foreground">$500,000</strong> in working capital 
                with transparent terms, no hidden fees, and same-day approvals.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">24-Hour Funding</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">No Hidden Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Up to $500K</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="btn-hero text-lg px-8 py-6"
                onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Funded Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="btn-outline-premium text-lg px-8 py-6"
                onClick={onCalculatorOpen}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Funding
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-gradient-gold">$2.5B+</div>
                <div className="text-sm text-muted-foreground">Funded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-gradient-gold">15K+</div>
                <div className="text-sm text-muted-foreground">Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-gradient-gold">24hrs</div>
                <div className="text-sm text-muted-foreground">Avg. Approval</div>
              </div>
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div id="apply-form" className="glass p-8 rounded-2xl animate-fadeIn">
            <div className="mb-6">
              <h3 className="text-2xl font-display font-bold mb-2">Quick Pre-Qualification</h3>
              <p className="text-muted-foreground">Get approved in minutes, funded in hours</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="businessName" className="text-sm font-medium mb-2 block">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  placeholder="Your Business Name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="bg-secondary border-border"
                />
              </div>

              <div>
                <Label htmlFor="monthlyRevenue" className="text-sm font-medium mb-2 block">
                  Monthly Revenue
                </Label>
                <Select 
                  value={formData.monthlyRevenue}
                  onValueChange={(value) => setFormData({...formData, monthlyRevenue: value})}
                >
                  <SelectTrigger className="bg-secondary border-border">
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
                <Label htmlFor="fundingAmount" className="text-sm font-medium mb-2 block">
                  Funding Needed
                </Label>
                <Select 
                  value={formData.fundingAmount}
                  onValueChange={(value) => setFormData({...formData, fundingAmount: value})}
                >
                  <SelectTrigger className="bg-secondary border-border">
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
                <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="bg-secondary border-border"
                />
              </div>

              <Button type="submit" className="w-full btn-hero text-lg py-6">
                Get Instant Pre-Approval
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Secure application • No impact on credit score • Same-day decisions
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;