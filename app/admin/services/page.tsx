// app/admin/services/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Edit, Plus, Sun } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title_hi: '',
    title_en: '',
    slug: '',
    description_hi: '',
    description_en: '',
    price: '',
    icon_type: 'lucide',
    icon_path: 'Sun',
    priority: 100
  });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/services');
      
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch services. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNew = () => {
    setFormData({
      title_hi: '',
      title_en: '',
      slug: '',
      description_hi: '',
      description_en: '',
      price: '',
      icon_type: 'lucide',
      icon_path: 'Sun',
      priority: 100
    });
    setEditingId(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (service) => {
    setFormData({
      title_hi: service.title_hi,
      title_en: service.title_en,
      slug: service.slug,
      description_hi: service.description_hi,
      description_en: service.description_en,
      price: service.price,
      icon_type: service.icon_type,
      icon_path: service.icon_path,
      priority: service.priority || 100
    });
    setEditingId(service.id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/services/${editingId}` : '/api/services';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(editingId ? 'Failed to update service' : 'Failed to create service');
      }
      
      fetchServices();
      setIsDialogOpen(false);
      
      toast({
        title: 'Success',
        description: editingId ? 'Service updated successfully' : 'Service created successfully',
      });
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete service');
      }
      
      fetchServices();
      
      toast({
        title: 'Success',
        description: 'Service deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  // Generate slug from English title
  const generateSlug = () => {
    const englishTitle = formData.title_en;
    if (!englishTitle) return;
    
    const slug = englishTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    setFormData(prev => ({ ...prev, slug }));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Services</h1>
        <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add New Service
        </Button>
      </div>
      
      <Card className="shadow-md">
        <CardHeader className="bg-muted/50">
          <CardTitle>All Services</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Title (Hindi)</TableHead>
                    <TableHead>Title (English)</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No services found</TableCell>
                    </TableRow>
                  ) : (
                    services.map((service) => (
                      <TableRow key={service.id} className="hover:bg-muted/20">
                        <TableCell>{service.title_hi}</TableCell>
                        <TableCell>{service.title_en}</TableCell>
                        <TableCell className="font-mono text-sm">{service.slug}</TableCell>
                        <TableCell>₹{service.price}</TableCell>
                        <TableCell>{service.priority}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(service)} className="border-muted-foreground/30">
                              <Edit className="h-4 w-4 text-blue-500" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(service.id)} className="border-muted-foreground/30">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingId ? 'Edit Service' : 'Add New Service'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="title_hi">
                  Title (Hindi)
                </label>
                <Input
                  id="title_hi"
                  name="title_hi"
                  value={formData.title_hi}
                  onChange={handleInputChange}
                  placeholder="ज्योतिष परामर्श"
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="title_en">
                  Title (English)
                </label>
                <Input
                  id="title_en"
                  name="title_en"
                  value={formData.title_en}
                  onChange={handleInputChange}
                  onBlur={generateSlug}
                  placeholder="Astrology Consultation"
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="slug">
                  Slug
                </label>
                <div className="flex">
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="astrology-consultation"
                    className="w-full font-mono"
                    required
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={generateSlug} 
                    className="ml-2 whitespace-nowrap"
                  >
                    Generate
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="price">
                  Price (₹)
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="1999"
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="icon_type">
                  Icon Type
                </label>
                <select
                  id="icon_type"
                  name="icon_type"
                  value={formData.icon_type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="lucide">Lucide Icon</option>
                  <option value="svg">Custom SVG Path</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="icon_path">
                  {formData.icon_type === 'lucide' ? 'Icon Name' : 'SVG Path'}
                </label>
                <div className="flex items-center">
                  <Input
                    id="icon_path"
                    name="icon_path"
                    value={formData.icon_path}
                    onChange={handleInputChange}
                    placeholder={formData.icon_type === 'lucide' ? 'Sun' : 'M12,2L2,22h20L12,2z'}
                    className="w-full"
                    required
                  />
                  {formData.icon_type === 'lucide' && formData.icon_path && (
                    <div className="ml-2">
                      <Sun className="h-6 w-6 text-sunburst-yellow" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.icon_type === 'lucide' ? 'E.g. Sun, Moon, Star' : 'SVG path data'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="priority">
                  Priority (lower = higher position)
                </label>
                <Input
                  id="priority"
                  name="priority"
                  type="number"
                  value={formData.priority}
                  onChange={handleInputChange}
                  placeholder="100"
                  className="w-full"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="description_hi">
                Description (Hindi)
              </label>
              <Textarea
                id="description_hi"
                name="description_hi"
                value={formData.description_hi}
                onChange={handleInputChange}
                placeholder="अपने जीवन पथ, संबंधों और करियर के बारे में व्यक्तिगत ज्योतिषीय पठन के माध्यम से अंतर्दृष्टि प्राप्त करें।"
                className="w-full"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="description_en">
                Description (English)
              </label>
              <Textarea
                id="description_en"
                name="description_en"
                value={formData.description_en}
                onChange={handleInputChange}
                placeholder="Gain insights into your life path, relationships, and career through personalized astrological readings."
                className="w-full"
                rows={3}
                required
              />
            </div>
            
            <DialogFooter className="gap-2 sm:gap-0">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary/90"
              >
                {editingId ? 'Update Service' : 'Create Service'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}