import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const API_URL = 'https://functions.poehali.dev/eadf3b13-4a58-4dfe-8483-18438ce40377';
const UPDATE_STATUS_URL = 'https://functions.poehali.dev/b1d96e8c-2de9-4ac3-8e5f-7bcd6ca114ed';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels = {
  pending: 'Новый',
  confirmed: 'Подтверждён',
  processing: 'В обработке',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
};

type OrderStatus = keyof typeof statusLabels;

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  city: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  notes: string;
  createdAt: string;
}

export default function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const notesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить заказы',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [toast]);



  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setEditedNotes(order.notes || '');
    setIsDialogOpen(true);
  };

  const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    try {
      const response = await fetch(UPDATE_STATUS_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (response.ok) {
        setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
        toast({ 
          title: 'Статус обновлён', 
          description: `Заказ #${orderId} - ${statusLabels[newStatus]}` 
        });
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус',
        variant: 'destructive',
      });
    }
  };

  const handleNotesChange = (value: string) => {
    setEditedNotes(value);
    
    if (notesTimeoutRef.current) {
      clearTimeout(notesTimeoutRef.current);
    }
    
    notesTimeoutRef.current = setTimeout(() => {
      saveNotes(value);
    }, 1000);
  };

  const saveNotes = async (notes: string) => {
    if (!selectedOrder) return;
    
    setIsSavingNotes(true);
    try {
      const response = await fetch(UPDATE_STATUS_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: selectedOrder.id, notes }),
      });

      if (response.ok) {
        setOrders(orders.map((o) => 
          o.id === selectedOrder.id ? { ...o, notes } : o
        ));
        setSelectedOrder({ ...selectedOrder, notes });
        toast({ 
          title: 'Примечание сохранено',
          description: 'Изменения успешно сохранены'
        });
      } else {
        throw new Error('Failed to save notes');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить примечание',
        variant: 'destructive',
      });
    } finally {
      setIsSavingNotes(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Управление заказами</h1>
        <p className="text-muted-foreground">Всего заказов: {orders.length}</p>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">Загрузка заказов...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">Заказов пока нет</p>
        </div>
      ) : (

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>№ Заказа</TableHead>
              <TableHead>Клиент</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Город</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.lastName} {order.firstName}</p>
                    {order.middleName && <p className="text-sm text-muted-foreground">{order.middleName}</p>}
                  </div>
                </TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.city}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString('ru-RU')}</TableCell>
                <TableCell className="font-semibold">{order.total.toLocaleString('ru-RU')} ₽</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue>
                        <Badge className={statusColors[order.status]}>
                          {statusLabels[order.status]}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" onClick={() => handleViewOrder(order)}>
                    <Icon name="Eye" className="h-4 w-4 mr-2" />
                    Подробнее
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Заказ #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Информация о клиенте</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">ФИО:</span> {selectedOrder.lastName} {selectedOrder.firstName} {selectedOrder.middleName}</p>
                    <p><span className="text-muted-foreground">Телефон:</span> {selectedOrder.phone}</p>
                    <p><span className="text-muted-foreground">Город:</span> {selectedOrder.city}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Детали заказа</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Дата:</span> {new Date(selectedOrder.createdAt).toLocaleString('ru-RU')}</p>
                    <p><span className="text-muted-foreground">Адрес:</span> {selectedOrder.address}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Товары в заказе</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Количество: {item.quantity} шт.</p>
                      </div>
                      <p className="font-semibold">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Примечание</h3>
                  {isSavingNotes && <span className="text-xs text-muted-foreground">Сохранение...</span>}
                </div>
                <Textarea
                  value={editedNotes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  placeholder="Добавьте заметки к заказу..."
                  className="min-h-[100px] resize-none"
                />
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-lg font-semibold">Итого:</span>
                <span className="text-2xl font-bold text-primary">{selectedOrder.total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}