import axios from 'axios';
import secrets from '../../../config/constants/secrets';

const { PRODUCT_API_URL } = secrets;

const productApi = axios.create({
  baseURL: PRODUCT_API_URL,
});

class ProductCLient {
  async checkProductsStock(products, token) {
    try {
      const headers = {
        Authorization: token,
      };

      const response = await productApi.post('/products/stock', { headers }, products);

      if (response) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}

export default new ProductCLient();
