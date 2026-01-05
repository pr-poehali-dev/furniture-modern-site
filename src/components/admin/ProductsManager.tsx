import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Product } from '@/types/product';
import { materials, styles, colors } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

const API_URL = 'https://functions.poehali.dev/02e5b34b-f4fa-4f7e-b01f-a36dd4e2c6af';

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Кухни прямые',
    material: materials[0],
    style: styles[0],
    color: colors[0],
    manufacturer: '',
    description: '',
    images: ['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/ff25111a-480b-4143-83e4-7b4b74da9603.jpg'],
    dimensions: { length: 0, width: 0, height: 0 },
  });

  const loadProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось загрузить товары', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: 0,
        category: 'Кухни прямые',
        material: materials[0],
        style: styles[0],
        color: colors[0],
        manufacturer: '',
        description: '',
        images: ['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/ff25111a-480b-4143-83e4-7b4b74da9603.jpg'],
        dimensions: { length: 0, width: 0, height: 0 },
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingProduct) {
        // Обновление
        await fetch(API_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingProduct.id }),
        });
        toast({ title: 'Успешно', description: 'Товар обновлён' });
      } else {
        // Создание
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        toast({ title: 'Успешно', description: 'Товар добавлен' });
      }
      setIsDialogOpen(false);
      loadProducts();
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось сохранить товар', 
        variant: 'destructive' 
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
      toast({ title: 'Удалено', description: 'Товар удалён', variant: 'destructive' });
      loadProducts();
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось удалить товар', 
        variant: 'destructive' 
      });
    }
  };

  if (loading) {
    return <div className="text-center py-16">Загрузка...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Управление товарами</h1>
          <p className="text-muted-foreground">Всего товаров: {products.length}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Icon name="Plus" className="h-4 w-4 mr-2" />
              Добавить товар
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Редактировать товар' : 'Новый товар'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Название</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Цена (₽)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Категория</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['Кухни прямые', 'Кухни угловые', 'Модульные кухни', 'Аксессуары'].map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Материал</Label>
                  <Select
                    value={formData.material}
                    onValueChange={(value) => setFormData({ ...formData, material: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((mat) => (
                        <SelectItem key={mat} value={mat}>{mat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Стиль</Label>
                  <Select
                    value={formData.style}
                    onValueChange={(value) => setFormData({ ...formData, style: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {styles.map((style) => (
                        <SelectItem key={style} value={style}>{style}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Цвет</Label>
                  <Select
                    value={formData.color}
                    onValueChange={(value) => setFormData({ ...formData, color: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Производитель</Label>
                <Input
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                />
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label className="mb-3 block">Изображения</Label>
                <div className="space-y-2">
                  {formData.images?.map((img, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={img}
                        onChange={(e) => {
                          const newImages = [...(formData.images || [])];
                          newImages[index] = e.target.value;
                          setFormData({ ...formData, images: newImages });
                        }}
                        placeholder="URL изображения"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newImages = formData.images?.filter((_, i) => i !== index);
                          setFormData({ ...formData, images: newImages });
                        }}
                      >
                        <Icon name="Trash2" className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => setFormData({ 
                      ...formData, 
                      images: [...(formData.images || []), ''] 
                    })}
                    className="w-full"
                  >
                    <Icon name="Plus" className="h-4 w-4 mr-2" />
                    Добавить изображение
                  </Button>
                </div>
              </div>
              <div>
                <Label className="mb-3 block">Габариты (см)</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Длина</Label>
                    <Input
                      type="number"
                      value={formData.dimensions?.length || 0}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        dimensions: { 
                          ...formData.dimensions!, 
                          length: Number(e.target.value) 
                        } 
                      })}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Ширина</Label>
                    <Input
                      type="number"
                      value={formData.dimensions?.width || 0}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        dimensions: { 
                          ...formData.dimensions!, 
                          width: Number(e.target.value) 
                        } 
                      })}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Высота</Label>
                    <Input
                      type="number"
                      value={formData.dimensions?.height || 0}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        dimensions: { 
                          ...formData.dimensions!, 
                          height: Number(e.target.value) 
                        } 
                      })}
                    />
                  </div>
                </div>
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingProduct ? 'Сохранить изменения' : 'Добавить товар'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price.toLocaleString('ru-RU')} ₽</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(product)}
                    >
                      <Icon name="Pencil" className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Icon name="Trash2" className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}