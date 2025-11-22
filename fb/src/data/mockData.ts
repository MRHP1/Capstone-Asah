export interface CustomerData {
  id: string;
  device: string;
  data_gb: number;
  video_pct: number;
  spend: number;
  offer: string;
  confidence: number;
  churnRisk?: 'low' | 'medium' | 'high';
}

export const mockCustomerData: CustomerData[] = [
  { id: 'C00001', device: 'Realme', data_gb: 1.5, video_pct: 80, spend: 70000, offer: 'General Offer', confidence: 88, churnRisk: 'low' },
  { id: 'C00002', device: 'Vivo', data_gb: 1.09, video_pct: 10, spend: 63000, offer: 'General Offer', confidence: 75, churnRisk: 'medium' },
  { id: 'C00004', device: 'Apple', data_gb: 5.32, video_pct: 42, spend: 67000, offer: 'Data Add-on', confidence: 95, churnRisk: 'low' },
  { id: 'C00007', device: 'Oppo', data_gb: 9.87, video_pct: 37, spend: 140000, offer: 'Device Upgrade', confidence: 98, churnRisk: 'low' },
  { id: 'C00008', device: 'Oppo', data_gb: 13.91, video_pct: 46, spend: 180000, offer: 'Device Upgrade', confidence: 96, churnRisk: 'low' },
  { id: 'C00006', device: 'Oppo', data_gb: 3.3, video_pct: 47, spend: 54000, offer: 'Top-up Promo', confidence: 91, churnRisk: 'high' },
  { id: 'C00098', device: 'Samsung', data_gb: 0.5, video_pct: 5, spend: 25000, offer: 'Retention Offer', confidence: 68, churnRisk: 'high' },
];

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  joinDate: string;
  currentPlan: string;
  planPrice: number;
  loyaltyPoints: number;
}

export const mockUserProfile: UserProfile = {
  name: 'Alex Johnson',
  phone: '+62 812-3456-7890',
  email: 'alex.j@email.com',
  joinDate: '2023-06-15',
  currentPlan: 'Ultimate Streaming Pack',
  planPrice: 150000,
  loyaltyPoints: 850,
};

export interface UsageData {
  month: string;
  dataUsed: number;
  dataLimit: number;
  callMinutes: number;
  sms: number;
}

export const mockUsageHistory: UsageData[] = [
  { month: 'Jan', dataUsed: 35, dataLimit: 50, callMinutes: 180, sms: 45 },
  { month: 'Feb', dataUsed: 42, dataLimit: 50, callMinutes: 210, sms: 38 },
  { month: 'Mar', dataUsed: 48, dataLimit: 50, callMinutes: 195, sms: 52 },
  { month: 'Apr', dataUsed: 38, dataLimit: 50, callMinutes: 220, sms: 41 },
  { month: 'May', dataUsed: 45, dataLimit: 50, callMinutes: 205, sms: 36 },
  { month: 'Jun', dataUsed: 47, dataLimit: 50, callMinutes: 198, sms: 44 },
];

export interface RecommendationCard {
  id: string;
  title: string;
  description: string;
  price: number;
  discount?: number;
  badge?: string;
  match: number;
}

export const mockRecommendations: RecommendationCard[] = [
  {
    id: 'rec1',
    title: 'Booster Video 10GB',
    description: 'Extra 10GB for YouTube & Netflix',
    price: 35000,
    discount: 20,
    badge: 'Popular',
    match: 96,
  },
  {
    id: 'rec2',
    title: 'Spotify Premium Bundle',
    description: '3 months free with your plan',
    price: 0,
    badge: 'Free Trial',
    match: 88,
  },
  {
    id: 'rec3',
    title: 'Unlimited Weekend Data',
    description: 'No limits on Sat & Sun',
    price: 25000,
    match: 85,
  },
];

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  lastTrainingDate: string;
}

export const mockModelMetrics: ModelMetrics = {
  accuracy: 92.4,
  precision: 91.2,
  recall: 93.8,
  f1Score: 92.5,
  lastTrainingDate: '2024-11-15',
};

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export const mockFeatureImportance: FeatureImportance[] = [
  { feature: 'Data Usage', importance: 0.35 },
  { feature: 'Monthly Spend', importance: 0.28 },
  { feature: 'Video %', importance: 0.18 },
  { feature: 'Call Duration', importance: 0.12 },
  { feature: 'Device Brand', importance: 0.07 },
];

export interface Alert {
  id: string;
  type: 'churn' | 'upsell' | 'issue';
  message: string;
  customerId: string;
  timestamp: string;
}

export const mockAlerts: Alert[] = [
  { id: 'A001', type: 'churn', message: 'High Churn Risk detected', customerId: 'C00098', timestamp: '2 hours ago' },
  { id: 'A002', type: 'upsell', message: 'Ready for Device Upgrade', customerId: 'C00007', timestamp: '5 hours ago' },
  { id: 'A003', type: 'churn', message: 'Usage dropping 40%', customerId: 'C00006', timestamp: '1 day ago' },
];

export const getOfferColor = (offer: string): string => {
  const colors: Record<string, string> = {
    'General Offer': 'bg-muted text-muted-foreground',
    'Data Add-on': 'bg-primary/10 text-primary',
    'Device Upgrade': 'bg-secondary/10 text-secondary',
    'Top-up Promo': 'bg-warning/10 text-warning',
    'Retention Offer': 'bg-destructive/10 text-destructive',
  };
  return colors[offer] || 'bg-muted text-muted-foreground';
};

export const getChurnRiskColor = (risk: string): string => {
  const colors: Record<string, string> = {
    low: 'text-success',
    medium: 'text-warning',
    high: 'text-destructive',
  };
  return colors[risk] || 'text-muted-foreground';
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const calculateKPIs = () => {
  const totalUsers = mockCustomerData.length;
  const avgSpend = mockCustomerData.reduce((sum, c) => sum + c.spend, 0) / totalUsers;
  const modelAccuracy = mockModelMetrics.accuracy;
  
  return {
    totalUsers,
    avgSpend,
    modelAccuracy,
  };
};
