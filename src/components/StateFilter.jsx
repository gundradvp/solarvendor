import React from 'react';
import styled from 'styled-components';
import { FaFilter } from 'react-icons/fa';

const FilterContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.large};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const FilterOption = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.light};
  color: ${props => props.active ? 'white' : props.theme.colors.dark};
  border: ${props => props.active ? 'none' : `1px solid ${props.theme.colors.secondary}`};
  cursor: pointer;
  transition: all 0.2s;
  font-size: ${props => props.theme.fontSizes.medium};
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : '#e9ecef'};
  }
  
  &.ap {
    border-color: #0d6efd;
    color: ${props => props.active ? 'white' : '#0d6efd'};
    background-color: ${props => props.active ? '#0d6efd' : props.theme.colors.light};
    
    &:hover {
      background-color: ${props => props.active ? '#0d6efd' : '#e6f0ff'};
    }
  }
  
  &.tg {
    border-color: #6A0572;
    color: ${props => props.active ? 'white' : '#6A0572'};
    background-color: ${props => props.active ? '#6A0572' : props.theme.colors.light};
    
    &:hover {
      background-color: ${props => props.active ? '#6A0572' : '#f5e6ff'};
    }
  }
  
  &.both {
    border-color: #FF6B35;
    color: ${props => props.active ? 'white' : '#FF6B35'};
    background-color: ${props => props.active ? '#FF6B35' : props.theme.colors.light};
    
    &:hover {
      background-color: ${props => props.active ? '#FF6B35' : '#ffe6e0'};
    }
  }
`;

const StateFilter = ({ activeFilter, onChange }) => {
  return (
    <FilterContainer>
      <FilterTitle>
        <FaFilter /> Filter Vendors by State
      </FilterTitle>
      <FilterOptions>
        <FilterOption 
          onClick={() => onChange('all')} 
          active={activeFilter === 'all'}
        >
          All Vendors
        </FilterOption>
        <FilterOption 
          className="ap"
          onClick={() => onChange('ap')} 
          active={activeFilter === 'ap'}
        >
          Andhra Pradesh Only
        </FilterOption>
        <FilterOption 
          className="tg"
          onClick={() => onChange('tg')} 
          active={activeFilter === 'tg'}
        >
          Telangana Only
        </FilterOption>
        <FilterOption 
          className="both"
          onClick={() => onChange('both')} 
          active={activeFilter === 'both'}
        >
          Both States
        </FilterOption>
      </FilterOptions>
    </FilterContainer>
  );
};

export default StateFilter;