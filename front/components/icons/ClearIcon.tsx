import styled from 'styled-components';

const ClearIconStyled = styled.svg`
  width: 16px;
  height: 16px;
  stroke: #666;
  stroke-width: 2;
`;

export function ClearIcon() {
  return (
    <ClearIconStyled viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </ClearIconStyled>
  );
}