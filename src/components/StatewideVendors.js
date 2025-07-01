import React from 'react';
import styled from 'styled-components';
import VendorCard from './VendorCard';

const VendorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xxlarge};
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.dark};
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 80px;
    height: 4px;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const EmptyMessage = styled.p`
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.secondary};
  text-align: center;
  padding: 2rem;
`;

const StatewideVendors = ({ vendors, showBothStates = false, title = "Statewide Vendors" }) => {
  // If showing both states, use passed vendors
  // Otherwise filter for vendors serving 5 or more districts
  const displayVendors = showBothStates 
    ? vendors 
    : vendors.filter(vendor => vendor.isStatewide);
  
  return (
    <div id={showBothStates ? "both-states" : "statewide"}>
      <SectionTitle>{title}</SectionTitle>
      
      {displayVendors.length > 0 ? (
        <VendorGrid>
          {displayVendors.map(vendor => (
            <VendorCard 
              key={vendor.vendorId} 
              vendor={vendor}
              showBothStatesBadge={showBothStates}
            />
          ))}
        </VendorGrid>
      ) : (
        <EmptyMessage>No vendors found.</EmptyMessage>
      )}
    </div>
  );
};

export default StatewideVendors;
