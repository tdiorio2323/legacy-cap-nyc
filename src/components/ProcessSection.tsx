import { FileText, Search, CheckCircle, DollarSign } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      number: '01',
      icon: FileText,
      title: 'Quick Application',
      description: 'Complete our streamlined 5-minute application online or over the phone.',
      time: '5 minutes',
      details: ['No lengthy paperwork', 'Secure online portal', 'Mobile-friendly']
    },
    {
      number: '02',
      icon: Search,
      title: 'Instant Review',
      description: 'Our AI-powered system reviews your application and provides instant pre-approval.',
      time: '15 minutes',
      details: ['Real-time verification', 'Smart underwriting', 'Transparent process']
    },
    {
      number: '03',
      icon: CheckCircle,
      title: 'Final Approval',
      description: 'Human experts verify details and provide final approval with terms.',
      time: '2-4 hours',
      details: ['Expert review', 'Customized terms', 'Clear documentation']
    },
    {
      number: '04',
      icon: DollarSign,
      title: 'Funding',
      description: 'Funds are deposited directly into your business account within 24 hours.',
      time: '24 hours',
      details: ['Direct deposit', 'Same-day funding', 'Immediate access']
    }
  ];

  return (
    <section id="process" className="py-20 bg-gradient-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Our <span className="text-gradient-gold">Simple Process</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From application to funding in 24 hours. No hidden steps, no surprises - 
            just a transparent process designed to get you funded fast.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-accent to-accent/30 z-0"></div>
              )}
              
              <div className="card-premium p-8 text-center hover:shadow-gold transition-all duration-300 relative z-10">
                {/* Step Number */}
                <div className="text-6xl font-display font-bold text-gradient-gold mb-4 relative">
                  <div className="absolute inset-0 animate-shimmer opacity-100"></div>
                  <span className="relative z-10">{step.number}</span>
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Time Badge */}
                <div className="inline-flex items-center bg-accent/10 px-4 py-2 rounded-full mb-6">
                  <span className="text-accent font-semibold text-sm">{step.time}</span>
                </div>

                {/* Details */}
                <ul className="space-y-2 text-sm">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Process Guarantee */}
        <div className="mt-16 text-center">
          <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-display font-bold mb-4">
              Our <span className="text-accent">24-Hour Guarantee</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We guarantee a decision within 24 hours of receiving your complete application. 
              If approved, funds are typically in your account the same day.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-gold mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Approval Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-gold mb-2">4.8★</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-gold mb-2">24hrs</div>
                <div className="text-sm text-muted-foreground">Average Funding</div>
              </div>
            </div>

            <div className="mt-8">
              <button className="btn-hero px-8 py-4">
                Start Your Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;