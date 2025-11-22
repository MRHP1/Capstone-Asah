import { Home, BarChart3, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'usage' | 'profile';
  onTabChange: (tab: 'home' | 'usage' | 'profile') => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'usage' as const, icon: BarChart3, label: 'Usage' },
    { id: 'profile' as const, icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <tab.icon className={`h-6 w-6 mb-1 ${activeTab === tab.id ? 'fill-primary/20' : ''}`} />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
