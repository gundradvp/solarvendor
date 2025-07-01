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
    background-color: #FF6B35;
  }
`;

const EmptyMessage = styled.p`
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.secondary};
  text-align: center;
  padding: 2rem;
`;

const InfoText = styled.p`
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1.5rem;
`;

const BothStatesVendors = ({ vendors }) => {
  // Filter vendors that operate in both states
  const bothStatesVendors = vendors.filter(vendor => vendor.operatesInBothStates);
  
  return (
    <div id="both-states">
      <SectionTitle>Vendors Operating in Both States</SectionTitle>
      <InfoText>
        These vendors have operations in both Andhra Pradesh and Telangana, 
        offering their services across the two states.
      </InfoText>
      
      {bothStatesVendors.length > 0 ? (
        <VendorGrid>
          {bothStatesVendors.map(vendor => (
            <VendorCard 
              key={vendor.vendorId} 
              vendor={vendor} 
              showBothStatesBadge={true}
            />
          ))}
        </VendorGrid>
      ) : (
        <EmptyMessage>No vendors found operating in both states.</EmptyMessage>
      )}
    </div>
  );
};

export default BothStatesVendors;
