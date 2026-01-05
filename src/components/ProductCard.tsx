import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <Badge className="absolute top-4 right-4 bg-background/90 text-foreground">
          {product.category}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
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