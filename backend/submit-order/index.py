import json
import os
import psycopg2
from psycopg2.extras import Json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_order_email(order_id: int, customer: dict, items: list, total: float):
    '''Отправка уведомления о новом заказе на email'''
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    recipient = 'shika_room@bk.ru'
    
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = recipient
    msg['Subject'] = f'Новый заказ #{order_id}'
    
    items_text = '\n'.join([
        f"  - {item['name']} x {item['quantity']} шт. = {item['price'] * item['quantity']} ₽"
        for item in items
    ])
    
    body = f"""
Новый заказ #{order_id}

Клиент:
  ФИО: {customer['lastName']} {customer['firstName']} {customer.get('middleName', '')}
  Телефон: {customer['phone']}
  Город: {customer['city']}
  Адрес: {customer['address']}

Товары:
{items_text}

Итого: {total} ₽
"""
    
    msg.attach(MIMEText(body, 'plain', 'utf-8'))
    
    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)

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
        
        try:
            send_order_email(order_id, customer, items, total)
        except Exception as email_error:
            pass
        
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