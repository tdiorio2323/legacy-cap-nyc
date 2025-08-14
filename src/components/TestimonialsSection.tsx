import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Chen',
      business: 'Chen\'s Restaurant Group',
      industry: 'Food Service',
      amount: '$125,000',
      rating: 5,
      text: 'Legacy Capital funded our restaurant expansion in just 18 hours. Their team understood our seasonal needs and structured payments perfectly. We\'ve increased revenue by 40% since the expansion.',
      location: 'Manhattan, NY',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Marcus Rodriguez',
      business: 'Rodriguez Construction',
      industry: 'Construction',
      amount: '$275,000',
      rating: 5,
      text: 'When we needed equipment financing fast, Legacy Capital delivered. No bank could match their speed or terms. The daily payment structure works perfectly with our cash flow.',
      location: 'Brooklyn, NY',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Jennifer Park',
      business: 'Park Medical Supplies',
      industry: 'Healthcare',
      amount: '$85,000',
      rating: 5,
      text: 'The transparency was refreshing. No hidden fees, clear terms, and funding in 24 hours. Legacy Capital helped us secure a major contract that doubled our business.',
      location: 'Queens, NY',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'David Thompson',
      business: 'Thompson Auto Group',
      industry: 'Automotive',
      amount: '$350,000',
      rating: 5,
      text: 'We\'ve worked with several funding companies, but Legacy Capital stands apart. Their expertise in our industry and flexible terms made all the difference.',
      location: 'Bronx, NY',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Lisa Wang',
      business: 'Wang Tech Solutions',
      industry: 'Technology',
      amount: '$150,000',
      rating: 5,
      text: 'Fast, professional, and reliable. Legacy Capital funded our inventory needs right before our busy season. Their payment structure aligns perfectly with our revenue cycles.',
      location: 'Staten Island, NY',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            What Our <span className="text-gradient-gold">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real businesses, real results. See how Legacy Capital has helped NYC businesses 
            achieve their growth goals with fast, reliable funding.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="card-premium p-8 lg:p-12 mb-8 relative">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-accent/20" />
            
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Client Photo & Info */}
              <div className="text-center lg:text-left">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-24 h-24 rounded-full mx-auto lg:mx-0 mb-4 object-cover"
                />
                <h4 className="text-xl font-display font-semibold mb-1">{current.name}</h4>
                <p className="text-accent font-medium mb-2">{current.business}</p>
                <p className="text-sm text-muted-foreground mb-2">{current.industry}</p>
                <p className="text-sm text-muted-foreground">{current.location}</p>
                
                {/* Funding Amount Badge */}
                <div className="inline-flex items-center bg-accent/10 px-4 py-2 rounded-full mt-4">
                  <span className="text-accent font-bold">{current.amount} Funded</span>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                {/* Stars */}
                <div className="flex justify-center lg:justify-start mb-4">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>

                <blockquote className="text-lg lg:text-xl leading-relaxed text-foreground">
                  "{current.text}"
                </blockquote>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="btn-outline-premium"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-accent scale-125'
                      : 'bg-accent/30 hover:bg-accent/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="btn-outline-premium"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-display font-bold mb-6">
              Trusted by <span className="text-accent">15,000+</span> NYC Businesses
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-gold mb-2">$2.5B+</div>
                <div className="text-sm text-muted-foreground">Total Funded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-gold mb-2">4.9★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-gold mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Approval Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-gold mb-2">24hrs</div>
                <div className="text-sm text-muted-foreground">Avg. Funding Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;