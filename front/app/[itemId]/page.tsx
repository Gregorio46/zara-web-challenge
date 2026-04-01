'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useProductDetail } from '@/hooks/useProductDetail';
import { ColorOption, StorageOption, Product } from '@/types/product';
import ProductCard from '@/components/productCard';

const BackButton = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`;

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const ProductName = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const SectionLabel = styled.p`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 0.75rem 0;
  color: #000;
`;

const StorageList = styled.div`
  display: flex;
  gap: 0;
`;

const StorageButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 1px solid ${({ $active }) => ($active ? '#000' : '#ccc')};
  background: ${({ $active }) => ($active ? '#fff' : '#fff')};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  cursor: pointer;
  font-size: 0.85rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: #000;
  }

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`;

const ColorList = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ColorSwatch = styled.button<{ $color: string; $active: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  border: 2px solid ${({ $active }) => ($active ? '#000' : 'transparent')};
  outline: ${({ $active }) => ($active ? '2px solid #000' : 'none')};
  outline-offset: 2px;
  cursor: pointer;
  padding: 0;
  transition: outline 0.2s;

  &:hover {
    outline: 2px solid #999;
    outline-offset: 2px;
  }
`;

const ColorName = styled.span`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #000;
  color: #fff;
  border: none;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 1rem;

  &:hover {
    background: #333;
  }

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`;

const SpecsSection = styled.section`
  padding: 3rem 0;
`;

const SpecsTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2rem;
`;

const SpecsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const SpecRow = styled.tr`
  border-top: 1px solid #eee;

  &:last-child {
    border-bottom: 1px solid #eee;
  }
`;

const SpecLabel = styled.td`
  padding: 1rem 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #000;
  width: 25%;
  vertical-align: top;
`;

const SpecValue = styled.td`
  padding: 1rem 0;
  font-size: 0.85rem;
  color: #333;
`;


const SimilarSection = styled.section`
  padding: 3rem 0;
`;

const SimilarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2rem;
`;

const SimilarGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0;

  & > * {
    min-width: 250px;
    flex: 0 0 25%;
  }
`;

const ScrollProgressBar = styled.div`
  height: 2px;
  background: #f0f0f0;
  border-radius: 1px;
  margin-top: 1rem;
  overflow: hidden;
`;

const ScrollProgress = styled.div<{ $progress: number }>`
  height: 100%;
  background: #000;
  border-radius: 1px;
  width: ${({ $progress }) => $progress}%;
  transition: width 0.1s ease-out;
`;

const Message = styled.p`
  text-align: center;
  padding: 2rem;
  color: #666;
`;


export default function ItemPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.itemId as string;
  const { product, loading, error } = useProductDetail(id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [selectedStorage, setSelectedStorage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);

  useEffect(() => {
    setSelectedStorage(0);
    setSelectedColor(0);
  }, [product]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
      setScrollProgress(progress);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [product]);

  const currentImage =
    product?.colorOptions?.[selectedColor]?.imageUrl || product?.imageUrl || '';

  const handleAdd = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      brand: product.brand,
      name: product.name,
      price: product.storageOptions?.[selectedStorage]?.price ?? product.basePrice,
      storage: product.storageOptions?.[selectedStorage]?.capacity ?? '',
      color: product.colorOptions?.[selectedColor]?.name ?? '',
      imageUrl: currentImage,
    };

    const existing = localStorage.getItem('cart');
    const cart = existing ? JSON.parse(existing) : [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    window.dispatchEvent(new Event('storage'));

    router.push('/checkout');
  };

  if (loading) return <Message role="status" aria-live="polite">Loading...</Message>;
  if (error) return <Message role="alert">{error}</Message>;
  if (!product) return <Message>Product not found</Message>;

  const specs = product.specs;

  const specRows: { label: string; value: string }[] = [
    { label: 'Brand', value: product.brand },
    { label: 'Name', value: product.name },
    { label: 'Description', value: product.description || '' },
    { label: 'Screen', value: specs?.screen || '' },
    { label: 'Resolution', value: specs?.resolution || '' },
    { label: 'Processor', value: specs?.processor || '' },
    { label: 'Main Camera', value: specs?.mainCamera || '' },
    { label: 'Selfie Camera', value: specs?.selfieCamera || '' },
    { label: 'Battery', value: specs?.battery || '' },
    { label: 'OS', value: specs?.os || '' },
    { label: 'Screen Refresh Rate', value: specs?.screenRefreshRate || '' },
  ].filter((row) => row.value);

  return (
    <PageWrapper>
      <BackButton onClick={() => router.push('/')} aria-label="Back to product list">
        &lt; BACK
      </BackButton>
      <HeroSection>
        <ImageContainer>
          <ProductImage src={currentImage} alt={`${product.brand} ${product.name}`} />
        </ImageContainer>

        <DetailsContainer>
          <div>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>
              {product.storageOptions?.[selectedStorage]?.price ?? product.basePrice} EUR
            </ProductPrice>
          </div>

          {product.storageOptions && product.storageOptions.length > 0 && (
            <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
              <legend>
                <SectionLabel>
                  STORAGE HOW MUCH SPACE DO YOU NEED?
                </SectionLabel>
              </legend>
              <StorageList role="radiogroup" aria-label="Storage options">
                {product.storageOptions.map((opt: StorageOption, i: number) => (
                  <StorageButton
                    key={i}
                    $active={selectedStorage === i}
                    onClick={() => setSelectedStorage(i)}
                    role="radio"
                    aria-checked={selectedStorage === i}
                    aria-label={`${opt.capacity} storage`}
                  >
                    {opt.capacity}
                  </StorageButton>
                ))}
              </StorageList>
            </fieldset>
          )}

          {product.colorOptions && product.colorOptions.length > 0 && (
            <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
              <legend>
                <SectionLabel>COLOR. PICK YOUR FAVOURITE.</SectionLabel>
              </legend>
              <ColorList role="radiogroup" aria-label="Color options">
                {product.colorOptions.map((color: ColorOption, i: number) => (
                  <ColorSwatch
                    key={i}
                    $color={color.hexCode}
                    $active={selectedColor === i}
                    onClick={() => setSelectedColor(i)}
                    title={color.name}
                    role="radio"
                    aria-checked={selectedColor === i}
                    aria-label={`Color: ${color.name}`}
                  />
                ))}
              </ColorList>
              <ColorName aria-live="polite">{product.colorOptions[selectedColor]?.name}</ColorName>
            </fieldset>
          )}

          <AddButton onClick={handleAdd} aria-label={`Add ${product.name} to cart`}>AÑADIR</AddButton>
        </DetailsContainer>
      </HeroSection>

      {specRows.length > 0 && (
        <SpecsSection aria-label="Product specifications">
          <SpecsTitle>SPECIFICATIONS</SpecsTitle>
          <SpecsTable aria-label="Product specifications">
            <tbody>
              {specRows.map((row, i) => (
                <SpecRow key={i}>
                  <SpecLabel>{row.label}</SpecLabel>
                  <SpecValue>{row.value}</SpecValue>
                </SpecRow>
              ))}
            </tbody>
          </SpecsTable>
        </SpecsSection>
      )}

      {product.similarProducts && product.similarProducts.length > 0 && (
        <SimilarSection aria-label="Similar products">
          <SimilarTitle>SIMILAR ITEMS</SimilarTitle>
          <SimilarGrid ref={scrollContainerRef} role="list" aria-label="Similar products" tabIndex={0}>
            {product.similarProducts.map((item: Product) => (
              <div role="listitem" key={item.id}>
                <ProductCard product={item} />
              </div>
            ))}
          </SimilarGrid>
          <ScrollProgressBar role="progressbar" aria-valuenow={Math.round(scrollProgress)} aria-valuemin={0} aria-valuemax={100} aria-label="Scroll progress">
            <ScrollProgress $progress={scrollProgress} />
          </ScrollProgressBar>
        </SimilarSection>
      )}
    </PageWrapper>
  );
}