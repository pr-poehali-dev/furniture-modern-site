import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const deliverySteps = [
  {
    icon: 'Phone',
    title: 'Оформление заказа',
    description: 'Выберите товар и оформите заказ на сайте или по телефону',
  },
  {
    icon: 'PackageCheck',
    title: 'Подготовка',
    description: 'Проверяем качество и упаковываем мебель',
  },
  {
    icon: 'Truck',
    title: 'Доставка',
    description: 'Доставляем в удобное для вас время',
  },
  {
    icon: 'Wrench',
    title: 'Сборка',
    description: 'Собираем и устанавливаем мебель у вас дома',
  },
];

export default function Delivery() {
  return (
    <section id="delivery" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Доставка и сборка
        </h2>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverySteps.map((step, index) => (
              <Card key={step.title} className="relative animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-4 bg-primary rounded-full mb-4">
                    <Icon name={step.icon} className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
                {index < deliverySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <Icon name="ChevronRight" className="h-6 w-6 text-primary" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-6">Условия доставки</h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex gap-3">
                <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p>Бесплатная доставка при заказе от 30 000 ₽</p>
              </div>
              <div className="flex gap-3">
                <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p>Доставка по Москве и области — 1-3 рабочих дня</p>
              </div>
              <div className="flex gap-3">
                <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p>Доставка по России — 5-14 рабочих дней</p>
              </div>
              <div className="flex gap-3">
                <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p>Бесплатная профессиональная сборка всей мебели</p>
              </div>
              <div className="flex gap-3">
                <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p>Подъём на этаж и занос в квартиру включены</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
