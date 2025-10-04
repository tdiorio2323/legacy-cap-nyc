import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, AlertTriangle, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { DollarSign, Zap, Shield, TrendingUp as TrendingUpIcon, Clock, Handshake } from 'lucide-react';

// Enhanced service data with underwriter notes
const servicesWithNotes = [
  {
    icon: DollarSign,
    title: 'Merchant Cash Advance',
    description: 'Fast access to working capital based on your daily sales.',
    features: ['$5K - $500K funding', 'Same-day approval', 'No collateral required'],
    highlight: 'Most Popular',
    underwriterNotes: {
      requiredDocs: [
        '3 months business bank statements',
        'Voided business check',
        'Driver\'s license or passport',
        'Business formation docs (if LLC/Corp)',
      ],
      redFlags: [
        'More than 3 NSF/overdrafts in last 90 days',
        'Multiple active MCAs ("stacking" - we can consolidate)',
        'Declining revenue trend (month-over-month drops)',
        'Recent tax liens or legal judgments',
        'Seasonal business without off-season plan',
      ],
      typicalDeclines: [
        'Less than $10K monthly revenue',
        'Business operating less than 6 months',
        'Active bankruptcy or pending litigation',
        'Cannabis or high-risk industries (ask us first)',
        'Owner FICO below 500 (we\'re flexible but have limits)',
      ],
      compensatingStrengths: [
        'Strong bank balance offsets poor credit',
        'High card % (70%+) allows larger advance',
        'Multiple locations = diversification = better terms',
        'Long-term leases show stability',
        'Repeat customer (we reward loyalty with better rates)',
      ],
      honestTalk: 'This is our bread and butter. If you have steady deposits and can handle daily payments, you\'ll get approved. The "catch" is it\'s expensive compared to a bank loan - but you get money in 24 hours vs 60+ days. Worth it when you need speed.',
    },
  },
  {
    icon: Zap,
    title: 'Revenue-Based Financing',
    description: 'Flexible repayment tied to your business performance.',
    features: ['Performance-based payments', 'Lower costs during slow periods', 'Up to 24 months'],
    highlight: null,
    underwriterNotes: {
      requiredDocs: [
        '6 months bank statements (longer history required)',
        'P&L statement (last 12 months)',
        'Tax returns (last 2 years)',
        'Revenue projections with backup data',
      ],
      redFlags: [
        'Wildly inconsistent revenue (50%+ swings)',
        'Can\'t explain revenue projections',
        'Industry in decline (we track this)',
        'No plan for using capital',
      ],
      typicalDeclines: [
        'Less than $50K monthly revenue',
        'Less than 2 years in business',
        'Negative cash flow for 3+ consecutive months',
        'Can\'t provide detailed financials',
      ],
      compensatingStrengths: [
        'SaaS or subscription revenue (predictable)',
        'Long-term contracts in place',
        'Strong growth trajectory (20%+ YoY)',
        'Experienced management team',
      ],
      honestTalk: 'Better than MCA for businesses with variable income. You pay less when sales are slow. But... we need way more documentation. If your books are messy, do the MCA instead. This is for more established businesses.',
    },
  },
  {
    icon: Shield,
    title: 'Equipment Financing',
    description: 'Secure funding for business equipment and machinery.',
    features: ['100% financing available', 'Fixed payment terms', 'Equipment as collateral'],
    highlight: null,
    underwriterNotes: {
      requiredDocs: [
        'Equipment quote/invoice',
        '3 months bank statements',
        'Business tax return (last year)',
        'Equipment specs and appraisal',
      ],
      redFlags: [
        'Used equipment over 7 years old',
        'Custom equipment with no resale market',
        'Equipment from unknown manufacturers',
        'Trying to finance non-essential "nice-to-haves"',
      ],
      typicalDeclines: [
        'Equipment has no clear resale value',
        'Business can\'t demonstrate need',
        'No down payment on expensive equipment',
        'Equipment is for startup with no revenue',
      ],
      compensatingStrengths: [
        'Standard equipment (trucks, machinery, etc.)',
        'Manufacturer warranties included',
        'Equipment generates immediate revenue',
        '20%+ down payment reduces our risk',
      ],
      honestTalk: 'This is the cheapest funding we offer because we can repossess the equipment. Rates rival banks. The catch? We need the equipment to be worth something. Don\'t try to finance a custom espresso machine with your logo - get a standard commercial one.',
    },
  },
  {
    icon: TrendingUpIcon,
    title: 'Business Line of Credit',
    description: 'Revolving credit line for ongoing business needs.',
    features: ['Only pay for what you use', 'Renewable credit line', 'Instant access to funds'],
    highlight: null,
    underwriterNotes: {
      requiredDocs: [
        '6 months bank statements',
        'Business tax return',
        'Personal credit report (we pull it)',
        'Business plan or use of funds letter',
      ],
      redFlags: [
        'Planning to use for payroll (sign of trouble)',
        'No clear repayment plan',
        'Maxed out other credit lines',
        'Using it to pay off other debt',
      ],
      typicalDeclines: [
        'Owner FICO below 600',
        'Business operating at a loss',
        'No established banking relationship',
        'Inconsistent revenue',
      ],
      compensatingStrengths: [
        'Strong personal credit (700+)',
        'Established business (3+ years)',
        'Clear seasonal need',
        'Previous LOC paid off successfully',
      ],
      honestTalk: 'Hardest to qualify for but best terms. You need good credit and solid business. If you barely qualified for an MCA, don\'t waste time applying for this. We\'ll just tell you to do the MCA first, build history, then apply for LOC in 6 months.',
    },
  },
  {
    icon: Clock,
    title: 'Invoice Factoring',
    description: 'Convert unpaid invoices into immediate cash flow.',
    features: ['Get paid in 24 hours', 'No debt on balance sheet', 'Improve cash flow'],
    highlight: null,
    underwriterNotes: {
      requiredDocs: [
        'Sample invoices (aging report)',
        'Customer contracts',
        'Proof of work completion',
        'Customer credit info',
      ],
      redFlags: [
        'Invoices to individuals (need businesses)',
        'Net-90+ payment terms',
        'Customer history of slow payment',
        'Disputed invoices or change orders',
      ],
      typicalDeclines: [
        'Government contracts (too slow)',
        'Invoices under $5K each',
        'Customer concentration over 50%',
        'Foreign customers',
      ],
      compensatingStrengths: [
        'Creditworthy customers (Fortune 1000)',
        'Net-30 or Net-45 terms',
        'Long customer relationships',
        'Recurring monthly invoices',
      ],
      honestTalk: 'Great for B2B businesses waiting on payment. We advance 80-90% now, you get the rest (minus our fee) when customer pays. The catch? Your customers will know you\'re factoring - we collect directly from them. If that\'s awkward, do an MCA instead.',
    },
  },
  {
    icon: Handshake,
    title: 'SBA Loan Alternative',
    description: 'Faster alternative to traditional SBA loans.',
    features: ['No personal guarantee', 'Faster approval process', 'Competitive rates'],
    highlight: null,
    underwriterNotes: {
      requiredDocs: [
        'Full business financial package',
        'Personal financial statement',
        'Business plan (detailed)',
        '3 years tax returns (business + personal)',
        'Use of funds breakdown',
      ],
      redFlags: [
        'Startup with no revenue',
        'Speculative business plan',
        'Owner with multiple failed businesses',
        'Unclear use of funds',
      ],
      typicalDeclines: [
        'Less than 2 years operating',
        'Owner FICO below 650',
        'Negative net income',
        'High debt-to-income ratio',
      ],
      compensatingStrengths: [
        'Profitable for 2+ years',
        'Owner has industry experience',
        'Clear ROI on capital investment',
        'Collateral available',
      ],
      honestTalk: 'This is basically a term loan. Better rates than MCA, but slower (1-2 weeks) and needs strong financials. If banks rejected you, we might too. The "alternative" is we\'re more flexible and faster than actual SBA - not that we approve everyone.',
    },
  },
];

