import sqlite3
import pandas as pd
from datetime import datetime

def generate_reports():
    """Generate comprehensive banking reports"""
    
    conn = sqlite3.connect('database/banking.db')
    
    print("\n" + "="*80)
    print("GENERATING BANKING REPORTS")
    print("="*80 + "\n")
    
    # Report 1: Daily Transaction Summary
    print("Generating Daily Transaction Summary...")
    query1 = """
    SELECT 
        DATE(transaction_date) as date,
        COUNT(*) as total_transactions,
        SUM(CASE WHEN transaction_type = 'deposit' THEN amount ELSE 0 END) as total_deposits,
        SUM(CASE WHEN transaction_type = 'withdrawal' THEN amount ELSE 0 END) as total_withdrawals,
        SUM(CASE WHEN transaction_type = 'transfer' THEN amount ELSE 0 END) as total_transfers,
        SUM(amount) as total_volume
    FROM transactions
    WHERE status = 'completed'
    GROUP BY DATE(transaction_date)
    ORDER BY date DESC
    LIMIT 30
    """
    df1 = pd.read_sql_query(query1, conn)
    df1.to_csv('output/daily_transaction_summary.csv', index=False)
    print(f"✓ Saved: output/daily_transaction_summary.csv ({len(df1)} records)")
    
    # Report 2: Customer Risk Profile
    print("Generating Customer Risk Profile...")
    query2 = """
    SELECT 
        c.customer_id,
        c.first_name || ' ' || c.last_name as customer_name,
        c.email,
        c.risk_rating,
        c.kyc_status,
        COUNT(DISTINCT a.account_id) as account_count,
        SUM(a.balance) as total_balance,
        COUNT(t.transaction_id) as transaction_count,
        COUNT(fa.alert_id) as fraud_alerts
    FROM customers c
    LEFT JOIN accounts a ON c.customer_id = a.customer_id
    LEFT JOIN transactions t ON a.account_id = t.account_id
    LEFT JOIN fraud_alerts fa ON a.account_id = fa.account_id
    GROUP BY c.customer_id
    ORDER BY c.risk_rating DESC, total_balance DESC
    """
    df2 = pd.read_sql_query(query2, conn)
    df2.to_csv('output/customer_risk_profile.csv', index=False)
    print(f"✓ Saved: output/customer_risk_profile.csv ({len(df2)} records)")
    
    # Report 3: Account Performance
    print("Generating Account Performance Report...")
    query3 = """
    SELECT 
        a.account_id,
        a.account_number,
        c.first_name || ' ' || c.last_name as customer_name,
        a.account_type,
        a.balance,
        a.status,
        COUNT(t.transaction_id) as transaction_count,
        SUM(CASE WHEN t.transaction_type = 'deposit' THEN t.amount ELSE 0 END) as total_deposits,
        SUM(CASE WHEN t.transaction_type = 'withdrawal' THEN t.amount ELSE 0 END) as total_withdrawals,
        MAX(t.transaction_date) as last_transaction_date
    FROM accounts a
    JOIN customers c ON a.customer_id = c.customer_id
    LEFT JOIN transactions t ON a.account_id = t.account_id
    GROUP BY a.account_id
    ORDER BY a.balance DESC
    """
    df3 = pd.read_sql_query(query3, conn)
    df3.to_csv('output/account_performance.csv', index=False)
    print(f"✓ Saved: output/account_performance.csv ({len(df3)} records)")
    
    # Report 4: Fraud Detection Report
    print("Generating Fraud Detection Report...")
    query4 = """
    SELECT 
        fa.alert_id,
        fa.alert_date,
        c.first_name || ' ' || c.last_name as customer_name,
        c.email,
        a.account_number,
        fa.alert_type,
        fa.risk_score,
        fa.status,
        t.transaction_type,
        t.amount,
        t.channel,
        fa.notes
    FROM fraud_alerts fa
    JOIN accounts a ON fa.account_id = a.account_id
    JOIN customers c ON a.customer_id = c.customer_id
    LEFT JOIN transactions t ON fa.transaction_id = t.transaction_id
    ORDER BY fa.risk_score DESC, fa.alert_date DESC
    """
    df4 = pd.read_sql_query(query4, conn)
    df4.to_csv('output/fraud_detection_report.csv', index=False)
    print(f"✓ Saved: output/fraud_detection_report.csv ({len(df4)} records)")
    
    # Report 5: Channel Performance
    print("Generating Channel Performance Report...")
    query5 = """
    SELECT 
        channel,
        transaction_type,
        COUNT(*) as transaction_count,
        SUM(amount) as total_amount,
        AVG(amount) as avg_amount,
        MIN(amount) as min_amount,
        MAX(amount) as max_amount,
        COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_count,
        ROUND(COUNT(CASE WHEN status = 'failed' THEN 1 END) * 100.0 / COUNT(*), 2) as failure_rate
    FROM transactions
    GROUP BY channel, transaction_type
    ORDER BY total_amount DESC
    """
    df5 = pd.read_sql_query(query5, conn)
    df5.to_csv('output/channel_performance.csv', index=False)
    print(f"✓ Saved: output/channel_performance.csv ({len(df5)} records)")
    
    # Generate Summary Report
    print("\nGenerating Executive Summary...")
    summary = f"""
EXECUTIVE SUMMARY - BANKING ANALYTICS REPORT
Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
{'='*80}

KEY METRICS:
-----------
Total Customers: {len(df2)}
Total Accounts: {len(df3)}
Total Transactions Processed: {df1['total_transactions'].sum()}
Total Transaction Volume: ZAR {df1['total_volume'].sum():,.2f}

RISK OVERVIEW:
-------------
High Risk Customers: {len(df2[df2['risk_rating'] == 'high'])}
Open Fraud Alerts: {len(df4[df4['status'] == 'open'])}
Average Risk Score: {df4['risk_score'].mean():.1f}/100

ACCOUNT BREAKDOWN:
-----------------
Active Savings Accounts: {len(df3[df3['account_type'] == 'savings'])}
Active Current Accounts: {len(df3[df3['account_type'] == 'current'])}
Total Deposits (Balance): ZAR {df3['balance'].sum():,.2f}

TOP CHANNELS:
------------
{df5.groupby('channel')['transaction_count'].sum().sort_values(ascending=False).head().to_string()}

REPORTS GENERATED:
-----------------
✓ daily_transaction_summary.csv
✓ customer_risk_profile.csv
✓ account_performance.csv
✓ fraud_detection_report.csv
✓ channel_performance.csv

{'='*80}
All reports saved to: output/
"""
    
    with open('output/executive_summary.txt', 'w') as f:
        f.write(summary)
    
    print(summary)
    
    conn.close()
    
    print("\n" + "="*80)
    print("ALL REPORTS GENERATED SUCCESSFULLY")
    print("="*80 + "\n")

if __name__ == "__main__":
    generate_reports()
