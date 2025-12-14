
import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar, Mail, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { submitLead } from "@/lib/supabase";

const InstantOfferSimulator = () => {
  const { toast } = useToast();

  // Input state - using percentages for sliders (0-100)
  const [monthlyRevenue, setMonthlyRevenue] = useState([50000]);
  const [avgBankBalance, setAvgBankBalance] = useState([10000]);
  const [cardReceiptsPct, setCardReceiptsPct] = useState([50]);

  // Email capture state
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Offer state
  const [offer, setOffer] = useState({
    minOffer: 75000,
    maxOffer: 100000,
    factorRate: 1.25,
    termMonths: 6,
    totalPayback: 0,
    dailyRemittance: 0,
    aprEquivalent: 0,
    businessDays: 0
  });

  // Calculate whenever inputs change
  useEffect(() => {
    calculateOffer();
  }, [monthlyRevenue, avgBankBalance, cardReceiptsPct]);

  const calculateOffer = () => {
    const revenue = monthlyRevenue[0];
    const balance = avgBankBalance[0];
    const cardPct = cardReceiptsPct[0];

    // Factor rate calculation: Better terms for higher revenue/balance/card %
    let baseFactor = 1.25;
    if (revenue >= 200000) baseFactor -= 0.03;
    if (revenue >= 300000) baseFactor -= 0.02;
    if (balance >= 50000) baseFactor -= 0.02;
    if (balance >= 100000) baseFactor -= 0.02;
    if (cardPct >= 50) baseFactor -= 0.01;
    if (cardPct >= 70) baseFactor -= 0.01;

    const factorRate = Math.max(1.12, Math.min(1.30, baseFactor));

    // Max offer: 30-40% of annual revenue based on strength
    let revenueMultiplier = 0.30;
    if (revenue >= 200000 && balance >= 75000) revenueMultiplier = 0.35;
    if (revenue >= 300000 && balance >= 100000) revenueMultiplier = 0.40;

    const maxOffer = Math.floor((revenue * 12 * revenueMultiplier) / 10000) * 10000; // Round to nearest 10k
    const minOffer = Math.floor(maxOffer * 0.4);

    // Term length: 6-12 months based on offer size
    const termMonths = maxOffer >= 150000 ? 12 : maxOffer >= 75000 ? 9 : 6;

    // Calculate payback and daily remittance for max offer
    const totalPayback = maxOffer * factorRate;
    const businessDays = termMonths * 22; // ~22 business days per month
    const dailyRemittance = Math.floor(totalPayback / businessDays);

    // Calculate APR equivalent for transparency
    // APR = (Factor - 1) / Term in years * 100
    const aprEquivalent = ((factorRate - 1) / (termMonths / 12)) * 100;

    setOffer({
      minOffer,
      maxOffer,
      factorRate,
      termMonths,
      totalPayback: Math.floor(totalPayback),
      dailyRemittance,
      aprEquivalent: Math.floor(aprEquivalent),
      businessDays
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send to Supabase
    const { error } = await submitLead({
      email,
      monthly_revenue: monthlyRevenue[0].toString(),
      lead_type: 'calculator',
      metadata: {
        avg_bank_balance: avgBankBalance[0],
        card_receipts_pct: cardReceiptsPct[0],
        offered_min: offer.minOffer,
        offered_max: offer.maxOffer,
        estimated_factor: offer.factorRate
      }
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error sending offer",
        description: "Please try again or call us.",
      });
      return;
    }

    toast({
      title: "Offer Sent!",
      description: "Check your email for the detailed breakdown.",
    });

    setEmailSubmitted(true);
  };

  const handleDownloadPDF = () => {
    // MOCK - In production, this would generate a PDF
    toast({
      title: "Downloading...",
      description: "Your official offer PDF is generating.",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-accent/10 px-4 py-2 rounded-full mb-6">
            <AlertCircle className="w-4 h-4 text-accent mr-2" />
            <span className="text-xs font-medium text-accent tracking-luxury uppercase">Fully Transparent Pricing</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-display font-light mb-8 tracking-tight">
            See Your <span className="text-gradient-gold">Real Offer</span> Now
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            No games. No "subject to underwriting" surprises. Move the sliders below and see exactly what you qualify for.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Input Controls */}
          <div className="card-premium p-12 space-y-10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <Label className="text-sm font-medium tracking-luxury uppercase text-muted-foreground">Monthly Revenue</Label>
                <span className="text-3xl font-light text-accent tracking-tight">{formatCurrency(monthlyRevenue[0])}</span>
              </div>
              <Slider
                value={monthlyRevenue}
                onValueChange={setMonthlyRevenue}
                min={10000}
                max={500000}
                step={5000}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-3 tracking-luxury">
                <span>$10K</span>
                <span>$500K</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <Label className="text-sm font-medium tracking-luxury uppercase text-muted-foreground">Average Bank Balance</Label>
                <span className="text-3xl font-light text-accent tracking-tight">{formatCurrency(avgBankBalance[0])}</span>
              </div>
              <Slider
                value={avgBankBalance}
                onValueChange={setAvgBankBalance}
                min={1000}
                max={100000}
                step={1000}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-3 tracking-luxury">
                <span>$1K</span>
                <span>$100K</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <Label className="text-sm font-medium tracking-luxury uppercase text-muted-foreground">Card/Digital Receipts</Label>
                <span className="text-3xl font-light text-accent tracking-tight">{cardReceiptsPct[0]}%</span>
              </div>
              <Slider
                value={cardReceiptsPct}
                onValueChange={setCardReceiptsPct}
                min={0}
                max={100}
                step={5}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-3 tracking-luxury">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Why These Matter Explainer */}
            <div className="glass p-6 rounded-lg mt-8">
              <h4 className="font-medium text-xs mb-3 text-accent tracking-luxury uppercase">Why These Numbers Matter</h4>
              <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                <li>• Higher revenue = larger advance capacity</li>
                <li>• Strong balance = lower risk = better rate</li>
                <li>• Card receipts = easier automated collection</li>
              </ul>
            </div>
          </div>

          {/* Right: Offer Results */}
          <div className="space-y-8">
            {/* Offer Range Card */}
            <div className="card-premium p-10 border border-accent/20">
              <h3 className="text-lg font-medium mb-8 flex items-center tracking-luxury">
                <DollarSign className="w-6 h-6 text-accent mr-3" />
                Your Offer Range
              </h3>

              <div className="space-y-8">
                <div>
                  <p className="text-xs text-muted-foreground mb-3 tracking-luxury uppercase">You qualify for</p>
                  <p className="text-5xl font-display font-light text-gradient-gold tracking-tight">
                    {formatCurrency(offer.minOffer)} - {formatCurrency(offer.maxOffer)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 tracking-luxury uppercase">Factor Rate</p>
                    <p className="text-3xl font-light tracking-tight">{offer.factorRate.toFixed(2)}</p>
                    <p className="text-xs text-accent mt-2">
                      ~{offer.aprEquivalent.toFixed(0)}% APR equivalent
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 tracking-luxury uppercase">Term Length</p>
                    <p className="text-3xl font-light tracking-tight">{offer.termMonths} months</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {offer.businessDays} business days
                    </p>
                  </div>
                </div>

                <div className="glass p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium flex items-center tracking-luxury uppercase text-muted-foreground">
                      <Calendar className="w-4 h-4 text-accent mr-2" />
                      Daily Remittance
                    </span>
                    <span className="text-2xl font-light text-accent tracking-tight">
                      {formatCurrency(offer.dailyRemittance)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on {formatCurrency(offer.maxOffer)} advance
                  </p>
                </div>

                <div className="glass p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium flex items-center tracking-luxury uppercase text-muted-foreground">
                      <TrendingUp className="w-4 h-4 text-accent mr-2" />
                      Total Payback
                    </span>
                    <span className="text-2xl font-light tracking-tight">
                      {formatCurrency(offer.totalPayback)}
                    </span>
                  </div>
                  <p className="text-xs text-accent">
                    Your cost: {formatCurrency(offer.totalPayback - offer.maxOffer)}
                    ({((offer.factorRate - 1) * 100).toFixed(0)}% of advance)
                  </p>
                </div>
              </div>
            </div>

            {/* Email/Download CTA */}
            <div className="card-premium p-8">
              {!emailSubmitted ? (
                <form onSubmit={handleEmailSubmit}>
                  <h4 className="font-semibold mb-4">Email Me This Offer</h4>
                  <div className="flex gap-3">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button type="submit" className="w-full btn-hero" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Email Me My Offer'}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    We'll send you a detailed breakdown + next steps
                  </p>
                </form>
              ) : (
                <div className="text-center py-4">
                  <p className="text-accent font-semibold mb-3">✓ Offer sent to {email}</p>
                  <Button onClick={handleDownloadPDF} variant="premium" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF Report
                  </Button>
                </div>
              )}
            </div>

            {/* Transparency Note */}
            <div className="glass p-6 rounded-lg">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-accent font-medium">The Fine Print:</strong> These numbers are real estimates based on thousands of deals.
                Final offer subject to bank statement review (takes 30 mins). We don't do "bait and switch."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstantOfferSimulator;
