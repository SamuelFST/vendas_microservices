import axios from 'axios';
import secrets from '../../../config/constants/secrets';

const { PRODUCT_API_URL } = secrets;

const productApi = axios.create({
  baseURL: PRODUCT_API_URL,
});

class ProductCLient {
  async checkProductsStock(products, token, transactionid) {
    try {
      const headers = {
        Authorization: token,
        transactionid,
      };

      console.info(
        `Sending request to Product-API check-stock with data ${JSON.stringify(
          products,
        )} | [transactionID: ${transactionid}]`,
      );

      const response = await productApi.post('/products/stock', { products }, { headers });

      if (response) {
        console.info(
          `Success response from Product-API check-stock | [transactionID: ${transactionid}]`,
        );
        return true;
      }
      return false;
    } catch (error) {
      console.info(
        `Error response from Product-API check-stock | [transactionID: ${transactionid}]`,
      );
      console.error(error.message);
      return false;
    }
  }
}

export default new ProductCLient();
