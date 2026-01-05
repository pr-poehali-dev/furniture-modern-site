import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="ChefHat" className="h-8 w-8" />
              <span className="text-2xl font-bold">КУХНИ</span>
            </div>
            <p className="text-primary-foreground/80">
              Кухни на заказ от ведущих производителей
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#home" className="hover:text-primary-foreground transition-colors">Главная</a></li>
              <li><a href="#catalog" className="hover:text-primary-foreground transition-colors">Каталог</a></li>
              <li><a href="#about" className="hover:text-primary-foreground transition-colors">О компании</a></li>
              <li><a href="#delivery" className="hover:text-primary-foreground transition-colors">Доставка</a></li>
              <li><a href="#contacts" className="hover:text-primary-foreground transition-colors">Контакты</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Icon name="Phone" className="h-4 w-4" />
                +7 (495) 123-45-67
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" className="h-4 w-4" />
                info@kitchen-shop.ru
              </li>
              <li className="flex items-center gap-2">
                <Icon name="MapPin" className="h-4 w-4" />
                г. Москва, ул. Примерная, д. 15
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 Кухни. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}