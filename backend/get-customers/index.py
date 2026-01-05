import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для получения списка всех клиентов из базы данных'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    conn = None
    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            '''
            SELECT 
                id,
                last_name,
                first_name,
                middle_name,
                phone,
                city,
                address,
                total_orders,
                total_spent,
                created_at,
                updated_at
            FROM customers
            ORDER BY updated_at DESC
            '''
        )
        
        customers = cur.fetchall()
        
        result = []
        for customer in customers:
            result.append({
                'id': customer['id'],
                'lastName': customer['last_name'],
                'firstName': customer['first_name'],
                'middleName': customer['middle_name'],
                'phone': customer['phone'],
                'city': customer['city'],
                'address': customer['address'],
                'totalOrders': customer['total_orders'],
                'totalSpent': float(customer['total_spent']),
                'createdAt': customer['created_at'].isoformat(),
                'updatedAt': customer['updated_at'].isoformat()
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
        if conn:
            cur.close()
            conn.close()
