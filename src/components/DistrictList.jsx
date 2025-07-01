import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaMapMarkerAlt } from 'react-icons/fa';

const DistrictsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const DistrictCard = styled(Link)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 120px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const DistrictIcon = styled.div`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
  
  ${DistrictCard}:hover & {
    color: white;
  }
`;

const DistrictName = styled.h3`
  font-size: ${props => props.theme.fontSizes.large};
  text-transform: capitalize;
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

// Function to format district names for display
const formatDistrictName = (districtId) => {
  // Special case abbreviations
  if (districtId === 'atp') return 'Anantapur';
  if (districtId === 'asr') return 'Alluri Sitharama Raju';
  if (districtId === 'ntr') return 'NTR District';
  if (districtId === 'wg') return 'West Godavari';
  if (districtId === 'egdt') return 'East Godavari';
  if (districtId === 'vzm') return 'Vizianagaram';
  if (districtId === 'vskp') return 'Visakhapatnam';
  if (districtId === 'ysr') return 'YSR District';
  
  // General formatting - capitalize first letter of each word
  return districtId
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const DistrictList = ({ districts, stateName }) => {
  return (
    <>
      <SectionTitle>{stateName} Districts</SectionTitle>
      <DistrictsGrid>
        {districts.map((district) => (
          <DistrictCard key={district} to={`/district/${district}?state=${stateName === 'Andhra Pradesh' ? 'ap' : 'tg'}`}>
            <DistrictIcon>
              <FaMapMarkerAlt size={28} />
            </DistrictIcon>
            <DistrictName>{formatDistrictName(district)}</DistrictName>
          </DistrictCard>
        ))}
      </DistrictsGrid>
    </>
  );
};

export default DistrictList;
export { formatDistrictName };