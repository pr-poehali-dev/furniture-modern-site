-- Добавляем колонку статуса к таблице orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';

-- Создаем индекс для быстрого поиска по статусу
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Обновляем существующие заказы
UPDATE orders SET status = 'pending' WHERE status IS NULL;
