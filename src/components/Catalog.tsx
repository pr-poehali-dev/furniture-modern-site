import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Filters from './Filters';
import { Product, Filters as FiltersType } from '@/types/product';

const API_URL = 'https://functions.poehali.dev/02e5b34b-f4fa-4f7e-b01f-a36dd4e2c6af';

interface CatalogProps {
  onAddToCart: (product: Product) => void;
}

export default function Catalog({ onAddToCart }: CatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersType>({
    priceRange: [0, 200000],
    materials: [],
    styles: [],
    colors: [],
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const materialMatch = filters.materials.length === 0 || filters.materials.includes(product.material);
    const styleMatch = filters.styles.length === 0 || filters.styles.includes(product.style);
    const colorMatch = filters.colors.length === 0 || filters.colors.includes(product.color);

    return priceMatch && materialMatch && styleMatch && colorMatch;
  });

  return (
    <section id="catalog" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Каталог кухонь</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Filters filters={filters} onFiltersChange={setFilters} />
          </div>
          
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">Загрузка товаров...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  Товары не найдены. Попробуйте изменить фильтры.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
