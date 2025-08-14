import { DollarSign, Zap, Shield, TrendingUp, Clock, Handshake } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: DollarSign,
      title: 'Merchant Cash Advance',
      description: 'Fast access to working capital based on your daily sales.',
      features: ['$5K - $500K funding', 'Same-day approval', 'No collateral required'],
      highlight: 'Most Popular'
    },
    {
      icon: Zap,
      title: 'Revenue-Based Financing',
      description: 'Flexible repayment tied to your business performance.',
      features: ['Performance-based payments', 'Lower costs during slow periods', 'Up to 24 months'],
      highlight: null
    },
    {
      icon: Shield,
      title: 'Equipment Financing',
      description: 'Secure funding for business equipment and machinery.',
      features: ['100% financing available', 'Fixed payment terms', 'Equipment as collateral'],
      highlight: null
    },
    {
      icon: TrendingUp,
      title: 'Business Line of Credit',
      description: 'Revolving credit line for ongoing business needs.',
      features: ['Only pay for what you use', 'Renewable credit line', 'Instant access to funds'],
      highlight: null
    },
    {
      icon: Clock,
      title: 'Invoice Factoring',
      description: 'Convert unpaid invoices into immediate cash flow.',
      features: ['Get paid in 24 hours', 'No debt on balance sheet', 'Improve cash flow'],
      highlight: null
    },
    {
      icon: Handshake,
      title: 'SBA Loan Alternative',
      description: 'Faster alternative to traditional SBA loans.',
      features: ['No personal guarantee', 'Faster approval process', 'Competitive rates'],
      highlight: null
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Premium <span className="text-gradient-gold">Funding Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We offer flexible financing options tailored to your business needs. 
            No one-size-fits-all approach - just premium solutions that work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-premium p-8 hover:shadow-gold transition-all duration-300 hover:scale-105 group relative"
            >
              {service.highlight && (
                <div className="absolute -top-3 left-6 bg-gradient-gold text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  {service.highlight}
                </div>
              )}
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-display font-semibold">{service.title}</h3>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-border/50">
                <button className="text-accent hover:text-accent/80 transition-colors font-medium">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass p-8 rounded-2xl inline-block">
            <h3 className="text-2xl font-display font-bold mb-4">
              Not sure which option is right for you?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our funding experts will help you choose the perfect solution for your business needs.
            </p>
            <button className="btn-hero px-8 py-4">
              Speak with an Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;