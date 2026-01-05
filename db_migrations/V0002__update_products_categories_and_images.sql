-- Обновляем категории на новые названия и изображения
UPDATE products SET 
  category = 'Кухни прямые',
  images = ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/4fd3d596-d27a-4299-869d-17e94b4a7d45.jpg']
WHERE id = 1;

UPDATE products SET 
  category = 'Кухни прямые',
  images = ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/209484ff-b038-41c8-8567-add71474a107.jpg']
WHERE id = 2;

UPDATE products SET 
  category = 'Кухни угловые',
  images = ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/ea2f4b7f-f065-45cd-b759-8c9ecae76561.jpg']
WHERE id = 3;

UPDATE products SET 
  category = 'Кухни угловые',
  images = ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/ed56f8be-a04c-4191-80b7-e8d42c312d78.jpg']
WHERE id = 4;

UPDATE products SET 
  category = 'Модульные кухни',
  images = ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/4096355c-90a7-4399-b654-76841e2d4644.jpg']
WHERE id = 5;

UPDATE products SET 
  category = 'Модульные кухни',
  images = ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/4c89838a-f08f-4587-a995-faf0f5f333f7.jpg']
WHERE id = 6;

UPDATE products SET 
  images = ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/afa653d6-b92a-4d18-9072-3516dc509bd3.jpg']
WHERE id = 7;

UPDATE products SET 
  images = ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/9f37317f-18bd-4af2-8cf6-c4f3f3828d30.jpg']
WHERE id = 8;

UPDATE products SET 
  images = ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/59e6e7d5-1297-4b19-85a6-c98bfa589b3f.jpg']
WHERE id = 9;

UPDATE products SET 
  images = ARRAY['https://cdn.poehali.dev/projects/3790fdb2-666f-4121-a356-41465cdfc362/files/65c8270a-904d-4307-81d3-3627a85386c4.jpg']
WHERE id = 10;
