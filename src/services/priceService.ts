import axios from 'axios';
import { PriceModel } from '../models/priceModel';

const fetchAndStoreEthereumPrice = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: 'ethereum',
                vs_currencies: 'inr'
            }
        });

        const priceInInr = response.data.ethereum.inr;

        const newPrice = new PriceModel({
            price_inr: priceInInr
        });

        await newPrice.save();
        console.log(`Price stored: ₹${priceInInr}`);
    } catch (error) {
        console.error('Error fetching or storing Ethereum price:', error.message || error);
    }
};

export { fetchAndStoreEthereumPrice };