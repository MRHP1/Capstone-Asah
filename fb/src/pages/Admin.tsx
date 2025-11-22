import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, TrendingUp, Activity, Database, AlertTriangle, Menu, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { mockCustomerData, mockAlerts, getOfferColor, getChurnRiskColor, formatCurrency, calculateKPIs, CustomerData } from '@/data/mockData';
import ModelHealthPage from '@/components/admin/ModelHealthPage';
import DataManagementPage from '@/components/admin/DataManagementPage';
import ProductManagementPage from '@/components/admin/ProductManagementPage';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'customers' | 'modelHealth' | 'dataManagement' | 'products'>('dashboard');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);
  const [filterHighRisk, setFilterHighRisk] = useState(false);
  const [sentOffers, setSentOffers] = useState<Set<string>>(new Set());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const kpis = calculateKPIs();

  const filteredCustomers = filterHighRisk 
    ? mockCustomerData.filter(c => c.churnRisk === 'high')
    : mockCustomerData;

  const handleSendOffer = (customerId: string) => {
    setSentOffers(prev => new Set(prev).add(customerId));
  };

  // Pie Chart Data
  const offerDistribution = mockCustomerData.reduce((acc, customer) => {
    acc[customer.offer] = (acc[customer.offer] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(offerDistribution).map(([name, value]) => ({ name, value }));
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#3b82f6'];

  // Radar Chart Data
  const radarData = [
    { metric: 'Data Usage', value: mockCustomerData.reduce((s, c) => s + c.data_gb, 0) / mockCustomerData.length },
    { metric: 'Video %', value: mockCustomerData.reduce((s, c) => s + c.video_pct, 0) / mockCustomerData.length },
    { metric: 'Spend (K)', value: mockCustomerData.reduce((s, c) => s + c.spend, 0) / mockCustomerData.length / 1000 },
    { metric: 'Confidence', value: mockCustomerData.reduce((s, c) => s + c.confidence, 0) / mockCustomerData.length },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-card border-r border-border flex flex-col transition-all duration-300 md:relative absolute md:translate-x-0 ${sidebarCollapsed && 'md:w-20'} z-50 h-screen`}>
        <div className="p-6 border-b border-border flex items-center justify-between">
          {!sidebarCollapsed && <h2 className="text-xl font-bold text-primary">Admin Portal</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="ml-auto"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            className={`w-full ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}
            onClick={() => setActiveTab('dashboard')}
            title="Dashboard"
          >
            <LayoutDashboard className={`h-4 w-4 ${!sidebarCollapsed && 'mr-2'}`} />
            {!sidebarCollapsed && 'Dashboard'}
          </Button>
          <Button
            variant={activeTab === 'customers' ? 'default' : 'ghost'}
            className={`w-full ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}
            onClick={() => setActiveTab('customers')}
            title="Customer List"
          >
            <Users className={`h-4 w-4 ${!sidebarCollapsed && 'mr-2'}`} />
            {!sidebarCollapsed && 'Customer List'}
          </Button>
          <Button
            variant={activeTab === 'products' ? 'default' : 'ghost'}
            className={`w-full ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}
            onClick={() => setActiveTab('products')}
            title="Products"
          >
            <Package className={`h-4 w-4 ${!sidebarCollapsed && 'mr-2'}`} />
            {!sidebarCollapsed && 'Products'}
          </Button>
          <Button
            variant={activeTab === 'modelHealth' ? 'default' : 'ghost'}
            className={`w-full ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}
            onClick={() => setActiveTab('modelHealth')}
            title="Model Health"
          >
            <Activity className={`h-4 w-4 ${!sidebarCollapsed && 'mr-2'}`} />
            {!sidebarCollapsed && 'Model Health'}
          </Button>
          <Button
            variant={activeTab === 'dataManagement' ? 'default' : 'ghost'}
            className={`w-full ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}
            onClick={() => setActiveTab('dataManagement')}
            title="Data Management"
          >
            <Database className={`h-4 w-4 ${!sidebarCollapsed && 'mr-2'}`} />
            {!sidebarCollapsed && 'Data Management'}
          </Button>
        </nav>
        <div className="p-4 border-t border-border">
          <Button variant="outline" className={`w-full ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`} onClick={() => navigate('/')} title="Back to Home">
            <LogOut className={`h-4 w-4 ${!sidebarCollapsed && 'mr-2'}`} />
            {!sidebarCollapsed && 'Back to Home'}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-card border-b border-border p-6">
          <h1 className="text-3xl font-bold">
            {activeTab === 'dashboard' && 'Analytics Overview'}
            {activeTab === 'customers' && 'Customer Action List'}
            {activeTab === 'products' && 'Product Management'}
            {activeTab === 'modelHealth' && 'Model Health'}
            {activeTab === 'dataManagement' && 'Data Management'}
          </h1>
        </header>

        <div className="p-6">
          {activeTab === 'dashboard' ? (
            <div className="space-y-6 animate-fade-in">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{kpis.totalUsers}</div>
                    <p className="text-xs text-muted-foreground mt-1">Active customers</p>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Monthly Spend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{formatCurrency(kpis.avgSpend)}</div>
                    <p className="text-xs text-muted-foreground mt-1">Per customer</p>
                  </CardContent>
                </Card>

                <Card className="shadow-card border-success/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                      Model Accuracy
                      <TrendingUp className="h-4 w-4 text-success" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-success">{kpis.modelAccuracy}%</div>
                    <p className="text-xs text-muted-foreground mt-1">AI performance</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Offer Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Behavior Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis />
                        <Radar name="Average" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Alerts */}
              <Card className="shadow-card border-warning/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <AlertTriangle className={`h-4 w-4 mt-0.5 ${alert.type === 'churn' ? 'text-destructive' : 'text-info'}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">Customer {alert.customerId} • {alert.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : activeTab === 'customers' ? (
            <div className="animate-fade-in">
              <div className="mb-4 flex gap-3">
                <Button
                  variant={filterHighRisk ? 'default' : 'outline'}
                  onClick={() => setFilterHighRisk(!filterHighRisk)}
                >
                  {filterHighRisk ? 'Show All' : 'Show High Risk Only'}
                </Button>
              </div>

              <Card className="shadow-card">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Customer ID</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Device</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Monthly Spend</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Usage</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Target Offer</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Confidence</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Churn Risk</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCustomers.map((customer) => (
                          <tr
                            key={customer.id}
                            className="border-t border-border hover:bg-muted/30 cursor-pointer transition-colors"
                            onClick={() => setSelectedCustomer(customer)}
                          >
                            <td className="px-6 py-4 font-medium">{customer.id}</td>
                            <td className="px-6 py-4">{customer.device}</td>
                            <td className="px-6 py-4 font-semibold">{formatCurrency(customer.spend)}</td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                {customer.data_gb > 5 && (
                                  <Badge variant="secondary" className="text-xs">High Data</Badge>
                                )}
                                {customer.video_pct > 50 && (
                                  <Badge variant="outline" className="text-xs">Video User</Badge>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge className={getOfferColor(customer.offer)}>
                                {customer.offer}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Progress value={customer.confidence} className="w-20 h-2" />
                                <span className="text-sm font-medium">{customer.confidence}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {customer.churnRisk && (
                                <span className={`text-sm font-medium capitalize ${getChurnRiskColor(customer.churnRisk)}`}>
                                  {customer.churnRisk}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <Button
                                size="sm"
                                variant={sentOffers.has(customer.id) ? "outline" : "default"}
                                disabled={sentOffers.has(customer.id)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSendOffer(customer.id);
                                }}
                              >
                                {sentOffers.has(customer.id) ? 'Sent ✓' : 'Send Offer'}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : activeTab === 'products' ? (
            <ProductManagementPage />
          ) : activeTab === 'modelHealth' ? (
            <ModelHealthPage />
          ) : (
            <DataManagementPage />
          )}
        </div>
      </main>

      {/* Customer Detail Modal */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer ID</p>
                  <p className="font-semibold">{selectedCustomer.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Device</p>
                  <p className="font-semibold">{selectedCustomer.device}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Usage</p>
                  <p className="font-semibold">{selectedCustomer.data_gb} GB</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Video %</p>
                  <p className="font-semibold">{selectedCustomer.video_pct}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Spend</p>
                  <p className="font-semibold">{formatCurrency(selectedCustomer.spend)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Confidence</p>
                  <p className="font-semibold text-success">{selectedCustomer.confidence}%</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Recommended Offer</p>
                <Badge className={`${getOfferColor(selectedCustomer.offer)} text-sm px-4 py-2`}>
                  {selectedCustomer.offer}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
