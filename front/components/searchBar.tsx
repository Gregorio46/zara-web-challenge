'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { ClearIcon } from './icons';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding-top: 2rem;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 0;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  font-size: 1rem;
  background: transparent;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    border-bottom-color: #000;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.7;
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const ResultText = styled.span`
  font-size: 0.875rem;
  color: black;
`;

const FilterButton = styled.button`
  color: black;
  background: transparent;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 4px;
`;



interface SearchBarProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  result?: number;
}

export default function SearchBar({ onSearch, placeholder = "Search for a smartphone...", result = 20 }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');

  const searchChange = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleClear = () => {
    setSearchValue('');
     if (onSearch) {
      onSearch('');
    }
  };

  return (
    <SearchContainer>
      <InputWrapper>
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue && (
          <ClearButton onClick={handleClear}>
            <ClearIcon />
          </ClearButton>
        )}
      </InputWrapper>
      <ResultWrapper>
        <ResultText>{result} RESULTS</ResultText>
        <FilterButton onClick={() => searchChange()}>FILTRAR</FilterButton>
      </ResultWrapper>
    </SearchContainer>
  );
}