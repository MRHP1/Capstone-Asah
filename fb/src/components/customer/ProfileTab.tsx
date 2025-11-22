import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Phone, Mail, Calendar, CreditCard, RefreshCw } from 'lucide-react';
import { mockUserProfile, formatCurrency } from '@/data/mockData';

interface ProfileTabProps {
  onRetakeSurvey: () => void;
  onLogout: () => void;
}

const ProfileTab = ({ onRetakeSurvey, onLogout }: ProfileTabProps) => {
  return (
    <div className="pb-20 px-4 pt-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {/* Profile Card */}
      <Card className="mb-6 shadow-elevated">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {mockUserProfile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold">{mockUserProfile.name}</h2>
              <p className="text-sm text-muted-foreground">Premium Member</p>
            </div>
          </div>

          <Separator className="mb-6" />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Phone Number</p>
                <p className="font-medium">{mockUserProfile.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium">{mockUserProfile.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="font-medium">{new Date(mockUserProfile.joinDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Current Plan</p>
                <p className="font-medium">{mockUserProfile.currentPlan} • {formatCurrency(mockUserProfile.planPrice)}/mo</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="mb-6 shadow-card">
        <CardContent className="p-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onRetakeSurvey}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retake AI Recommendation Survey
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full">Edit Profile</Button>
        <Button variant="outline" className="w-full">Payment Methods</Button>
        <Button variant="outline" className="w-full">Billing History</Button>
        <Button variant="outline" className="w-full text-destructive hover:text-destructive" onClick={onLogout}>Sign Out</Button>
      </div>
    </div>
  );
};

export default ProfileTab;
