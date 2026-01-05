import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section id="home" className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/b43e190a-10e7-4457-a105-9e1ef8684a93.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/40"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Кухни вашей<br />
            мечты
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Прямые, угловые и модульные кухни от ведущих производителей. Создайте идеальное пространство для вашего дома
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="text-lg px-8 transition-transform hover:scale-105">
              <a href="#catalog">Смотреть каталог</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 transition-transform hover:scale-105">
              <a href="#about">Узнать больше</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}