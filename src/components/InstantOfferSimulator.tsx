import { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Mail, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const InstantOfferSimulator = () => {
  // Input state - using percentages for sliders (0-100)
  const [monthlyRevenue, setMonthlyRevenue] = useState([250000]); // $250k default
  const [avgBankBalance, setAvgBankBalance] = useState([75000]); // $75k default
  const [cardReceiptsPct, setCardReceiptsPct] = useState([60]); // 60% default

  // Email capture state
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Calculate offer details based on inputs
  // MOCK CALCULATION - In production, this would call an API
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

    return {
      minOffer,
      maxOffer,
      factorRate,
      termMonths,
      totalPayback: Math.floor(totalPayback),
      dailyRemittance,
      aprEquivalent: Math.floor(aprEquivalent),
      businessDays
    };
  };

  const offer = calculateOffer();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // MOCK - In production, this would send email via API
    console.log('Email submitted:', email, 'Offer details:', offer);
    setEmailSubmitted(true);
  };

  const handleDownloadPDF = () => {
    // MOCK - In production, this would generate a PDF
    console.log('Downloading PDF with offer details:', offer);
    alert('PDF download feature - would generate a detailed offer document in production');
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
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-accent/10 px-4 py-2 rounded-full mb-6">
            <AlertCircle className="w-4 h-4 text-accent mr-2" />
            <span className="text-sm font-semibold text-accent">Fully Transparent Pricing</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            See Your <span className="text-gradient-gold">Real Offer</span> Now
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No games. No "subject to underwriting" surprises. Move the sliders below and see exactly what you qualify for.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Input Controls */}
          <div className="card-premium p-8 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">Monthly Revenue</Label>
                <span className="text-2xl font-bold text-accent">{formatCurrency(monthlyRevenue[0])}</span>
              </div>
              <Slider
                value={monthlyRevenue}
                onValueChange={setMonthlyRevenue}
                min={50000}
                max={500000}
                step={10000}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>$50K</span>
                <span>$500K</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">Average Bank Balance</Label>
                <span className="text-2xl font-bold text-accent">{formatCurrency(avgBankBalance[0])}</span>
              </div>
              <Slider
                value={avgBankBalance}
                onValueChange={setAvgBankBalance}
                min={10000}
                max={200000}
                step={5000}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>$10K</span>
                <span>$200K</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">Card/Digital Receipts</Label>
                <span className="text-2xl font-bold text-accent">{cardReceiptsPct[0]}%</span>
              </div>
              <Slider
                value={cardReceiptsPct}
                onValueChange={setCardReceiptsPct}
                min={0}
                max={100}
                step={5}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Why These Matter Explainer */}
            <div className="glass p-4 rounded-lg mt-6">
              <h4 className="font-semibold text-sm mb-2 text-accent">Why These Numbers Matter</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Higher revenue = larger advance capacity</li>
                <li>• Strong balance = lower risk = better rate</li>
                <li>• Card receipts = easier automated collection</li>
              </ul>
            </div>
          </div>

          {/* Right: Offer Results */}
          <div className="space-y-6">
            {/* Offer Range Card */}
            <div className="card-premium p-8 border-2 border-accent/30">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <DollarSign className="w-6 h-6 text-accent mr-2" />
                Your Offer Range
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">You qualify for</p>
                  <p className="text-4xl font-display font-bold text-gradient-gold">
                    {formatCurrency(offer.minOffer)} - {formatCurrency(offer.maxOffer)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Factor Rate</p>
                    <p className="text-2xl font-bold">{offer.factorRate.toFixed(2)}</p>
                    <p className="text-xs text-accent mt-1">
                      ~{offer.aprEquivalent}% APR equivalent
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Term Length</p>
                    <p className="text-2xl font-bold">{offer.termMonths} months</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {offer.businessDays} business days
                    </p>
                  </div>
                </div>

                <div className="glass p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold flex items-center">
                      <Calendar className="w-4 h-4 text-accent mr-2" />
                      Daily Remittance
                    </span>
                    <span className="text-xl font-bold text-accent">
                      {formatCurrency(offer.dailyRemittance)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on {formatCurrency(offer.maxOffer)} advance
                  </p>
                </div>

                <div className="glass p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold flex items-center">
                      <TrendingUp className="w-4 h-4 text-accent mr-2" />
                      Total Payback
                    </span>
                    <span className="text-xl font-bold">
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
            <div className="card-premium p-6">
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
                    <Button type="submit" className="btn-hero">
                      <Mail className="w-4 h-4 mr-2" />
                      Send
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
            <div className="glass p-4 rounded-lg">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-accent">The Fine Print:</strong> These numbers are real estimates based on thousands of deals.
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
