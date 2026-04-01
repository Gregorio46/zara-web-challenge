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

export default function Home() {
  const [search, setSearch] = useState('');
  const { products, loading, error } = useProducts(search);

  return (
    <div>
      <SearchBar onSearch={setSearch} result={products.length} />
      {loading && <Message>Loading...</Message>}
      {error && <Message>{error}</Message>}
      {!loading && !error && products.length === 0 && (
        <Message>No products found</Message>
      )}
      <ProductGrid>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </ProductGrid>
    </div>
  );
}
