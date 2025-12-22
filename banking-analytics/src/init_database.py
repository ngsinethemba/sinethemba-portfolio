import sqlite3
import random
from datetime import datetime, timedelta
import os

def create_database():
    """Initialize the banking database with schema and sample data"""
    
    # Create database directory if it doesn't exist
    os.makedirs('database', exist_ok=True)
    os.makedirs('output', exist_ok=True)
    
    # Connect to database
    conn = sqlite3.connect('database/banking.db')
    cursor = conn.cursor()
    
    # Read and execute schema
    with open('database/schema.sql', 'r') as f:
        schema = f.read()
        cursor.executescript(schema)
    
    print("✓ Database schema created successfully")
    
    # Generate sample data
    generate_customers(cursor, 50)
    generate_accounts(cursor, 50)
    generate_transactions(cursor, 500)
    generate_fraud_alerts(cursor, 10)
    
    conn.commit()
    conn.close()
    
    print("✓ Sample data generated successfully")
    print(f"\n{'='*60}")
    print("DATABASE INITIALIZED SUCCESSFULLY")
    print(f"{'='*60}")
    print(f"Location: database/banking.db")
    print(f"Customers: 50")
    print(f"Accounts: 50")
    print(f"Transactions: 500")
    print(f"Fraud Alerts: 10")
    print(f"{'='*60}\n")

def generate_customers(cursor, count):
    """Generate sample customer data"""
    first_names = ['Thabo', 'Sipho', 'Nomsa', 'Lerato', 'Mandla', 'Zanele', 'Bongani', 'Ayanda', 
                   'Lindiwe', 'Mpho', 'Thandi', 'Sizwe', 'Nandi', 'Jabu', 'Precious']
    last_names = ['Nkosi', 'Dlamini', 'Khumalo', 'Mthembu', 'Ndlovu', 'Zulu', 'Mahlangu', 
                  'Sibiya', 'Radebe', 'Vilakazi', 'Mokoena', 'Maseko', 'Buthelezi', 'Ngcobo']
    
    customers = []
    for i in range(1, count + 1):
        first = random.choice(first_names)
        last = random.choice(last_names)
        email = f"{first.lower()}.{last.lower()}{i}@email.com"
        phone = f"0{random.randint(60, 89)}{random.randint(1000000, 9999999)}"
        dob = datetime.now() - timedelta(days=random.randint(18*365, 70*365))
        reg_date = datetime.now() - timedelta(days=random.randint(30, 1825))
        kyc = random.choice(['verified', 'verified', 'verified', 'pending'])
        risk = random.choice(['low', 'low', 'low', 'medium', 'high'])
        
        customers.append((i, first, last, email, phone, dob.date(), reg_date.date(), kyc, risk))
    
    cursor.executemany('''
        INSERT INTO customers VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', customers)
    
    print(f"✓ Generated {count} customers")

def generate_accounts(cursor, count):
    """Generate sample account data"""
    accounts = []
    for i in range(1, count + 1):
        customer_id = i
        account_num = f"ACC{str(i).zfill(10)}"
        acc_type = random.choice(['savings', 'savings', 'current'])
        balance = round(random.uniform(1000, 500000), 2)
        opening_date = datetime.now() - timedelta(days=random.randint(30, 1825))
        last_trans = opening_date + timedelta(days=random.randint(1, 365))
        interest = 5.5 if acc_type == 'savings' else 0.0
        
        accounts.append((i, customer_id, account_num, acc_type, balance, 'ZAR', 
                        'active', opening_date.date(), last_trans.date(), interest))
    
    cursor.executemany('''
        INSERT INTO accounts VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', accounts)
    
    print(f"✓ Generated {count} accounts")

def generate_transactions(cursor, count):
    """Generate sample transaction data"""
    trans_types = ['deposit', 'withdrawal', 'transfer', 'payment', 'fee']
    channels = ['atm', 'online', 'branch', 'mobile', 'pos']
    
    transactions = []
    for i in range(1, count + 1):
        account_id = random.randint(1, 50)
        trans_type = random.choice(trans_types)
        amount = round(random.uniform(50, 50000), 2)
        
        # Get current balance (simplified - in reality would query)
        balance_after = round(random.uniform(5000, 100000), 2)
        
        trans_date = datetime.now() - timedelta(days=random.randint(0, 365), 
                                                hours=random.randint(0, 23),
                                                minutes=random.randint(0, 59))
        
        descriptions = {
            'deposit': 'Salary deposit',
            'withdrawal': 'ATM withdrawal',
            'transfer': 'Transfer to beneficiary',
            'payment': 'Bill payment',
            'fee': 'Monthly service fee'
        }
        
        description = descriptions.get(trans_type, 'Transaction')
        channel = random.choice(channels)
        status = random.choice(['completed', 'completed', 'completed', 'pending'])
        ref_num = f"TXN{datetime.now().year}{str(i).zfill(8)}"
        
        transactions.append((i, account_id, trans_type, amount, balance_after, 
                           trans_date, description, channel, status, ref_num))
    
    cursor.executemany('''
        INSERT INTO transactions VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', transactions)
    
    print(f"✓ Generated {count} transactions")

def generate_fraud_alerts(cursor, count):
    """Generate sample fraud alert data"""
    alert_types = ['high_value_transaction', 'unusual_location', 'multiple_failed_attempts', 
                   'velocity_check', 'suspicious_pattern']
    
    alerts = []
    for i in range(1, count + 1):
        trans_id = random.randint(1, 500)
        account_id = random.randint(1, 50)
        alert_type = random.choice(alert_types)
        risk_score = random.randint(60, 95)
        alert_date = datetime.now() - timedelta(days=random.randint(0, 30))
        status = random.choice(['open', 'investigating', 'resolved', 'false_positive'])
        notes = f"Automated alert: {alert_type} detected"
        
        alerts.append((i, trans_id, account_id, alert_type, risk_score, 
                      alert_date, status, notes))
    
    cursor.executemany('''
        INSERT INTO fraud_alerts VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', alerts)
    
    print(f"✓ Generated {count} fraud alerts")

if __name__ == "__main__":
    create_database()
