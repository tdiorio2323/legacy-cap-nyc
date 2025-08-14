import { useState } from 'react';
import { X, Calculator, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FundingCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const FundingCalculator = ({ isOpen, onClose }: FundingCalculatorProps) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState('');
  const [businessAge, setBusinessAge] = useState('');
  const [fundingAmount, setFundingAmount] = useState('');
  const [results, setResults] = useState<{
    maxFunding: number;
    dailyPayment: number;
    factor: number;
    term: number;
  } | null>(null);

  const calculateFunding = () => {
    const revenue = parseFloat(monthlyRevenue);
    const amount = parseFloat(fundingAmount);
    const age = parseInt(businessAge);

    if (!revenue || !amount || !age) return;

    // Premium calculation logic
    const maxFundingRatio = age >= 12 ? 0.3 : 0.2;
    const maxFunding = Math.min(revenue * maxFundingRatio * 12, 500000);
    
    const factor = amount >= 100000 ? 1.15 : amount >= 50000 ? 1.18 : 1.22;
    const totalPayback = amount * factor;
    const term = amount >= 100000 ? 12 : amount >= 50000 ? 10 : 8;
    const dailyPayment = totalPayback / (term * 22); // 22 business days per month

    setResults({
      maxFunding: Math.floor(maxFunding),
      dailyPayment: Math.floor(dailyPayment),
      factor,
      term
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl card-premium p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Calculator className="w-6 h-6 text-accent mr-3" />
            <h2 className="text-2xl font-display font-bold">Funding Calculator</h2>
          </div>
          <p className="text-muted-foreground">
            Get an instant estimate of your funding potential
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="revenue" className="text-sm font-medium mb-2 block">
                Monthly Revenue
              </Label>
              <Input
                id="revenue"
                type="number"
                placeholder="$50,000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>

            <div>
              <Label htmlFor="age" className="text-sm font-medium mb-2 block">
                Business Age (months)
              </Label>
              <Select value={businessAge} onValueChange={setBusinessAge}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select business age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">1 year</SelectItem>
                  <SelectItem value="24">2 years</SelectItem>
                  <SelectItem value="36">3+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount" className="text-sm font-medium mb-2 block">
                Desired Funding Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="$100,000"
                value={fundingAmount}
                onChange={(e) => setFundingAmount(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>

            <Button 
              onClick={calculateFunding}
              className="w-full btn-hero"
            >
              Calculate Funding
            </Button>
          </div>

          <div className="space-y-4">
            {results ? (
              <div className="glass p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-accent mb-4">Your Results</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-accent mr-2" />
                    <span className="text-sm text-muted-foreground">Max Funding</span>
                  </div>
                  <span className="text-lg font-bold text-gradient-gold">
                    ${results.maxFunding.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-accent mr-2" />
                    <span className="text-sm text-muted-foreground">Daily Payment</span>
                  </div>
                  <span className="text-lg font-bold">
                    ${results.dailyPayment.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-accent mr-2" />
                    <span className="text-sm text-muted-foreground">Factor Rate</span>
                  </div>
                  <span className="text-lg font-bold">
                    {results.factor.toFixed(2)}
                  </span>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-3">
                    Based on {results.term} month term • {results.term * 22} business days
                  </p>
                  <Button 
                    className="w-full btn-hero"
                    onClick={onClose}
                  >
                    Apply for This Amount
                  </Button>
                </div>
              </div>
            ) : (
              <div className="glass p-6 rounded-lg text-center">
                <Calculator className="w-12 h-12 text-accent mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Fill in the details to see your funding estimate
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingCalculator;