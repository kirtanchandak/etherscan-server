# etherscan-server 🚀
An Express and Typescript server used to fetch and store transactions and expenses.

## API Endpoints
### 1. Get transactions
- **Endpoint**: `/getTransactions/`
- **Method**: `GET`
- **Query Parameter**: `address` (e.g., `0xce94e5621a5f7068253c42558c147480f38b5e0d`)

### 2. Get Expenses
- **Endpoint**: `/getUserExpenses/`
- **Method**: `GET`
- **Query Parameter**: `address` (e.g., `0xce94e5621a5f7068253c42558c147480f38b5e0d`)

## Additional info
This server also contains a service which stores the price of ETH in INR, in the database every 10 minutes. 
