import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

const API_URL = 'http://localhost:3001';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(search: string = ''): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (search) {
          params.set('search', search);
        }

        const response = await fetch(`${API_URL}/products?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError((err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [search]);

  return { products, loading, error };
}
