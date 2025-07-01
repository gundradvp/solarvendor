import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHandshake, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xxlarge};
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.dark};
  display: flex;
  align-items: center;
  gap: 0.75rem;
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

const Description = styled.p`
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 2rem;
  max-width: 800px;
  line-height: 1.5;
`;

const VendorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const VendorCard = styled(Link)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  color: ${props => props.theme.colors.text};
  border-left: 4px solid #FF6B35;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const VendorName = styled.h3`
  font-size: ${props => props.theme.fontSizes.large};
  margin-bottom: 0.25rem;
`;

const Badge = styled.span`
  background-color: #FF6B35;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: ${props => props.theme.fontSizes.small};
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const StateInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0;
`;

const StateCount = styled.div`
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  font-size: ${props => props.theme.fontSizes.small};
  background-color: ${props => props.color || props.theme.colors.light};
  color: ${props => props.textColor || props.theme.colors.dark};
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.warning};
  margin-top: 0.5rem;
  
  span {
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }
`;

const Address = styled.div`
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.secondary};
  margin-top: 0.5rem;
`;

const CrossStateVendors = ({ vendors }) => {
  // Filter vendors that operate in both states
  const bothStatesVendors = vendors.filter(vendor => vendor.operatesInBothStates);
  
  // Sort by total districts covered (AP + TG)
  const sortedVendors = [...bothStatesVendors].sort((a, b) => {
    const aTotalDistricts = (a.ap_districts?.length || 0) + (a.tg_districts?.length || 0);
    const bTotalDistricts = (b.ap_districts?.length || 0) + (b.tg_districts?.length || 0);
    return bTotalDistricts - aTotalDistricts;
  });
  
  // Take top 6 vendors
  const topVendors = sortedVendors.slice(0, 6);
  
  return (
    <Container id="cross-state">
      <SectionTitle>
        <FaHandshake size={30} /> Cross-State Vendors
      </SectionTitle>
      
      <Description>
        These vendors operate across both Andhra Pradesh and Telangana, 
        offering their solar installation services in multiple districts of both states. 
        This wider reach often indicates more established businesses with broader service capabilities.
      </Description>
      
      <VendorGrid>
        {topVendors.map(vendor => (
          <VendorCard key={vendor.vendorId} to={`/vendor/${vendor.vendorId}`}>
            <Badge>AP & TG Vendor</Badge>
            <VendorName>{vendor.vendorName}</VendorName>
            
            <StateInfo>
              <StateCount color="#e6f0ff" textColor="#0d6efd">
                <FaMapMarkerAlt /> AP: {vendor.ap_districts?.length || 0}
              </StateCount>
              <StateCount color="#f5e6ff" textColor="#6A0572">
                <FaMapMarkerAlt /> TG: {vendor.tg_districts?.length || 0}
              </StateCount>
            </StateInfo>
            
            {vendor.rating && (
              <Rating>
                <FaStar /> <span>{vendor.rating}</span>
                <span>({vendor.consumerRatingCount || 0} reviews)</span>
              </Rating>
            )}
            
            {vendor.address && (
              <Address>
                {vendor.address.split(',')[0]}, {vendor.address.split(',')[1] || ''}...
              </Address>
            )}
          </VendorCard>
        ))}
      </VendorGrid>
      
      {bothStatesVendors.length > 6 && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link 
            to="/#both-states" 
            style={{ 
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#FF6B35',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            View All {bothStatesVendors.length} Cross-State Vendors
          </Link>
        </div>
      )}
    </Container>
  );
};

export default CrossStateVendors;
