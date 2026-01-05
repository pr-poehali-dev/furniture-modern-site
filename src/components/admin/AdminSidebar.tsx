import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
  { id: 'products', label: 'Товары', icon: 'Package' },
  { id: 'orders', label: 'Заказы', icon: 'ShoppingBag' },
  { id: 'customers', label: 'Клиенты', icon: 'Users' },
];

export default function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-card border-r min-h-screen p-6">
      <div className="flex items-center gap-2 mb-8">
        <Icon name="Armchair" className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold">Админ</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onTabChange(item.id)}
          >
            <Icon name={item.icon} className="h-5 w-5 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
