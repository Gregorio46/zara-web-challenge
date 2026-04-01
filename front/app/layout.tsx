'use client';

import Nav from '@/components/nav';
import { useCart } from '@/hooks/useCart';
import styled from 'styled-components';

const Body = styled.body`
  margin: 0;
  padding: 2rem;
  font-family: helvetica, Arial, sans-serif;
`;

const SkipLink = styled.a`
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: 9999;
  padding: 1rem;
  background: #000;
  color: #fff;
  font-size: 1rem;
  text-decoration: none;

  &:focus {
    position: fixed;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    overflow: visible;
  }
`;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { itemCount } = useCart();

  return (
    <html lang="en">
      <head>
        <title>ZARA - Online Store</title>
        <meta name="description" content="Browse and shop smartphones at ZARA" />
      </head>
      <Body>
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <Nav items={itemCount} />
        <main id="main-content" role="main">
          {children}
        </main>
      </Body>
    </html>
  );
}
