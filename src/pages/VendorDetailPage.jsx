import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaArrowLeft, FaStar, FaSolarPanel, FaUsers, FaBolt, FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import { formatDistrictName } from '../components/DistrictList.jsx';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.secondary};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const VendorHeader = styled.div`
  margin-bottom: 2rem;
`;

const VendorName = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxlarge};
  margin-bottom: 0.5rem;
`;

const StatewideBadge = styled.span`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: ${props => props.theme.fontSizes.small};
  margin-left: 1rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.warning};
  margin-bottom: 1rem;
  
  span {
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }
`;

const VendorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 2fr 1fr;
  }
`;

const InfoSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;

  h2 {
    font-size: ${props => props.theme.fontSizes.xlarge};
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.dark};
    position: relative;
    padding-bottom: 0.5rem;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 3px;
      background-color: ${props => props.theme.colors.primary};
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  
  svg {
    color: ${props => props.theme.colors.primary};
    min-width: 20px;
  }
`;

const PhoneLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  font-weight: 500;
  border-bottom: 1px dashed ${props => props.theme.colors.primary};
  padding-bottom: 2px;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
    border-bottom-style: solid;
    transform: translateY(-1px);
  }
  
  svg {
    font-size: 1rem;
    color: inherit;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const StatCard = styled.div`
  background-color: ${props => props.theme.colors.light};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.fontSizes.xlarge};
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.secondary};
`;

const DistrictsContainer = styled.div`
  margin-top: 1rem;
`;

const DistrictTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const DistrictTag = styled(Link)`
  background-color: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.dark};
  border-radius: 20px;
  padding: 0.35rem 1rem;
  font-size: ${props => props.theme.fontSizes.small};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.secondary};
`;

const ErrorMessage = styled.div`
  background-color: ${props => props.theme.colors.danger};
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 0;
  
  h2 {
    font-size: ${props => props.theme.fontSizes.xxlarge};
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.dark};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.large};
    color: ${props => props.theme.colors.secondary};
    margin-bottom: 2rem;
  }
`;

const VendorDetailPage = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api-data/all_combined_vendors.json');
        
        // Find vendor with matching ID
        const foundVendor = response.data.find(v => 
          v.vendorId === parseInt(vendorId) || v.vendorId === vendorId
        );
        
        if (foundVendor) {
          setVendor(foundVendor);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load vendor data. Please refresh the page to try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [vendorId]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingMessage>Loading vendor information...</LoadingMessage>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorMessage>{error}</ErrorMessage>
        <BackButton to="/">
          <FaArrowLeft /> Back to Home
        </BackButton>
      </PageContainer>
    );
  }

  if (!vendor) {
    return (
      <PageContainer>
        <NotFound>
          <h2>Vendor Not Found</h2>
          <p>We couldn't find any vendor with the provided ID.</p>
          <BackButton to="/">
            <FaArrowLeft /> Back to Home
          </BackButton>
        </NotFound>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton to="/">
        <FaArrowLeft /> Back to Home
      </BackButton>
      
      <VendorHeader>
        <VendorName>
          {vendor.vendorName}
          {vendor.operatesInBothStates && (
            <StatewideBadge style={{backgroundColor: '#FF6B35'}}>
              Operates in Both States
            </StatewideBadge>
          )}
          {vendor.isStatewide && !vendor.operatesInBothStates && (
            <StatewideBadge>
              Statewide ({vendor.districtCount} districts)
            </StatewideBadge>
          )}
        </VendorName>
        
        {vendor.rating && (
          <Rating>
            <FaStar size={20} />
            <span>{vendor.rating}</span>
            <span>({vendor.consumerRatingCount || 0} reviews)</span>
          </Rating>
        )}
      </VendorHeader>
      
      <VendorGrid>
        <div>
          <InfoSection>
            <h2>Contact Information</h2>
            
            {vendor.contactPersonName && (
              <ContactItem>
                <FaUsers />
                <div>
                  <strong>Contact Person:</strong> {vendor.contactPersonName}
                </div>
              </ContactItem>
            )}
            
            {vendor.address && (
              <ContactItem>
                <FaMapMarkerAlt />
                <div>
                  <strong>Address:</strong> {vendor.address}
                </div>
              </ContactItem>
            )}
            
            {vendor.contactPersonEmail && (
              <ContactItem>
                <FaEnvelope />
                <div>
                  <strong>Email:</strong> {vendor.contactPersonEmail}
                </div>
              </ContactItem>
            )}
            
            {vendor.contactPersonMobile && (
              <ContactItem>
                <FaPhone />
                <div>
                  <strong>Phone:</strong> <PhoneLink href={`tel:${vendor.contactPersonMobile}`}>
                    {vendor.contactPersonMobile} <small style={{ color: '#888' }}>(Click to Call)</small>
                  </PhoneLink>
                </div>
              </ContactItem>
            )}
            
            {vendor.websiteUrl && (
              <ContactItem>
                <FaGlobe />
                <div>
                  <strong>Website:</strong>
                  <a 
                    href={vendor.websiteUrl.startsWith('http') ? vendor.websiteUrl : `https://${vendor.websiteUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {vendor.websiteUrl}
                  </a>
                </div>
              </ContactItem>
            )}
          </InfoSection>
          
          <InfoSection>
            <h2>Performance Metrics</h2>
            <StatsGrid>
              <StatCard>
                <StatValue>{vendor.installationCount || 0}</StatValue>
                <StatLabel>Installations</StatLabel>
              </StatCard>
              
              <StatCard>
                <StatValue>{vendor.consumerRatingCount || 0}</StatValue>
                <StatLabel>Reviews</StatLabel>
              </StatCard>
              
              <StatCard>
                <StatValue>{vendor.installedCapacity || 0}</StatValue>
                <StatLabel>Capacity (kW)</StatLabel>
              </StatCard>
            </StatsGrid>
          </InfoSection>
        </div>
        
        <div>
          <InfoSection>
            <h2>Service Areas</h2>
            
            {vendor.ap_districts && vendor.ap_districts.length > 0 && (
              <DistrictsContainer>
                <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: '#666' }}>
                  Andhra Pradesh Districts ({vendor.ap_districts.length})
                </h3>
                <DistrictTags>
                  {vendor.ap_districts.map(district => (
                    <DistrictTag key={district} to={`/district/${district}?state=ap`}>
                      {formatDistrictName(district)}
                    </DistrictTag>
                  ))}
                </DistrictTags>
              </DistrictsContainer>
            )}
            
            {vendor.tg_districts && vendor.tg_districts.length > 0 && (
              <DistrictsContainer>
                <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: '#666' }}>
                  Telangana Districts ({vendor.tg_districts.length})
                </h3>
                <DistrictTags>
                  {vendor.tg_districts.map(district => (
                    <DistrictTag key={district} to={`/district/${district}?state=tg`}>
                      {formatDistrictName(district)}
                    </DistrictTag>
                  ))}
                </DistrictTags>
              </DistrictsContainer>
            )}
          </InfoSection>
        </div>
      </VendorGrid>
    </PageContainer>
  );
};

export default VendorDetailPage;