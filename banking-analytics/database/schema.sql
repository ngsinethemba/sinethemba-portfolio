-- Banking Transaction Analysis System
-- Database Schema

-- Customer Table
CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    date_of_birth DATE,
    registration_date DATE NOT NULL,
    kyc_status TEXT CHECK(kyc_status IN ('verified', 'pending', 'rejected')),
    risk_rating TEXT CHECK(risk_rating IN ('low', 'medium', 'high'))
);

-- Account Table (CASA - Current Account Savings Account)
CREATE TABLE IF NOT EXISTS accounts (
    account_id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    account_number TEXT UNIQUE NOT NULL,
    account_type TEXT CHECK(account_type IN ('savings', 'current')) NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    currency TEXT DEFAULT 'ZAR',
    status TEXT CHECK(status IN ('active', 'dormant', 'closed')) DEFAULT 'active',
    opening_date DATE NOT NULL,
    last_transaction_date DATE,
    interest_rate DECIMAL(5, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Transaction Table
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id INTEGER PRIMARY KEY,
    account_id INTEGER NOT NULL,
    transaction_type TEXT CHECK(transaction_type IN ('deposit', 'withdrawal', 'transfer', 'payment', 'fee')) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    balance_after DECIMAL(15, 2) NOT NULL,
    transaction_date DATETIME NOT NULL,
    description TEXT,
    channel TEXT CHECK(channel IN ('atm', 'online', 'branch', 'mobile', 'pos')),
    status TEXT CHECK(status IN ('completed', 'pending', 'failed', 'reversed')) DEFAULT 'completed',
    reference_number TEXT UNIQUE,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

-- Transaction Log (for audit trail)
CREATE TABLE IF NOT EXISTS transaction_logs (
    log_id INTEGER PRIMARY KEY,
    transaction_id INTEGER NOT NULL,
    action TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id TEXT,
    ip_address TEXT,
    details TEXT,
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);

-- Fraud Alerts Table
CREATE TABLE IF NOT EXISTS fraud_alerts (
    alert_id INTEGER PRIMARY KEY,
    transaction_id INTEGER,
    account_id INTEGER NOT NULL,
    alert_type TEXT NOT NULL,
    risk_score INTEGER CHECK(risk_score BETWEEN 0 AND 100),
    alert_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT CHECK(status IN ('open', 'investigating', 'resolved', 'false_positive')) DEFAULT 'open',
    notes TEXT,
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id),
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_accounts_customer ON accounts(customer_id);
CREATE INDEX IF NOT EXISTS idx_fraud_alerts_account ON fraud_alerts(account_id);
