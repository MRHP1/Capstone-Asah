import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Smartphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Telco Next Best Offer
          </h1>
          <p className="text-xl text-muted-foreground">
            AI-Powered Recommendation System
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Admin Portal Card */}
          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-primary cursor-pointer group animate-scale-in">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <LayoutDashboard className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription className="text-base">
                Monitor Model Accuracy & Analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/admin')} 
                className="w-full h-12 text-lg"
                variant="default"
              >
                Access Dashboard
              </Button>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>View customer analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Track model performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Manage recommendations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Hub Card */}
          <Card className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-elevated cursor-pointer group animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="w-10 h-10 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl">Customer Hub</CardTitle>
              <CardDescription className="text-base">
                Find your perfect plan in 30 seconds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/customer')} 
                className="w-full h-12 text-lg"
                variant="outline"
              >
                Get Started
              </Button>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <span>AI-powered recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <span>Personalized offers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <span>Instant results</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>By A25-CS028's Group Project of Capstone</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
