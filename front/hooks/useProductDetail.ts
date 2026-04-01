import { useState, useEffect } from 'react';
import { ProductDetail } from '@/types/product';

const API_URL = 'http://localhost:3001';

interface UseProductDetailReturn {
  product: ProductDetail | null;
  loading: boolean;
  error: string | null;
}

export function useProductDetail(id: string): UseProductDetailReturn {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/products/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }

        const data: ProductDetail = await response.json();
        setProduct(data);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError((err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [id]);

  return { product, loading, error };
}
