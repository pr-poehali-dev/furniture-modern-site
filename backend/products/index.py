import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    """Подключение к базе данных"""
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    """API для управления товарами (получение, создание, обновление, удаление)"""
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            # Получение всех товаров
            cur.execute('''
                SELECT 
                    id, name, price, images, category, material, style, color, 
                    manufacturer, description,
                    dimension_length, dimension_width, dimension_height,
                    created_at, updated_at
                FROM products
                ORDER BY id
            ''')
            products = cur.fetchall()
            
            # Преобразуем в нужный формат
            result = []
            for p in products:
                result.append({
                    'id': p['id'],
                    'name': p['name'],
                    'price': p['price'],
                    'images': p['images'],
                    'category': p['category'],
                    'material': p['material'],
                    'style': p['style'],
                    'color': p['color'],
                    'manufacturer': p['manufacturer'],
                    'description': p['description'],
                    'dimensions': {
                        'length': p['dimension_length'],
                        'width': p['dimension_width'],
                        'height': p['dimension_height']
                    }
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            # Создание нового товара
            body = json.loads(event.get('body', '{}'))
            
            cur.execute('''
                INSERT INTO products (
                    name, price, images, category, material, style, color,
                    manufacturer, description,
                    dimension_length, dimension_width, dimension_height
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            ''', (
                body['name'],
                body['price'],
                body['images'],
                body['category'],
                body['material'],
                body['style'],
                body['color'],
                body['manufacturer'],
                body['description'],
                body['dimensions']['length'],
                body['dimensions']['width'],
                body['dimensions']['height']
            ))
            
            new_id = cur.fetchone()['id']
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': new_id, 'message': 'Product created'}),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            # Обновление товара
            body = json.loads(event.get('body', '{}'))
            product_id = body.get('id')
            
            cur.execute('''
                UPDATE products SET
                    name = %s,
                    price = %s,
                    images = %s,
                    category = %s,
                    material = %s,
                    style = %s,
                    color = %s,
                    manufacturer = %s,
                    description = %s,
                    dimension_length = %s,
                    dimension_width = %s,
                    dimension_height = %s,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
            ''', (
                body['name'],
                body['price'],
                body['images'],
                body['category'],
                body['material'],
                body['style'],
                body['color'],
                body['manufacturer'],
                body['description'],
                body['dimensions']['length'],
                body['dimensions']['width'],
                body['dimensions']['height'],
                product_id
            ))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Product updated'}),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            # Удаление товара
            params = event.get('queryStringParameters', {})
            product_id = params.get('id')
            
            cur.execute('DELETE FROM products WHERE id = %s', (product_id,))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Product deleted'}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()
