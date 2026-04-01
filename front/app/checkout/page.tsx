'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 2rem 0;
`;

const CartList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
`;

const CartItemRow = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem 0;
  flex: 0 0 auto;
  min-width: 300px;
`;

const ItemImage = styled.img`
  width: 140px;
  height: 180px;
  object-fit: contain;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.p`
  font-size: 0.85rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

const ItemSpecs = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin: 0;
  text-transform: uppercase;
`;

const ItemPrice = styled.p`
  font-size: 0.85rem;
  margin: 0.5rem 0 0 0;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0;
  margin-top: 1rem;
  text-align: left;
  font-style: italic;

  &:hover {
    text-decoration: underline;
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-top: 1px solid #eee;
  margin-top: auto;
`;

const ContinueButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #fff;
  border: 1px solid #000;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const TotalText = styled.span`
  font-size: 0.85rem;
  letter-spacing: 0.5px;
`;

const PayButton = styled.button`
  padding: 0.75rem 3rem;
  background: #000;
  color: #fff;
  border: none;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
`;

const EmptyMessage = styled.p`
  text-align: center;
  padding: 4rem;
  color: #666;
  font-size: 0.9rem;
`;

export default function CheckoutPage() {
  const { cart, itemCount, total, removeItem } = useCart();
  const router = useRouter();

  return (
    <PageWrapper>
      <Title>CART ({itemCount})</Title>

      <CartList>
        {itemCount === 0 && <EmptyMessage>Your cart is empty</EmptyMessage>}
        {cart.map((item, index) => (
          <CartItemRow key={`${item.id}-${index}`}>
            <ItemImage src={item.imageUrl} alt={item.name} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemSpecs>
                {[item.storage, item.color].filter(Boolean).join(' | ')}
              </ItemSpecs>
              <ItemPrice>{item.price} EUR</ItemPrice>
              <RemoveButton onClick={() => removeItem(index)}>
                Eliminar
              </RemoveButton>
            </ItemDetails>
          </CartItemRow>
        ))}
      </CartList>

      <BottomBar>
        <ContinueButton onClick={() => router.push('/')}>CONTINUE SHOPPING</ContinueButton>
        <RightSection>
          <TotalText>TOTAL&nbsp;&nbsp;&nbsp;&nbsp;{total} EUR</TotalText>
          <PayButton>PAY</PayButton>
        </RightSection>
      </BottomBar>
    </PageWrapper>
  );
}
