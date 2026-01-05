import json
import os
import psycopg2
from psycopg2.extras import Json

def handler(event: dict, context) -> dict:
    '''API для отправки заказа в CRM и сохранения в базе данных'''
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_str = event.get('body', '{}')
    data = json.loads(body_str)
    
    customer = data.get('customer', {})
    items = data.get('items', [])
    total = data.get('total', 0)
    
    if not all([customer.get('lastName'), customer.get('firstName'), customer.get('phone'), customer.get('city'), customer.get('address')]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing required fields'}),
            'isBase64Encoded': False
        }
    
    conn = None
    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        cur.execute(
            '''
            INSERT INTO customers (last_name, first_name, middle_name, phone, city, address, total_orders, total_spent)
            VALUES (%s, %s, %s, %s, %s, %s, 1, %s)
            ON CONFLICT (phone) 
            DO UPDATE SET 
                last_name = EXCLUDED.last_name,
                first_name = EXCLUDED.first_name,
                middle_name = EXCLUDED.middle_name,
                city = EXCLUDED.city,
                address = EXCLUDED.address,
                total_orders = customers.total_orders + 1,
                total_spent = customers.total_spent + EXCLUDED.total_spent,
                updated_at = CURRENT_TIMESTAMP
            RETURNING id
            ''',
            (
                customer['lastName'],
                customer['firstName'],
                customer.get('middleName', ''),
                customer['phone'],
                customer['city'],
                customer['address'],
                total
            )
        )
        
        customer_id = cur.fetchone()[0]
        
        cur.execute(
            '''
            INSERT INTO orders (last_name, first_name, middle_name, phone, city, address, items, total)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id, created_at
            ''',
            (
                customer['lastName'],
                customer['firstName'],
                customer.get('middleName', ''),
                customer['phone'],
                customer['city'],
                customer['address'],
                Json(items),
                total
            )
        )
        
        order_id, created_at = cur.fetchone()
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'orderId': order_id,
                'createdAt': created_at.isoformat()
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        if conn:
            conn.rollback()
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
        if conn:
            cur.close()
            conn.close()