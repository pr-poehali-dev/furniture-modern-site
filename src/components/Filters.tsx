import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Filters as FiltersType } from '@/types/product';
import { materials, colors } from '@/data/products';

interface FiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
}

export default function Filters({ filters, onFiltersChange }: FiltersProps) {
  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]],
    });
  };

  const handleCheckboxChange = (
    category: keyof Pick<FiltersType, 'categories' | 'materials' | 'colors'>,
    value: string,
    checked: boolean
  ) => {
    const currentValues = filters[category];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    
    onFiltersChange({
      ...filters,
      [category]: newValues,
    });
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Фильтры</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base mb-4 block">
            Цена: {filters.priceRange[0].toLocaleString()} - {filters.priceRange[1].toLocaleString()} ₽
          </Label>
          <Slider
            min={0}
            max={100000}
            step={1000}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-base mb-3 block">Категория</Label>
          <div className="space-y-2">
            {['Кухни прямые', 'Кухни угловые', 'Модульные кухни', 'Аксессуары'].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange('categories', category, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base mb-3 block">Материал</Label>
          <div className="space-y-2">
            {materials.map((material) => (
              <div key={material} className="flex items-center space-x-2">
                <Checkbox
                  id={`material-${material}`}
                  checked={filters.materials.includes(material)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange('materials', material, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`material-${material}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {material}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base mb-3 block">Цвет</Label>
          <div className="space-y-2">
            {colors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={filters.colors.includes(color)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange('colors', color, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`color-${color}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {color}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}