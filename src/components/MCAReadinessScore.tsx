import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, X, Award, Download, Mail, AlertCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Question schema
const questions = [
  {
    id: 'revenue',
    question: 'Does your business generate at least $10K/month in revenue?',
    weight: 20,
    helpText: 'Minimum threshold for most MCA programs',
  },
  {
    id: 'age',
    question: 'Has your business been operating for 6+ months?',
    weight: 15,
    helpText: 'Newer businesses have fewer options but can still qualify',
  },
  {
    id: 'bankBalance',
    question: 'Do you maintain at least $5K average daily balance?',
    weight: 15,
    helpText: 'Shows financial stability and reduces lender risk',
  },
  {
    id: 'creditCard',
    question: 'Do you accept credit cards or have digital payment processing?',
    weight: 15,
    helpText: 'Makes daily remittance collection easier',
  },
  {
    id: 'cleanBanking',
    question: 'Have you avoided NSF/overdrafts in the last 3 months?',
    weight: 15,
    helpText: 'Recent banking issues can delay approval or reduce offer',
  },
  {
    id: 'noActiveMCA',
    question: 'Are you free from existing MCA debt or can consolidate?',
    weight: 10,
    helpText: 'Multiple active MCAs ("stacking") limits new funding',
  },
  {
    id: 'taxCompliant',
    question: 'Are you current on business taxes and payroll?',
    weight: 10,
    helpText: 'Tax liens can block funding until resolved',
  },
];

// Email capture schema
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  businessName: z.string().min(2, 'Please enter your business name'),
});

type EmailFormData = z.infer<typeof emailSchema>;

