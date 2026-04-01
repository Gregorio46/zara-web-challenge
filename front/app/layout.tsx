'use client';

import Nav from '@/components/nav';
import { useCart } from '@/hooks/useCart';
import styled from 'styled-components';

const Body = styled.body`
  margin: 0;
  padding: 2rem;
  font-family: helvetica, Arial, sans-serif;
`;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { itemCount } = useCart();

  return (
    <html lang="en">
      <Body>
        <Nav items={itemCount} />
        {children}
      </Body>
    </html>
  );
}
