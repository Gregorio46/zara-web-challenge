'use client';

import { useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/searchBar';
import ProductCard from '../components/productCard';
import { useProducts } from '@/hooks/useProducts';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Message = styled.p`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const VisuallyHidden = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export default function Home() {
  const [search, setSearch] = useState('');
  const { products, loading, error } = useProducts(search);

  return (
    <div>
      <VisuallyHidden>Smartphone catalog</VisuallyHidden>
      <SearchBar onSearch={setSearch} result={products.length} />
      <div aria-live="polite" aria-atomic="true">
        {loading && <Message role="status">Loading...</Message>}
        {error && <Message role="alert">{error}</Message>}
        {!loading && !error && products.length === 0 && (
          <Message>No products found</Message>
        )}
      </div>
      <ProductGrid role="list" aria-label="Products">
        {products.map((product, index) => (
          <div role="listitem" key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </ProductGrid>
    </div>
  );
}