const MCAReadinessScore = () => {
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({});
  const [showResults, setShowResults] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const handleAnswer = (questionId: string, answer: boolean) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] === true) {
        totalScore += q.weight;
      }
    });
    return totalScore;
  };

  const handleCalculate = () => {
    const answeredAll = questions.every((q) => answers[q.id] !== undefined);
    if (answeredAll) {
      setShowResults(true);
    } else {
      alert('Please answer all questions to see your score');
    }
  };

  const score = calculateScore();

  // Determine readiness tier
  const getReadinessTier = () => {
    if (score >= 85) return { label: 'Excellent', color: 'text-green-400', bgColor: 'bg-green-400/10' };
    if (score >= 70) return { label: 'Good', color: 'text-accent', bgColor: 'bg-accent/10' };
    if (score >= 50) return { label: 'Fair', color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' };
    return { label: 'Needs Work', color: 'text-orange-400', bgColor: 'bg-orange-400/10' };
  };

  // Generate action plan based on answers
  const getActionPlan = () => {
    const plan: { priority: string; action: string; impact: string }[] = [];

    if (answers.revenue === false) {
      plan.push({
        priority: 'Critical',
        action: 'Increase monthly revenue to $10K+',
        impact: 'Required for most programs. Consider invoice factoring or line of credit as alternatives.',
      });
    }

    if (answers.age === false) {
      plan.push({
        priority: 'High',
        action: 'Continue building business history',
        impact: 'You may qualify now but at higher rates. Wait 3-6 months for better terms.',
      });
    }

    if (answers.cleanBanking === false) {
      plan.push({
        priority: 'High',
        action: 'Clean up bank statement - avoid NSF for 90 days',
        impact: 'Can reduce your offer by 30-50% or cause denial. Fix this first.',
      });
    }

    if (answers.bankBalance === false) {
      plan.push({
        priority: 'Medium',
        action: 'Build up cash reserves to $5K+',
        impact: 'Improves approval odds and can reduce factor rate by 0.03-0.05.',
      });
    }

    if (answers.creditCard === false) {
      plan.push({
        priority: 'Medium',
        action: 'Set up credit card processing (Square, Stripe, Clover)',
        impact: 'Opens more funding options and improves terms. Can be done in 48 hours.',
      });
    }

    if (answers.noActiveMCA === false) {
      plan.push({
        priority: 'Medium',
        action: 'Consolidate existing MCAs',
        impact: 'We can help consolidate into single lower-rate advance. Saves money monthly.',
      });
    }

    if (answers.taxCompliant === false) {
      plan.push({
        priority: 'Critical',
        action: 'Resolve tax liens/payroll issues',
        impact: 'Automatic denial until resolved. Work with IRS on payment plan.',
      });
    }

    if (plan.length === 0) {
      plan.push({
        priority: 'Ready',
        action: 'Apply for funding now',
        impact: 'You meet all criteria for best-in-class terms. Expected approval in 30 mins.',
      });
    }

    return plan;
  };

  const tier = getReadinessTier();
  const actionPlan = getActionPlan();

  const onEmailSubmit = (data: EmailFormData) => {
    // MOCK - In production, this would send data to API/CRM
    console.log('Email form submitted:', data, 'Score:', score, 'Answers:', answers);
    setEmailSubmitted(true);
  };

  const handleDownloadChecklist = () => {
    // MOCK - In production, would generate PDF
    alert('PDF checklist download - would generate personalized action plan in production');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-accent/10 px-4 py-2 rounded-full mb-6">
            <Award className="w-4 h-4 text-accent mr-2" />
            <span className="text-sm font-semibold text-accent">60-Second Assessment</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            MCA <span className="text-gradient-gold">Readiness Score</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Answer 7 quick questions and get a personalized action plan. No BS, just what you need to fix (if anything).
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Questions */}
          <div className="card-premium p-8 mb-8">
            <div className="space-y-6">
              {questions.map((q, index) => (
                <div key={q.id} className="glass p-6 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {index + 1}. {q.question}
                      </h3>
                      <p className="text-sm text-muted-foreground">{q.helpText}</p>
                    </div>
                    <div className="ml-4 text-sm text-accent font-semibold">{q.weight}pts</div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant={answers[q.id] === true ? 'default' : 'outline'}
                      onClick={() => handleAnswer(q.id, true)}
                      className={answers[q.id] === true ? 'bg-accent text-accent-foreground' : ''}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Yes
                    </Button>
                    <Button
                      variant={answers[q.id] === false ? 'default' : 'outline'}
                      onClick={() => handleAnswer(q.id, false)}
                      className={answers[q.id] === false ? 'bg-destructive text-destructive-foreground' : ''}
                    >
                      <X className="w-4 h-4 mr-2" />
                      No
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {!showResults && (
              <div className="mt-8 text-center">
                <Button onClick={handleCalculate} className="btn-hero px-8 py-4">
                  Calculate My Score
                </Button>
              </div>
            )}
          </div>

          {/* Results */}
          {showResults && (
            <div className="space-y-8 animate-fadeIn">
              {/* Score Display */}
              <div className="card-premium p-8 border-2 border-accent/30">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border-4 border-accent mb-4">
                    <div>
                      <div className="text-5xl font-display font-bold text-gradient-gold">{score}</div>
                      <div className="text-xs text-muted-foreground">/ 100</div>
                    </div>
                  </div>

                  <div className={`inline-flex items-center px-6 py-2 rounded-full ${tier.bgColor} mb-4`}>
                    <TrendingUp className={`w-5 h-5 mr-2 ${tier.color}`} />
                    <span className={`font-semibold ${tier.color}`}>{tier.label} Readiness</span>
                  </div>

                  <p className="text-muted-foreground max-w-xl mx-auto">
                    {score >= 85 && "Outstanding! You're in the top 20% of applicants. Expect premium terms."}
                    {score >= 70 && score < 85 && "Strong profile. You qualify for competitive rates with quick approval."}
                    {score >= 50 && score < 70 && "You can qualify, but improving a few areas will get you better terms."}
                    {score < 50 && "Focus on the action plan below. You may qualify now or in 30-90 days after improvements."}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-border/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {questions.filter(q => answers[q.id] === true).length}/{questions.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Criteria Met</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {score >= 70 ? '90%+' : score >= 50 ? '60-80%' : '30-50%'}
                    </div>
                    <div className="text-sm text-muted-foreground">Approval Likelihood</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {score >= 85 ? '1.12-1.18' : score >= 70 ? '1.18-1.22' : '1.22-1.30'}
                    </div>
                    <div className="text-sm text-muted-foreground">Expected Factor</div>
                  </div>
                </div>
              </div>

              {/* Action Plan */}
              <div className="card-premium p-8">
                <h3 className="text-2xl font-display font-bold mb-6 flex items-center">
                  <AlertCircle className="w-6 h-6 text-accent mr-3" />
                  Your Personalized Action Plan
                </h3>

                <div className="space-y-4">
                  {actionPlan.map((item, index) => (
                    <div key={index} className="glass p-5 rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.priority === 'Critical' ? 'bg-destructive/20 text-destructive' :
                          item.priority === 'High' ? 'bg-orange-400/20 text-orange-400' :
                          item.priority === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-accent/20 text-accent'
                        }`}>
                          {item.priority}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{item.action}</h4>
                          <p className="text-sm text-muted-foreground">{item.impact}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Capture / Download */}
              <div className="card-premium p-8">
                {!emailSubmitted ? (
                  !showEmailForm ? (
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-4">Get Your Detailed Checklist</h3>
                      <p className="text-muted-foreground mb-6">
                        We'll email you a step-by-step guide to improve your score and qualify for better terms
                      </p>
                      <Button onClick={() => setShowEmailForm(true)} className="btn-hero">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Me My Action Plan
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-4">
                      <h3 className="text-xl font-semibold mb-4">Get Your Detailed Action Plan</h3>

                      <div>
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          {...register('businessName')}
                          placeholder="ABC Company LLC"
                          className="mt-1"
                        />
                        {errors.businessName && (
                          <p className="text-sm text-destructive mt-1">{errors.businessName.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="your@email.com"
                          className="mt-1"
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          {...register('phone')}
                          placeholder="(555) 123-4567"
                          className="mt-1"
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      <Button type="submit" className="w-full btn-hero">
                        Send My Action Plan
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        We'll also include your score breakdown and estimated approval timeline
                      </p>
                    </form>
                  )
                ) : (
                  <div className="text-center py-6 animate-fadeIn">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Action Plan Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Check your email for your detailed checklist and next steps
                    </p>
                    <Button onClick={handleDownloadChecklist} variant="premium" className="mb-4">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF Checklist
                    </Button>
                    <p className="text-sm text-accent">
                      Want to apply now? Our team will call you within 30 minutes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MCAReadinessScore;
