import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, CheckCircle, AlertCircle, Database, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DataManagementPage = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const { toast } = useToast();

  const handleUpload = () => {
    setIsUploading(true);
    setUploadComplete(false);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          toast({
            title: 'Upload Complete',
            description: '1,250 rows processed successfully by AI model',
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Data Management</h2>
        <p className="text-muted-foreground">Upload and process customer datasets for model training</p>
      </div>

      {/* Upload Area */}
      <Card className="mb-6 shadow-elevated border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors">
        <CardContent className="p-12 text-center">
          {!isUploading && !uploadComplete && (
            <>
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Upload className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Upload Monthly CSV Dataset</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Drag and drop your file here, or click to browse<br />
                Supported formats: CSV, XLSX (Max 50MB)
              </p>
              <Button onClick={handleUpload} size="lg">
                <Upload className="mr-2 h-4 w-4" />
                Select File to Upload
              </Button>
            </>
          )}

          {isUploading && (
            <div className="animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Database className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Processing Dataset...</h3>
              <p className="text-sm text-muted-foreground mb-4">AI is analyzing and validating data</p>
              <Progress value={uploadProgress} className="h-2 mb-2" />
              <p className="text-sm font-medium">{uploadProgress}% Complete</p>
            </div>
          )}

          {uploadComplete && (
            <div className="animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h3 className="text-xl font-bold text-success mb-2">Upload Successful!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                1,250 rows processed by AI Model<br />
                Dataset validated and ready for training
              </p>
              <Button onClick={() => setUploadComplete(false)} variant="outline">
                Upload Another File
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Uploads */}
      <Card className="shadow-card mb-6">
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'customer_data_nov_2024.csv', rows: 1250, status: 'processed', date: '2 hours ago' },
              { name: 'usage_metrics_oct_2024.csv', rows: 1180, status: 'processed', date: '1 day ago' },
              { name: 'behavioral_data_sep_2024.csv', rows: 1095, status: 'processed', date: '5 days ago' },
            ].map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center gap-3 flex-1">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.rows} rows • {file.date}</p>
                  </div>
                </div>
                <Badge className="bg-success/10 text-success border-success/30">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {file.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">125,480</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">+1,250 this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-success/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Data Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">98.2%</div>
            <p className="text-xs text-muted-foreground mt-1">Clean records</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-warning/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              Validation Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">23</div>
            <p className="text-xs text-muted-foreground mt-1">Pending review</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataManagementPage;