const UnderwriterNotes = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-accent/10 px-4 py-2 rounded-full mb-6">
            <FileText className="w-4 h-4 text-accent mr-2" />
            <span className="text-sm font-semibold text-accent">Underwriter Mode: Brutal Honesty</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Premium <span className="text-gradient-gold">Funding Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Click any product to see what underwriters actually look for - including red flags, typical declines, and the real talk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesWithNotes.map((service, index) => (
            <div
              key={index}
              className={`card-premium relative transition-all duration-300 ${
                expandedIndex === index
                  ? 'md:col-span-2 lg:col-span-3 shadow-gold'
                  : 'hover:shadow-gold hover:scale-105'
              }`}
            >
              {service.highlight && expandedIndex !== index && (
                <div className="absolute -top-3 left-6 bg-gradient-gold text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  {service.highlight}
                </div>
              )}

              {/* Collapsed View */}
              {expandedIndex !== index && (
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-accent/20 transition-colors">
                      <service.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-display font-semibold">{service.title}</h3>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-border/50">
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-accent hover:text-accent/80 transition-colors font-medium flex items-center w-full justify-between"
                    >
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        See Underwriter Notes
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Expanded View */}
              {expandedIndex === index && (
                <div className="p-8 animate-fadeIn">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                        <service.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-semibold">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronUp className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Required Documents */}
                    <div className="glass p-6 rounded-lg">
                      <h4 className="font-semibold mb-4 flex items-center text-accent">
                        <FileText className="w-5 h-5 mr-2" />
                        Required Documents
                      </h4>
                      <ul className="space-y-2">
                        {service.underwriterNotes.requiredDocs.map((doc, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0 mt-0.5" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Red Flags */}
                    <div className="glass p-6 rounded-lg bg-destructive/5">
                      <h4 className="font-semibold mb-4 flex items-center text-destructive">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Red Flags (Can Reduce Offer)
                      </h4>
                      <ul className="space-y-2">
                        {service.underwriterNotes.redFlags.map((flag, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <AlertTriangle className="w-4 h-4 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Typical Declines */}
                    <div className="glass p-6 rounded-lg bg-orange-400/5">
                      <h4 className="font-semibold mb-4 flex items-center text-orange-400">
                        <XCircle className="w-5 h-5 mr-2" />
                        Typical Declines
                      </h4>
                      <ul className="space-y-2">
                        {service.underwriterNotes.typicalDeclines.map((decline, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <XCircle className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{decline}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Compensating Strengths */}
                    <div className="glass p-6 rounded-lg bg-accent/5">
                      <h4 className="font-semibold mb-4 flex items-center text-accent">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Compensating Strengths
                      </h4>
                      <ul className="space-y-2">
                        {service.underwriterNotes.compensatingStrengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <TrendingUp className="w-4 h-4 text-accent mr-2 flex-shrink-0 mt-0.5" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Honest Talk */}
                  <div className="card-premium p-6 border-2 border-accent/30">
                    <h4 className="font-bold mb-3 text-lg flex items-center text-accent">
                      <FileText className="w-5 h-5 mr-2" />
                      The Real Talk
                    </h4>
                    <p className="text-sm leading-relaxed text-foreground">
                      {service.underwriterNotes.honestTalk}
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center mx-auto"
                    >
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Collapse Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass p-8 rounded-2xl inline-block">
            <h3 className="text-2xl font-display font-bold mb-4">
              Still not sure which option is right for you?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our funding experts will review your situation and recommend the best fit - no sales pressure.
            </p>
            <button className="btn-hero px-8 py-4">
              Speak with an Underwriter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnderwriterNotes;
