import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Product from './type';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/products', async (req: Request, res: Response) => {
  try {
    const { search, limit = 20, offset = 0 } = req.query;
    
    const response = await fetch(process.env.API_URL!, {
      headers: {
        'x-api-key': process.env.X_API_KEY!
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products from external API');
    }
    
    const products = await response.json() as Product[];
    
    let filteredProducts: Product[] = products;
    
    if (search && typeof search === 'string') {
      filteredProducts = products.filter((product: Product) => 
        product.brand.toLowerCase().includes(search.toLowerCase()) ||
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    const limitNum = parseInt(limit as string);
    const offsetNum = parseInt(offset as string);
    const paginatedProducts = filteredProducts.slice(offsetNum, offsetNum + limitNum);
    
    res.json(paginatedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const response = await fetch(`${process.env.API_URL}/${id}`, {
      headers: {
        'x-api-key': process.env.X_API_KEY!
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products from external API');
    }
    
    const product = await response.json();
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
