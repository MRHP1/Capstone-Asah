import { useState } from 'react';
import { ArrowLeft, Sparkles, Video, Gamepad2, MessageCircle, Briefcase, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/data/mockData';
import BottomNav from '@/components/customer/BottomNav';
import HomeTab from '@/components/customer/HomeTab';
import UsageTab from '@/components/customer/UsageTab';
import ProfileTab from '@/components/customer/ProfileTab';

type Activity = 'streaming' | 'gaming' | 'social' | 'work' | null;
type DataRange = '10' | '30' | '50' | null;
type DashboardTab = 'home' | 'usage' | 'profile';

const Customer = () => {
  const [hasCompletedSurvey, setHasCompletedSurvey] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('home');
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [activity, setActivity] = useState<Activity>(null);
  const [dataRange, setDataRange] = useState<DataRange>(null);
  const [budget, setBudget] = useState([100000]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = () => {
    if (step === 3) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(4);
      }, 2500);
    } else {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleCompleteOnboarding = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasCompletedSurvey(true);
    }, 2000);
  };

  const handleRetakeSurvey = () => {
    setHasCompletedSurvey(false);
    setStep(1);
    setActivity(null);
    setDataRange(null);
    setBudget([100000]);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const getRecommendation = () => {
    if (!activity || !dataRange) return null;

    const recommendations: Record<Activity, { name: string; price: number; reason: string; match: number }> = {
      streaming: { name: 'Ultimate Streaming Pack', price: 150000, reason: 'Unlimited video streaming with 50GB high-speed data', match: 96 },
      gaming: { name: 'Gaming Pro Bundle', price: 180000, reason: 'Low latency gaming with 75GB data and priority routing', match: 98 },
      social: { name: 'Social Connect Plus', price: 80000, reason: 'Free social media apps with 20GB data', match: 94 },
      work: { name: 'Business Premium', price: 200000, reason: 'Unlimited calls, 100GB data with priority support', match: 97 },
    };

    return recommendations[activity];
  };

  const recommendation = getRecommendation();

  if (hasCompletedSurvey) {
    return (
      <div className="min-h-screen bg-background">
        {dashboardTab === 'home' && <HomeTab />}
        {dashboardTab === 'usage' && <UsageTab />}
        {dashboardTab === 'profile' && <ProfileTab onRetakeSurvey={handleRetakeSurvey} onLogout={handleLogout} />}
        <BottomNav activeTab={dashboardTab} onTabChange={setDashboardTab} />
      </div>
    );
  }

  if (isProcessing && step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
        <div className="text-center animate-fade-in">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-primary animate-pulse-glow"></div>
            <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-primary animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Setting up your dashboard...</h2>
          <p className="text-muted-foreground">Personalizing your experience</p>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
        <div className="text-center animate-fade-in">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-primary animate-pulse-glow"></div>
            <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-primary animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">AI is analyzing...</h2>
          <p className="text-muted-foreground">Finding your perfect match from 1,000+ plans</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => window.location.href = '/'}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`h-2 w-12 rounded-full transition-colors ${s <= step ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>
        </div>

        {step === 1 && (
          <Card className="shadow-elevated animate-scale-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">What's your main activity?</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'streaming' as Activity, icon: Video, label: 'Streaming', desc: 'YouTube, Netflix' },
                  { id: 'gaming' as Activity, icon: Gamepad2, label: 'Gaming', desc: 'Online games' },
                  { id: 'social' as Activity, icon: MessageCircle, label: 'Social Media', desc: 'Instagram, TikTok' },
                  { id: 'work' as Activity, icon: Briefcase, label: 'Work', desc: 'Video calls, Email' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setActivity(option.id)}
                    className={`p-6 rounded-xl border-2 transition-all hover-scale ${
                      activity === option.id ? 'border-primary bg-primary/5' : 'border-border bg-card'
                    }`}
                  >
                    <option.icon className={`w-12 h-12 mx-auto mb-3 ${activity === option.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <p className="font-semibold mb-1">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                  </button>
                ))}
              </div>
              <Button className="w-full mt-6 h-12" disabled={!activity} onClick={handleNext}>
                Next
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="shadow-elevated animate-scale-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">How much data do you need?</h2>
              <div className="space-y-3">
                {[
                  { id: '10' as DataRange, label: '< 10 GB', desc: 'Light browsing' },
                  { id: '30' as DataRange, label: '10-30 GB', desc: 'Moderate usage' },
                  { id: '50' as DataRange, label: '> 30 GB', desc: 'Heavy streaming' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setDataRange(option.id)}
                    className={`w-full p-5 rounded-xl border-2 transition-all hover-scale text-left ${
                      dataRange === option.id ? 'border-primary bg-primary/5' : 'border-border bg-card'
                    }`}
                  >
                    <p className="font-semibold mb-1">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                  </button>
                ))}
              </div>
              <Button className="w-full mt-6 h-12" disabled={!dataRange} onClick={handleNext}>
                Next
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="shadow-elevated animate-scale-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Monthly Budget</h2>
              <div className="mb-8">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-primary">{formatCurrency(budget[0])}</span>
                  <p className="text-sm text-muted-foreground mt-2">per month</p>
                </div>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  min={20000}
                  max={200000}
                  step={10000}
                  className="mb-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Rp 20k</span>
                  <span>Rp 200k</span>
                </div>
              </div>
              <Button className="w-full h-12" onClick={handleNext}>
                Find My Plan
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 4 && recommendation && (
          <Card className="shadow-elevated animate-scale-in border-2 border-primary/50">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Badge className="mb-4 text-base px-4 py-2 bg-success/10 text-success border-success/30">
                  {recommendation.match}% Match
                </Badge>
                <h2 className="text-3xl font-bold mb-2">{recommendation.name}</h2>
                <p className="text-5xl font-bold text-primary mb-2">{formatCurrency(recommendation.price)}</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium mb-1">Why this fits you:</p>
                <p className="text-muted-foreground">{recommendation.reason}</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3"><Check className="w-5 h-5 text-success" /><span className="text-sm">Free installation & activation</span></div>
                <div className="flex items-center gap-3"><Check className="w-5 h-5 text-success" /><span className="text-sm">24/7 customer support</span></div>
                <div className="flex items-center gap-3"><Check className="w-5 h-5 text-success" /><span className="text-sm">No commitment, cancel anytime</span></div>
              </div>
              <Button className="w-full h-12 mb-3" onClick={handleCompleteOnboarding}>Subscribe & Continue</Button>
              <Button variant="outline" className="w-full h-12" onClick={() => window.location.href = '/'}>Back to Home</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Customer;
