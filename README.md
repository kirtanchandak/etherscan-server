# etherscan-server 🚀
An Express and Typescript server used to fetch and store transactions and expenses.

## API Endpoints
### 1. Get Latest Price
- **Endpoint**: `/stats/`
- **Method**: `GET`
- **Query Parameter**: `coin` (e.g., `bitcoin`, `matic-network`)

### 2. Get Deviation
- **Endpoint**: `/deviation/`
- **Method**: `GET`
- **Query Parameter**: `address` (e.g., `BTC`, `ETH`)

## Additional info
This server also contains a service which stores the prices for BTC, ETH, MATIC every 2 hours.  
