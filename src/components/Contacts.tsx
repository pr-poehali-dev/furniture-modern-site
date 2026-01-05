import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const SUBMIT_URL = 'https://functions.poehali.dev/f2f3ed06-47b3-4ab8-8e9e-f5c502b1b06b';

const contactInfo = [
  {
    icon: 'MapPin',
    title: 'Адрес',
    value: 'Екатеринбург ул. Лукиных 1Ак1с',
  },
  {
    icon: 'Phone',
    title: 'Телефон',
    value: '+7 (343) 272-80-72',
  },
  {
    icon: 'Mail',
    title: 'Email',
    value: 'shika_room@bk.ru',
  },
  {
    icon: 'Clock',
    title: 'Режим работы',
    value: 'Пн-Вс: 9:00 - 21:00',
  },
];

export default function Contacts() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...formData }),
      });

      if (response.ok) {
        toast({
          title: 'Успешно!',
          description: 'Ваше сообщение отправлено',
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить сообщение',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Контакты</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <Card key={info.title} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name={info.icon} className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-sm text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Наши социальные сети</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Icon name="Facebook" className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Icon name="Instagram" className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Icon name="MessageCircle" className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Напишите нам</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Input 
                    placeholder="Ваше имя" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Input 
                    type="tel" 
                    placeholder="Телефон" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Textarea 
                    placeholder="Сообщение" 
                    rows={5} 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <Button className="w-full" type="submit" disabled={isSubmitting}>
                  <Icon name="Send" className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Отправка...' : 'Отправить'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}