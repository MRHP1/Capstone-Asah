import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockUsageHistory } from '@/data/mockData';
import { Lightbulb, TrendingUp } from 'lucide-react';

const UsageTab = () => {
  const currentMonth = mockUsageHistory[mockUsageHistory.length - 1];
  const dataUsagePercent = (currentMonth.dataUsed / currentMonth.dataLimit) * 100;

  return (
    <div className="pb-20 px-4 pt-6 animate-fade-in max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Usage Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {/* Current Usage Card */}
          <Card className="mb-6 shadow-elevated border-primary/20">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">This Month's Data</h3>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-bold text-primary">{currentMonth.dataUsed}</span>
            <span className="text-lg text-muted-foreground mb-1">/ {currentMonth.dataLimit} GB</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden mb-2">
            <div
              className={`h-full transition-all ${
                dataUsagePercent > 80 ? 'bg-destructive' : dataUsagePercent > 60 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${Math.min(dataUsagePercent, 100)}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{(currentMonth.dataLimit - currentMonth.dataUsed).toFixed(1)} GB remaining</p>
          </CardContent>
        </Card>

        {/* AI Insight */}
        <Card className="mb-6 bg-gradient-to-br from-info/5 to-primary/5 border-info/20">
        <CardContent className="p-4 flex gap-3">
          <Lightbulb className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm mb-1">AI Insight</p>
            <p className="text-sm text-muted-foreground">You use 80% of your data on weekends. Consider our Unlimited Weekend Data plan!</p>
          </div>
          </CardContent>
        </Card>
        </div>

        <div>
          {/* Data Usage History Chart */}
          <Card className="mb-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Data Usage Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockUsageHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="dataUsed" fill="hsl(var(--primary))" name="Used (GB)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="dataLimit" fill="hsl(var(--muted))" name="Limit (GB)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Call & SMS History Chart */}
        <Card className="mb-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Call & SMS Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockUsageHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="callMinutes" stroke="hsl(var(--secondary))" name="Call Minutes" strokeWidth={2} />
              <Line type="monotone" dataKey="sms" stroke="hsl(var(--info))" name="SMS" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default UsageTab;
