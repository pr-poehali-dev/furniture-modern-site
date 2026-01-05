import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const API_URL = 'https://functions.poehali.dev/57f804f2-8be4-4503-879a-db04a47a23ee';

interface Customer {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  city: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
}

export default function CustomersManager() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить клиентов',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, [toast]);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalOrders = customers.reduce((sum, c) => sum + c.totalOrders, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const stats = [
    {
      title: 'Всего клиентов',
      value: totalCustomers,
      icon: 'Users',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Общая выручка',
      value: `${totalRevenue.toLocaleString('ru-RU')} ₽`,
      icon: 'TrendingUp',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Средний чек',
      value: `${Math.round(averageOrderValue).toLocaleString('ru-RU')} ₽`,
      icon: 'DollarSign',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">База клиентов (CRM)</h1>
        <p className="text-muted-foreground">Управление клиентской базой</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <Icon name={stat.icon} className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">Загрузка клиентов...</p>
        </div>
      ) : customers.length === 0 ? (
        <div className="text-center py-16">
          <Icon name="Users" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-xl text-muted-foreground">Клиентов пока нет</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени, телефону или городу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>ФИО</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Город</TableHead>
              <TableHead>Заказов</TableHead>
              <TableHead>Потрачено</TableHead>
              <TableHead>Добавлен</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{customer.lastName} {customer.firstName}</p>
                    {customer.middleName && <p className="text-sm text-muted-foreground">{customer.middleName}</p>}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" className="h-3 w-3 text-muted-foreground" />
                    {customer.phone}
                  </div>
                </TableCell>
                <TableCell>{customer.city}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Icon name="ShoppingBag" className="h-4 w-4 text-muted-foreground" />
                    {customer.totalOrders}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">
                  {customer.totalSpent.toLocaleString('ru-RU')} ₽
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(customer.createdAt).toLocaleDateString('ru-RU')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Users" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">Клиенты не найдены</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}