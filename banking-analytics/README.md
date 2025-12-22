# Banking Transaction Analysis System

A comprehensive SQL-based banking transaction analysis system demonstrating core banking operations, fraud detection, and automated reporting capabilities. Built to showcase technical skills relevant to financial services software implementation

##  Project Overview

This system simulates real-world banking operations including CASA (Current Account Savings Account) management, transaction processing, fraud detection, and regulatory reporting. It demonstrates understanding of core banking systems architecture, data analysis, and financial services workflows.

##  Key Features

### Core Banking Operations
- **CASA Account Management**: Support for both Current and Savings accounts with different interest rates and behaviors
- **Multi-Channel Transactions**: Processing across ATM, online banking, mobile, branch, and POS channels
- **Transaction Types**: Deposits, withdrawals, transfers, payments, and fee processing
- **Balance Reconciliation**: Real-time balance tracking and validation
- **Audit Trail**: Complete transaction logging for regulatory compliance

### Fraud Detection & Risk Management
- **Automated Alert System**: Identifies suspicious patterns including:
  - High-value transactions (>50,000 ZAR)
  - Unusual geographic locations
  - Multiple failed authentication attempts
  - Velocity checks (rapid transaction sequences)
  - Suspicious behavioral patterns
- **Risk Scoring**: Algorithmic risk assessment (0-100 scale)
- **Customer Risk Profiling**: KYC status tracking and risk rating (low/medium/high)
- **Alert Management**: Workflow for investigating and resolving fraud cases

### Analytics & Reporting
- **Transaction Analysis**: Volume, channel, and trend analysis
- **Customer Segmentation**: Balance-based and behavior-based clustering
- **Channel Performance**: Success rates and failure analysis by channel
- **Regulatory Reporting**: Daily transaction summaries and audit reports
- **Executive Dashboards**: KPI tracking and summary statistics

##  System Architecture

### Database Schema
```
customers (50 records)
├── customer_id, name, contact info
├── KYC status, risk rating
└── registration date

accounts (50 records - CASA)
├── account_number, type (current/savings)
├── balance, currency (ZAR)
├── status, interest rate
└── transaction history linkage

transactions (500 records)
├── transaction_id, reference number
├── type, amount, channel
├── balance_after, timestamp
└── status tracking

fraud_alerts (10 records)
├── alert_type, risk_score
├── investigation status
└── resolution notes
```

### Technology Stack
- **Database**: SQLite3 (portable, embeddable)
- **Backend**: Python 3.x
- **Data Processing**: Pandas for data manipulation
- **Analysis**: SQL with complex queries (JOINs, CTEs, window functions)
- **Reporting**: Automated CSV generation and tabulated console output

##  Sample Analytics Output

The system generates six comprehensive analyses:

1. **High-Value Transactions**: Identifies transactions exceeding 50,000 ZAR for compliance monitoring
2. **Customer Account Summary**: Top customers by balance with transaction counts and risk ratings
3. **Transaction Volume by Channel**: Performance metrics across all banking channels
4. **Fraud Alert Summary**: Active investigations and risk score distributions
5. **CASA Performance**: Comparative analysis of account types (savings vs current)
6. **Recent Suspicious Activity**: Last 30 days of potential fraud cases

##  Getting Started

### Prerequisites
```bash
Python 3.7+
pip (Python package manager)
```

### Installation
```bash
# Install dependencies
pip install -r requirements.txt

# Initialize database with sample data
python src/init_database.py

# Run comprehensive analysis
python src/analysis.py

# Generate CSV reports
python src/reports.py
```

### Generated Reports
All reports are saved to the `output/` directory:
- `daily_transaction_summary.csv` - Daily aggregated transaction data
- `customer_risk_profile.csv` - Complete customer risk assessment
- `account_performance.csv` - Per-account metrics and activity
- `fraud_detection_report.csv` - Detailed fraud alert investigation queue
- `channel_performance.csv` - Channel-wise transaction success rates
- `executive_summary.txt` - High-level KPI overview

##  Banking Concepts Demonstrated

### CASA Operations
- **Current Accounts**: Zero-interest transaction accounts for businesses and high-frequency users
- **Savings Accounts**: Interest-bearing accounts (5.5% in this system) with regulated withdrawal limits
- **Balance Management**: Real-time balance updates with every transaction
- **Interest Calculation**: Automated interest accrual for savings products

### Transaction Processing
- **Multi-Channel Support**: ATM, online, branch, mobile app, and POS terminal transactions
- **Transaction Lifecycle**: Pending → Completed/Failed → Reconciled
- **Reference Numbers**: Unique transaction identifiers for tracking and dispute resolution
- **Timestamp Recording**: Precise transaction timing for audit and analysis

### Compliance & Risk
- **KYC (Know Your Customer)**: Verification status tracking (verified/pending/rejected)
- **AML (Anti-Money Laundering)**: High-value transaction monitoring
- **Risk-Based Approach**: Customer risk ratings informing monitoring intensity
- **Audit Trail**: Immutable transaction logs for regulatory requirements

##  SQL Skills Showcased

### Complex Queries
- Multi-table JOINs (customers ↔ accounts ↔ transactions)
- Aggregate functions with GROUP BY (SUM, AVG, COUNT)
- Subqueries and Common Table Expressions (CTEs)
- Window functions for ranking and running totals
- CASE statements for conditional logic
- Date/time functions for temporal analysis
- Performance optimization with strategic indexing

### Database Design
- Proper normalization (3NF)
- Foreign key relationships and referential integrity
- Check constraints for data validation
- Indexes on frequently queried columns
- Transaction log pattern for audit trails

##  Real-World Applications

This project demonstrates skills directly applicable to:

### Oracle FLEXCUBE Implementation
- Understanding of core banking module interactions (CASA, Payments, Loans)
- Transaction processing workflows and validation logic
- Interface mapping concepts (ATM/POS, clearing systems)
- Test scenario simulation and UAT support

### Banking Software Consulting
- Requirements analysis for banking clients
- Solution design for transaction processing systems
- Data migration and reconciliation planning
- Performance testing and optimization

### Financial Services Technology
- Core banking system architecture
- Payment gateway integration patterns
- Fraud detection system design
- Regulatory reporting automation

##  Learning Outcomes

Through building this project, I gained practical experience in:
- Modeling complex financial domain logic
- Writing production-quality SQL queries
- Implementing fraud detection algorithms
- Designing audit-compliant data structures
- Creating automated reporting pipelines
- Understanding banking industry terminology and workflows

##  Future Enhancements

Potential extensions to demonstrate additional skills:
- REST API layer for external system integration
- Real-time streaming analytics with event processing
- Machine learning models for advanced fraud detection
- Web dashboard for visual analytics
- Payment gateway integration simulation
- Microservices architecture refactoring

##  Technical Notes

### Data Generation
The `init_database.py` script generates realistic South African banking data:
- Common Zulu/Xhosa names reflecting local demographics
- ZAR (South African Rand) as base currency
- Realistic transaction patterns and amounts
- Temporal distribution mimicking actual banking behavior

### Performance Considerations
- Indexed foreign keys for fast JOIN operations
- Strategic use of LIMIT clauses for large result sets
- Efficient date range queries using index-friendly predicates
- Aggregate pre-computation where appropriate

##  Author

**Sinethemba Ngcongo**  
BA Organizational Informatics Graduate | Data & Systems Analyst  
Stellenbosch University



##  License

This project is open source and available for educational and portfolio purposes.