import sqlite3
import pandas as pd
from tabulate import tabulate

def run_analysis():
    """Run comprehensive banking analytics"""
    
    conn = sqlite3.connect('database/banking.db')
    
    print("\n" + "="*80)
    print("BANKING TRANSACTION ANALYSIS SYSTEM")
    print("="*80 + "\n")
    
    # Analysis 1: High-Value Transactions
    print("ANALYSIS 1: High-Value Transactions (>50,000 ZAR)")
    print("-" * 80)
    query1 = """
    SELECT 
        t.transaction_id,
        t.reference_number,
        c.first_name || ' ' || c.last_name as customer_name,
        a.account_number,
        t.transaction_type,
        t.amount,
        t.transaction_date,
        t.channel
    FROM transactions t
    JOIN accounts a ON t.account_id = a.account_id
    JOIN customers c ON a.customer_id = c.customer_id
    WHERE t.amount > 50000 AND t.status = 'completed'
    ORDER BY t.amount DESC
    LIMIT 10
    """
    df1 = pd.read_sql_query(query1, conn)
    print(tabulate(df1, headers='keys', tablefmt='grid', showindex=False))
    print(f"\nTotal high-value transactions: {len(df1)}\n")
    
    # Analysis 2: Customer Account Summary
    print("ANALYSIS 2: Top 10 Customers by Balance")
    print("-" * 80)
    query2 = """
    SELECT 
        c.customer_id,
        c.first_name || ' ' || c.last_name as customer_name,
        a.account_type,
        a.account_number,
        printf('%.2f', a.balance) as balance,
        c.risk_rating,
        COUNT(t.transaction_id) as transaction_count
    FROM customers c
    JOIN accounts a ON c.customer_id = a.customer_id
    LEFT JOIN transactions t ON a.account_id = t.account_id
    WHERE a.status = 'active'
    GROUP BY c.customer_id, a.account_id
    ORDER BY a.balance DESC
    LIMIT 10
    """
    df2 = pd.read_sql_query(query2, conn)
    print(tabulate(df2, headers='keys', tablefmt='grid', showindex=False))
    print()
    
    # Analysis 3: Transaction Volume by Channel
    print("ANALYSIS 3: Transaction Volume by Channel")
    print("-" * 80)
    query3 = """
    SELECT 
        channel,
        COUNT(*) as transaction_count,
        printf('%.2f', SUM(amount)) as total_amount,
        printf('%.2f', AVG(amount)) as avg_amount,
        printf('%.2f', MIN(amount)) as min_amount,
        printf('%.2f', MAX(amount)) as max_amount
    FROM transactions
    WHERE status = 'completed'
    GROUP BY channel
    ORDER BY transaction_count DESC
    """
    df3 = pd.read_sql_query(query3, conn)
    print(tabulate(df3, headers='keys', tablefmt='grid', showindex=False))
    print()
    
    # Analysis 4: Fraud Alert Summary
    print("ANALYSIS 4: Fraud Alert Summary")
    print("-" * 80)
    query4 = """
    SELECT 
        alert_type,
        COUNT(*) as alert_count,
        printf('%.1f', AVG(risk_score)) as avg_risk_score,
        status,
        COUNT(CASE WHEN status = 'open' THEN 1 END) as open_cases
    FROM fraud_alerts
    GROUP BY alert_type, status
    ORDER BY alert_count DESC
    """
    df4 = pd.read_sql_query(query4, conn)
    print(tabulate(df4, headers='keys', tablefmt='grid', showindex=False))
    print()
    
    # Analysis 5: Account Type Performance
    print("ANALYSIS 5: CASA Account Performance")
    print("-" * 80)
    query5 = """
    SELECT 
        account_type,
        COUNT(*) as account_count,
        printf('%.2f', SUM(balance)) as total_balance,
        printf('%.2f', AVG(balance)) as avg_balance,
        printf('%.2f', AVG(interest_rate)) as avg_interest_rate
    FROM accounts
    WHERE status = 'active'
    GROUP BY account_type
    """
    df5 = pd.read_sql_query(query5, conn)
    print(tabulate(df5, headers='keys', tablefmt='grid', showindex=False))
    print()
    
    # Analysis 6: Recent Suspicious Activity
    print("ANALYSIS 6: Recent Suspicious Activity (Last 30 Days)")
    print("-" * 80)
    query6 = """
    SELECT 
        fa.alert_id,
        c.first_name || ' ' || c.last_name as customer_name,
        a.account_number,
        fa.alert_type,
        fa.risk_score,
        fa.status,
        DATE(fa.alert_date) as alert_date
    FROM fraud_alerts fa
    JOIN accounts a ON fa.account_id = a.account_id
    JOIN customers c ON a.customer_id = c.customer_id
    WHERE fa.alert_date >= datetime('now', '-30 days')
    ORDER BY fa.risk_score DESC, fa.alert_date DESC
    LIMIT 10
    """
    df6 = pd.read_sql_query(query6, conn)
    if len(df6) > 0:
        print(tabulate(df6, headers='keys', tablefmt='grid', showindex=False))
    else:
        print("No suspicious activity in the last 30 days.")
    print()
    
    # Summary Statistics
    print("SUMMARY STATISTICS")
    print("-" * 80)
    query_summary = """
    SELECT 
        (SELECT COUNT(*) FROM customers) as total_customers,
        (SELECT COUNT(*) FROM accounts WHERE status = 'active') as active_accounts,
        (SELECT COUNT(*) FROM transactions WHERE status = 'completed') as completed_transactions,
        (SELECT printf('%.2f', SUM(balance)) FROM accounts WHERE status = 'active') as total_deposits,
        (SELECT COUNT(*) FROM fraud_alerts WHERE status = 'open') as open_fraud_alerts
    """
    df_summary = pd.read_sql_query(query_summary, conn)
    print(tabulate(df_summary, headers='keys', tablefmt='grid', showindex=False))
    
    conn.close()
    
    print("\n" + "="*80)
    print("ANALYSIS COMPLETE")
    print("="*80 + "\n")

if __name__ == "__main__":
    run_analysis()
