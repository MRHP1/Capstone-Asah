import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockModelMetrics, mockFeatureImportance } from '@/data/mockData';
import { TrendingUp, Calendar, Target, Zap } from 'lucide-react';

const ModelHealthPage = () => {
  // Confusion Matrix Mock Data (2x2 for simplicity)
  const confusionMatrix = {
    truePositive: 450,
    falsePositive: 35,
    falseNegative: 28,
    trueNegative: 487,
  };

  const featureChartData = mockFeatureImportance.map(f => ({
    ...f,
    importancePercent: f.importance * 100,
  }));

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Model Health Monitor</h2>
        <p className="text-muted-foreground">Real-time AI performance tracking and diagnostics</p>
      </div>

      {/* Model Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-card border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4" />
              Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{mockModelMetrics.accuracy}%</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">+2.3% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Precision</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockModelMetrics.precision}%</div>
            <Progress value={mockModelMetrics.precision} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recall</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockModelMetrics.recall}%</div>
            <Progress value={mockModelMetrics.recall} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="shadow-card border-success/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4" />
              F1-Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{mockModelMetrics.f1Score}%</div>
            <Badge className="mt-2 bg-success/10 text-success border-success/30 text-xs">Excellent</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Confusion Matrix */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Confusion Matrix
              <Badge variant="outline" className="text-xs">Validation Set</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-success/10 border-2 border-success/30 rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground mb-1">True Positive</div>
                <div className="text-3xl font-bold text-success">{confusionMatrix.truePositive}</div>
              </div>
              <div className="bg-destructive/10 border-2 border-destructive/30 rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground mb-1">False Positive</div>
                <div className="text-3xl font-bold text-destructive">{confusionMatrix.falsePositive}</div>
              </div>
              <div className="bg-destructive/10 border-2 border-destructive/30 rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground mb-1">False Negative</div>
                <div className="text-3xl font-bold text-destructive">{confusionMatrix.falseNegative}</div>
              </div>
              <div className="bg-success/10 border-2 border-success/30 rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground mb-1">True Negative</div>
                <div className="text-3xl font-bold text-success">{confusionMatrix.trueNegative}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {new Date(mockModelMetrics.lastTrainingDate).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Training Info */}
        <Card className="shadow-card bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle>Model Training Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
              <span className="text-sm font-medium">Last Training Date</span>
              <span className="text-sm font-bold">{new Date(mockModelMetrics.lastTrainingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
              <span className="text-sm font-medium">Training Dataset Size</span>
              <span className="text-sm font-bold">125,480 samples</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
              <span className="text-sm font-medium">Model Version</span>
              <Badge>v2.4.1</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
              <span className="text-sm font-medium">Algorithm</span>
              <span className="text-sm font-bold">XGBoost + Neural Net</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Importance */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Feature Importance Analysis</CardTitle>
          <p className="text-sm text-muted-foreground">What drives our AI recommendations</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" domain={[0, 40]} />
              <YAxis dataKey="feature" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => `${value.toFixed(1)}%`}
              />
              <Bar dataKey="importancePercent" fill="hsl(var(--primary))" name="Importance %" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelHealthPage;
