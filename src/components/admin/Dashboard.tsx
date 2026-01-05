import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { orders } from '@/data/orders';
import { products } from '@/data/products';

export default function Dashboard() {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  const stats = [
    {
      title: 'Общая выручка',
      value: `${totalRevenue.toLocaleString('ru-RU')} ₽`,
      icon: 'TrendingUp',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Всего заказов',
      value: totalOrders,
      icon: 'ShoppingBag',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Товаров в каталоге',
      value: totalProducts,
      icon: 'Package',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Новых заказов',
      value: pendingOrders,
      icon: 'Bell',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Дашборд</h1>
        <p className="text-muted-foreground">Обзор статистики магазина</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <Card>
        <CardHeader>
          <CardTitle>Последние заказы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">Заказ #{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.total.toLocaleString('ru-RU')} ₽</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
