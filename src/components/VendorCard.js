import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaStar, FaBuilding, FaSolarPanel, FaUserTie, FaPhone } from 'react-icons/fa';

const Card = styled(Link)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  color: ${props => props.theme.colors.text};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  font-size: ${props => props.theme.fontSizes.large};
  margin-bottom: 0.25rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.warning};
  margin-bottom: 0.5rem;
  
  span {
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
  font-size: ${props => props.theme.fontSizes.medium};
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const PhoneLink = styled.a`
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

const Badge = styled.span`
  background-color: ${props => props.color || props.theme.colors.primary};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: ${props => props.theme.fontSizes.small};
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

const VendorCard = ({ vendor, showBothStatesBadge = false }) => {
  return (
    <Card to={`/vendor/${vendor.vendorId}`}>
      <BadgeContainer>
        {vendor.isStatewide && !showBothStatesBadge && (
          <Badge>
            Statewide ({vendor.districtCount} districts)
          </Badge>
        )}
        
        {showBothStatesBadge && (
          <>
            <Badge color="#FF6B35">AP & TG Vendor</Badge>
            {vendor.ap_districts && vendor.ap_districts.length > 0 && (
              <Badge>AP: {vendor.ap_districts.length} districts</Badge>
            )}
            {vendor.tg_districts && vendor.tg_districts.length > 0 && (
              <Badge color="#6A0572">TG: {vendor.tg_districts.length} districts</Badge>
            )}
          </>
        )}
      </BadgeContainer>
      
      <Title>{vendor.vendorName}</Title>
      {vendor.rating && (
        <Rating>
          <FaStar /> <span>{vendor.rating}</span>
          <span>({vendor.consumerRatingCount || 0} reviews)</span>
        </Rating>
      )}
      <InfoItem>
        <FaUserTie />
        <span>{vendor.contactPersonName || 'No contact person specified'}</span>
      </InfoItem>
      <InfoItem>
        <FaBuilding />
        <span>{vendor.address ? vendor.address.split(',')[0] : 'Address not available'}</span>
      </InfoItem>
      <InfoItem>
        <FaSolarPanel />
        <span>{vendor.installationCount || 0} installations</span>
      </InfoItem>
      {vendor.contactPersonMobile && (
        <InfoItem>
          <FaPhone />
          <PhoneLink href={`tel:${vendor.contactPersonMobile}`}>
            <span>{vendor.contactPersonMobile}</span> <small style={{ color: '#888' }}>(Click to Call)</small>
          </PhoneLink>
        </InfoItem>
      )}
    </Card>
  );
};

export default VendorCard;
