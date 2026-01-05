import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Product } from '@/types/product';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="ChevronLeft" className="h-4 w-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="ChevronRight" className="h-4 w-4" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mb-4 text-sm">
          <Icon name="Factory" className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Производитель:</span>
          <span className="font-medium">{product.manufacturer}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            <Icon name="PackageOpen" className="h-3 w-3 mr-1" />
            {product.material}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Icon name="Palette" className="h-3 w-3 mr-1" />
            {product.color}
          </Badge>
        </div>
        <div className="mb-3 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Ruler" className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Габариты (Д×Ш×В):</span>
          </div>
          <div className="text-sm font-medium">
            {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} см
          </div>
        </div>
        <div className="text-2xl font-bold text-primary">
          {product.price.toLocaleString('ru-RU')} ₽
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full"
          onClick={() => onAddToCart(product)}
        >
          <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}