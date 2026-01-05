import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const categories = [
  {
    name: 'Гостиная',
    icon: 'Sofa',
    count: 45,
  },
  {
    name: 'Спальня',
    icon: 'Bed',
    count: 38,
  },
  {
    name: 'Кухня',
    icon: 'UtensilsCrossed',
    count: 52,
  },
  {
    name: 'Офис',
    icon: 'Briefcase',
    count: 29,
  },
];

export default function Categories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Популярные категории
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={category.name}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="flex flex-col items-center justify-center p-8">
                <div className="mb-4 p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Icon name={category.icon} className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} товаров</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
