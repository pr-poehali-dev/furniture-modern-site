CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    images TEXT[] NOT NULL,
    category VARCHAR(100) NOT NULL,
    material VARCHAR(100) NOT NULL,
    style VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    dimension_length INTEGER NOT NULL,
    dimension_width INTEGER NOT NULL,
    dimension_height INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставляем начальные данные кухонь
INSERT INTO products (name, price, images, category, material, style, color, manufacturer, description, dimension_length, dimension_width, dimension_height) VALUES
('Прямая кухня "Модерн"', 95000, ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/ff25111a-480b-4143-83e4-7b4b74da9603.jpg', 'https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/2a9d48d0-c499-4d71-97dd-3ab13e39ecd5.jpg'], 'Прямые кухни', 'МДФ', 'Модерн', 'Белый', 'КухниМастер', 'Стильная прямая кухня с глянцевыми фасадами и встроенной техникой', 300, 60, 220),
('Прямая кухня "Классика"', 120000, ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/b4adc89b-ce92-4c67-83ac-e7798964eced.jpg'], 'Прямые кухни', 'Массив дерева', 'Классический', 'Коричневый', 'Элит Кухни', 'Элегантная кухня из натурального дерева с резными элементами', 280, 60, 240),
('Угловая кухня "Лофт"', 145000, ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/2a9d48d0-c499-4d71-97dd-3ab13e39ecd5.jpg', 'https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/ff25111a-480b-4143-83e4-7b4b74da9603.jpg'], 'Угловые кухни', 'МДФ', 'Лофт', 'Серый', 'Urban Kitchen', 'Угловая кухня в индустриальном стиле с металлическими акцентами', 320, 60, 230),
('Угловая кухня "Скандинавия"', 132000, ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/b4adc89b-ce92-4c67-83ac-e7798964eced.jpg', 'https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/2a9d48d0-c499-4d71-97dd-3ab13e39ecd5.jpg'], 'Угловые кухни', 'МДФ', 'Скандинавский', 'Белый', 'Nordic Kitchen', 'Светлая угловая кухня в скандинавском стиле с деревянными элементами', 340, 60, 220),
('Модульная кухня "Минимал"', 78000, ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/ff25111a-480b-4143-83e4-7b4b74da9603.jpg'], 'Модульные кухни', 'ЛДСП', 'Минимализм', 'Серый', 'Модуль Групп', 'Компактная модульная кухня с возможностью индивидуальной компоновки', 240, 60, 210),
('Модульная кухня "Флекс"', 65000, ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/2a9d48d0-c499-4d71-97dd-3ab13e39ecd5.jpg', 'https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/b4adc89b-ce92-4c67-83ac-e7798964eced.jpg'], 'Модульные кухни', 'ЛДСП', 'Модерн', 'Бежевый', 'Модуль Групп', 'Бюджетная модульная кухня с глянцевыми фасадами', 220, 60, 200),
('Смеситель для кухни "Grohe"', 12500, ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/ff25111a-480b-4143-83e4-7b4b74da9603.jpg'], 'Аксессуары', 'Металл', 'Модерн', 'Хром', 'Grohe', 'Качественный однорычажный смеситель с выдвижным изливом', 25, 20, 35),
('Мойка из нержавейки', 8900, ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/2a9d48d0-c499-4d71-97dd-3ab13e39ecd5.jpg'], 'Аксессуары', 'Нержавеющая сталь', 'Универсальный', 'Серебристый', 'Blanco', 'Врезная мойка из нержавеющей стали с двумя чашами', 78, 44, 20),
('Вытяжка "Premium"', 24500, ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/b4adc89b-ce92-4c67-83ac-e7798964eced.jpg'], 'Аксессуары', 'Металл', 'Модерн', 'Черный', 'Bosch', 'Наклонная вытяжка с сенсорным управлением и LED-подсветкой', 90, 45, 85),
('Набор ручек для фасадов', 1200, ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/ff25111a-480b-4143-83e4-7b4b74da9603.jpg'], 'Аксессуары', 'Металл', 'Классический', 'Золото', 'Gamet', 'Комплект элегантных ручек для кухонных фасадов (10 шт)', 15, 3, 2);
