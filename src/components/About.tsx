import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const features = [
  {
    icon: 'Award',
    title: 'Качество',
    description: 'Используем только натуральные материалы высшего качества',
  },
  {
    icon: 'Truck',
    title: 'Доставка',
    description: 'Бесплатная доставка и сборка по всей России',
  },
  {
    icon: 'Shield',
    title: 'Гарантия',
    description: '5 лет гарантии на всю мебель',
  },
  {
    icon: 'Heart',
    title: 'Поддержка',
    description: 'Консультация и помощь на всех этапах',
  },
];

export default function About() {
  return (
    <section id="about" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">О компании</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Мы создаём мебель, которая делает ваш дом уютнее и комфортнее. 
            Более 15 лет опыта в производстве качественной мебели из натуральных материалов.
            Каждое изделие создается с любовью и вниманием к деталям.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                  <Icon name={feature.icon} className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
