-- Добавление поля для примечаний к заказам
ALTER TABLE orders ADD COLUMN notes TEXT DEFAULT '';