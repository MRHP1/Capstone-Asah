import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Package } from 'lucide-react';
import { formatCurrency } from '@/data/mockData';

interface Product {
  id: number;
  name: string;
  price: number;
  data_gb: number;
  type: 'Add-on' | 'Main Plan';
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'VideoMax Bundle', price: 75000, data_gb: 15, type: 'Add-on' },
  { id: 2, name: 'Gaming Booster', price: 50000, data_gb: 10, type: 'Add-on' },
  { id: 3, name: 'Unlimited Social', price: 120000, data_gb: 50, type: 'Main Plan' },
];

const ProductManagementPage = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({ name: '', price: 0, data_gb: 0 });

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditForm({ name: product.name, price: product.price, data_gb: product.data_gb });
  };

  const handleSave = () => {
    if (selectedProduct) {
      setProducts(products.map(p => 
        p.id === selectedProduct.id 
          ? { ...p, name: editForm.name, price: editForm.price, data_gb: editForm.data_gb }
          : p
      ));
      setSelectedProduct(null);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Catalog</h2>
          <p className="text-muted-foreground">Manage your telecom product offerings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="shadow-card hover-scale">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </div>
                <Badge variant={product.type === 'Main Plan' ? 'default' : 'secondary'}>
                  {product.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-3xl font-bold text-primary">{formatCurrency(product.price)}</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
              <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium">Data Included</p>
                <p className="text-2xl font-bold text-secondary">{product.data_gb} GB</p>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleEdit(product)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Product
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="price">Price (IDR)</Label>
              <Input
                id="price"
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="data_gb">Data Amount (GB)</Label>
              <Input
                id="data_gb"
                type="number"
                value={editForm.data_gb}
                onChange={(e) => setEditForm({ ...editForm, data_gb: Number(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedProduct(null)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagementPage;
