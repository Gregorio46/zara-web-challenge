'use client';

import styled from 'styled-components';
import { Product } from '@/types/product';

const Card = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  border: 1px solid darkgrey;
  justify-content: space-between;
  padding: 15px;
  width: 100%;
  aspect-ratio: 1;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    transition: height 0.5s ease;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    background-color: black;
    transition: height 0.5s ease;
    z-index: 0;
  }

  &:hover {
    color: white;

    &::before {
      height: 100%;
    }

    &::after {
      height: 100%;
    }
  }

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 2px;
  }

  @media (max-width: 767px) {
    max-width: 100%;
    aspect-ratio: auto;
  }
`;

const CardImage = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
  object-position: center;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const CardBrand = styled.span`
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.5rem;
  text-transform: uppercase;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
`;

const CardName = styled.span`
  font-size: 0.90rem;
  margin-top: 0.25rem;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
`;

const CardPrice = styled.span`
  font-size: 0.90rem;
  margin-top: 0.25rem;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
`;

const CardContent = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
`;

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card href={`/${product.id}`} aria-label={`${product.brand} ${product.name}, ${product.basePrice} EUR`}>
      <CardImage src={product.imageUrl} alt={`${product.brand} ${product.name}`} />
      <CardContent>
        <CardInfo>
          <CardBrand>{product.brand}</CardBrand>
          <CardName>{product.name}</CardName>
        </CardInfo>
        <CardPrice>{product.basePrice} EUR</CardPrice>
      </CardContent>
    </Card>
  );
}
