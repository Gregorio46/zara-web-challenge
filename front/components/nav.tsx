'use client';

import Link from 'next/link';
import logo from '@/public/logo.svg';

import { BagIcon, ShoppingBagIcon } from './icons';

import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CartLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  text-decoration: none;
  color: inherit;
`;

const CartCount = styled.span`
  font-size: 0.75rem;
`;

interface NavProps {
  items: number;
}

export default function Nav({ items }: NavProps) {

  return (
    <NavContainer aria-label="Main navigation">
      <Link href="/" aria-label="ZARA home">
        <img src={logo.src} alt="ZARA" />
      </Link>
      <IconsContainer>
        <CartLink href="/checkout" aria-label={`Shopping cart${items > 0 ? `, ${items} item${items !== 1 ? 's' : ''}` : ', empty'}`}>
          {items > 0 ? (
            <ShoppingBagIcon />
          ) : (
            <BagIcon />
          )}
          {items > 0 && <CartCount aria-hidden="true">{items}</CartCount>}
        </CartLink>
      </IconsContainer>
    </NavContainer>
  );
}
