import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sparkles, TrendingUp, Gift } from 'lucide-react';
import { mockUserProfile, mockRecommendations, formatCurrency } from '@/data/mockData';

const HomeTab = () => {
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="pb-20 px-4 pt-6 animate-fade-in max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">{getTimeGreeting()},</h1>
      <p className="text-3xl font-bold text-primary mb-6">{mockUserProfile.name.split(' ')[0]}</p>

      {/* Active Plan Card */}
      <Card className="mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 shadow-elevated max-w-4xl mx-auto">
        <CardContent className="p-6">
          <Badge className="mb-3 bg-primary text-primary-foreground">Active Plan</Badge>
          <h3 className="text-xl font-bold mb-2">{mockUserProfile.currentPlan}</h3>
          <p className="text-3xl font-bold text-primary mb-3">{formatCurrency(mockUserProfile.planPrice)}<span className="text-sm text-muted-foreground">/month</span></p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-success" />
            <span>Active since {new Date(mockUserProfile.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>
        </CardContent>
      </Card>

      {/* Loyalty Points */}
      <Card className="mb-6 shadow-card max-w-4xl mx-auto">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-secondary" />
              <span className="font-semibold">Loyalty Points</span>
            </div>
            <span className="text-xl font-bold text-secondary">{mockUserProfile.loyaltyPoints}</span>
          </div>
          <Progress value={(mockUserProfile.loyaltyPoints / 1000) * 100} className="h-2 mb-1" />
          <p className="text-xs text-muted-foreground">{1000 - mockUserProfile.loyaltyPoints} points to next reward</p>
        </CardContent>
      </Card>

      {/* Just For You Section */}
      <div className="mb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Just For You</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockRecommendations.map((rec, idx) => (
            <Card key={rec.id} className={`shadow-card hover-scale ${idx === 0 ? 'border-primary/50' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{rec.title}</h3>
                    {rec.badge && (
                      <Badge variant="secondary" className="text-xs">{rec.badge}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                  <div className="flex items-center gap-2">
                    {rec.discount ? (
                      <>
                        <span className="text-lg font-bold text-primary">{formatCurrency(rec.price * (1 - rec.discount / 100))}</span>
                        <span className="text-sm line-through text-muted-foreground">{formatCurrency(rec.price)}</span>
                        <Badge className="bg-destructive/10 text-destructive border-destructive/30 text-xs">-{rec.discount}%</Badge>
                      </>
                    ) : rec.price === 0 ? (
                      <span className="text-lg font-bold text-success">Free</span>
                    ) : (
                      <span className="text-lg font-bold text-primary">{formatCurrency(rec.price)}</span>
                    )}
                  </div>
                </div>
                <Badge className="bg-primary/10 text-primary ml-2">{rec.match}% Match</Badge>
              </div>
              <Button className="w-full mt-3" size="sm">
                {idx === 0 ? 'Add to Plan' : 'Learn More'}
              </Button>
            </CardContent>
          </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
