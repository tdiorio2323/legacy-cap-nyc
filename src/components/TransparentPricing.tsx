import { useState } from 'react';
import { DollarSign, AlertTriangle, Check, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TransparentPricing = () => {
  const [viewMode, setViewMode] = useState<'factor' | 'apr'>('factor');

  // Example pricing tiers - MOCK DATA
  const pricingTiers = [
    {
      name: 'Tier 1: Strong Profile',
      criteria: '$200K+ revenue, $75K+ balance, 12+ months',
      factorRate: '1.12 - 1.15',
      aprEquivalent: '24% - 30%',
      features: [
        'Lowest rates available',
        '12-month terms',
        'No origination fees',
        'Priority underwriting',
      ],
      isPopular: false,
    },
    {
      name: 'Tier 2: Standard Profile',
      criteria: '$100K+ revenue, $25K+ balance, 6+ months',
      factorRate: '1.18 - 1.22',
      aprEquivalent: '36% - 44%',
      features: [
        'Competitive rates',
        '6-9 month terms',
        'Same-day decisions',
        'Flexible remittance',
      ],
      isPopular: true,
    },
    {
      name: 'Tier 3: Startup Profile',
      criteria: '$50K+ revenue, newer business',
      factorRate: '1.25 - 1.30',
      aprEquivalent: '50% - 60%',
      features: [
        'Startup-friendly',
        '6-month terms',
        'Higher approval rate',
        'Growth pathway',
      ],
      isPopular: false,
    },
  ];

  // What you DON'T pay - comparison to typical MCA
  const hiddenFeesComparison = [
    { fee: 'Origination Fees', typical: '2-5% of advance', legacy: 'ZERO', savings: true },
    { fee: 'Processing Fees', typical: '$500 - $2,000', legacy: 'ZERO', savings: true },
    { fee: 'Underwriting Fees', typical: '$500 - $1,500', legacy: 'ZERO', savings: true },
    { fee: 'Broker Commissions', typical: '3-8% (hidden)', legacy: 'Direct lender', savings: true },
    { fee: 'Early Payoff Penalties', typical: '10-30% of remaining', legacy: 'ZERO - pay off anytime', savings: true },
    { fee: 'Renewal Fees', typical: '$1,000+', legacy: 'ZERO', savings: true },
  ];

  // Industry comparison
  const industryComparison = [
    { provider: 'Legacy Capital NYC', rate: '1.12 - 1.30', apr: '24% - 60%', fees: '$0', transparency: true },
    { provider: 'Typical MCA Broker', rate: '1.25 - 1.50', apr: '40% - 120%', fees: '$2K - $8K', transparency: false },
    { provider: 'Traditional Bank', rate: 'N/A', apr: '8% - 15%', fees: 'Varies', transparency: false },
    { provider: 'Online Lender', rate: '1.20 - 1.40', apr: '30% - 80%', fees: '$1K - $5K', transparency: false },
  ];

  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-accent/10 px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="w-4 h-4 text-accent mr-2" />
            <span className="text-xs font-medium text-accent tracking-luxury uppercase">Industry-First Transparency</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-display font-light mb-8 tracking-tight">
            The <span className="text-gradient-gold">Real Math</span> Behind Your Advance
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Most MCAs hide behind "factor rates" because APR sounds scary. We show you both. Because you deserve to know.
          </p>
        </div>

        {/* Toggle View Mode */}
        <div className="flex justify-center mb-16">
          <div className="glass inline-flex rounded-lg p-1.5">
            <Button
              variant={viewMode === 'factor' ? 'default' : 'ghost'}
              onClick={() => setViewMode('factor')}
              className={viewMode === 'factor' ? 'bg-accent text-accent-foreground' : 'hover:bg-white/5'}
            >
              Factor Rate View
            </Button>
            <Button
              variant={viewMode === 'apr' ? 'default' : 'ghost'}
              onClick={() => setViewMode('apr')}
              className={viewMode === 'apr' ? 'bg-accent text-accent-foreground' : 'hover:bg-white/5'}
            >
              APR Equivalent View
            </Button>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`card-premium p-10 relative transition-all hover:scale-[1.01] ${
                tier.isPopular ? 'border border-accent/30 shadow-gold' : ''
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold text-accent-foreground px-4 py-1 rounded-full text-xs font-medium tracking-luxury">
                  Most Common
                </div>
              )}

              <h3 className="text-xl font-display font-light mb-3 tracking-tight">{tier.name}</h3>
              <p className="text-sm text-muted-foreground mb-8">{tier.criteria}</p>

              <div className="mb-8">
                <div className="text-4xl font-display font-light text-gradient-gold mb-2 tracking-tight">
                  {viewMode === 'factor' ? tier.factorRate : tier.aprEquivalent}
                </div>
                <p className="text-xs text-muted-foreground tracking-luxury uppercase">
                  {viewMode === 'factor' ? 'Factor Rate' : 'APR Equivalent'}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <Check className="w-4 h-4 text-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-muted-foreground">
                  {viewMode === 'factor'
                    ? `APR equivalent: ${tier.aprEquivalent}`
                    : `Factor rate: ${tier.factorRate}`
                  }
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hidden Fees Comparison */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="card-premium p-12">
            <div className="flex items-center mb-8">
              <Info className="w-6 h-6 text-accent mr-3" />
              <h3 className="text-3xl font-display font-light tracking-tight">What You DON'T Pay</h3>
            </div>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              The MCA industry is notorious for hidden fees. Here's what we don't charge:
            </p>

            <div className="space-y-4">
              {hiddenFeesComparison.map((item, index) => (
                <div key={index} className="glass p-6 rounded-lg">
                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <div className="font-medium tracking-luxury">{item.fee}</div>
                    <div className="text-sm text-muted-foreground">
                      Typical: <span className="text-destructive">{item.typical}</span>
                    </div>
                    <div className="text-sm font-medium text-accent flex items-center">
                      <Check className="w-5 h-5 mr-2" />
                      {item.legacy}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 glass p-6 rounded-lg bg-accent/5">
              <p className="text-base font-medium text-accent mb-2">
                Average Savings: $5,000 - $15,000 per deal
              </p>
              <p className="text-xs text-muted-foreground">
                Based on $100K advance comparison vs. typical broker-sourced MCA
              </p>
            </div>
          </div>
        </div>

        {/* Industry Comparison Table */}
        <div className="max-w-5xl mx-auto">
          <div className="card-premium p-12">
            <h3 className="text-3xl font-display font-light mb-10 text-center tracking-tight">
              How We Compare to the Industry
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-5 px-4 font-medium text-sm tracking-luxury uppercase text-muted-foreground">Provider Type</th>
                    <th className="text-left py-5 px-4 font-medium text-sm tracking-luxury uppercase text-muted-foreground">Factor Rate Range</th>
                    <th className="text-left py-5 px-4 font-medium text-sm tracking-luxury uppercase text-muted-foreground">APR Equivalent</th>
                    <th className="text-left py-5 px-4 font-medium text-sm tracking-luxury uppercase text-muted-foreground">Total Fees</th>
                    <th className="text-center py-5 px-4 font-medium text-sm tracking-luxury uppercase text-muted-foreground">Transparent</th>
                  </tr>
                </thead>
                <tbody>
                  {industryComparison.map((provider, index) => (
                    <tr
                      key={index}
                      className={`border-b border-white/5 ${
                        provider.provider === 'Legacy Capital NYC' ? 'bg-accent/5' : ''
                      }`}
                    >
                      <td className="py-5 px-4 font-medium">
                        {provider.provider}
                        {provider.provider === 'Legacy Capital NYC' && (
                          <span className="ml-2 text-xs text-accent tracking-luxury">(You)</span>
                        )}
                      </td>
                      <td className="py-5 px-4 text-sm">{provider.rate}</td>
                      <td className="py-5 px-4 text-sm">{provider.apr}</td>
                      <td className="py-5 px-4 font-medium">
                        {provider.fees === '$0' ? (
                          <span className="text-accent">{provider.fees}</span>
                        ) : (
                          <span className="text-destructive">{provider.fees}</span>
                        )}
                      </td>
                      <td className="py-5 px-4 text-center">
                        {provider.transparency ? (
                          <Check className="w-5 h-5 text-accent mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex items-start gap-4 glass p-6 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-medium">Why banks look cheaper:</strong> Banks show low APR but reject 80% of applications,
                take 60+ days, and require perfect credit + collateral. We approve 75% of applications in under 30 minutes.
                Different products for different needs.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button className="btn-hero px-10 py-7 text-base">
            <DollarSign className="w-5 h-5 mr-2" />
            See Your Exact Rate
          </Button>
          <p className="text-sm text-muted-foreground mt-6 tracking-luxury">
            Use the calculator above to get your personalized pricing
          </p>
        </div>
      </div>
    </section>
  );
};

export default TransparentPricing;
