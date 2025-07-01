import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import VendorCard from '../components/VendorCard';
import { formatDistrictName } from '../components/DistrictList';
import { FaArrowLeft, FaSearch, FaSort } from 'react-icons/fa';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.secondary};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxlarge};
  margin-bottom: 1rem;
`;

const VendorCount = styled.p`
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1.5rem;
`;

const VendorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
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

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: ${props => props.theme.fontSizes.medium};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.secondary};
`;

const SortSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Select = styled.select`
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: ${props => props.theme.fontSizes.medium};
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: ${props => props.theme.colors.secondary};
  font-size: ${props => props.theme.fontSizes.large};
`;

const DistrictPage = () => {
  const { districtId } = useParams();
  const [searchParams] = useSearchParams();
  const stateCode = searchParams.get('state') || 'ap'; // Default to AP
  
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  
  const stateName = stateCode === 'ap' ? 'Andhra Pradesh' : 'Telangana';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api-data/all_combined_vendors.json');
        
        // Filter vendors that serve this district based on state
        const filteredVendors = response.data.filter(vendor => {
          if (stateCode === 'ap' && vendor.ap_districts) {
            return vendor.ap_districts.includes(districtId);
          } else if (stateCode === 'tg' && vendor.tg_districts) {
            return vendor.tg_districts.includes(districtId);
          }
          return false;
        });
        
        setVendors(filteredVendors);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load vendor data. Please refresh the page to try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [districtId, stateCode]);

  // Filter vendors based on search query
  const filteredVendors = vendors.filter(vendor => 
    vendor.vendorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort vendors
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
      case 'installations':
        return (b.installationCount || 0) - (a.installationCount || 0);
      case 'capacity':
        return (b.installedCapacity || 0) - (a.installedCapacity || 0);
      case 'name':
        return (a.vendorName || '').localeCompare(b.vendorName || '');
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <PageContainer>
        <LoadingMessage>Loading vendors data...</LoadingMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <BackButton to="/">
          <FaArrowLeft /> Back to Districts
        </BackButton>
        <Title>{formatDistrictName(districtId)} District Solar Vendors ({stateName})</Title>
        <VendorCount>{vendors.length} vendors found</VendorCount>
      </Header>

      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}

      <Controls>
        <SearchBox>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search vendors by name or location..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBox>
        <SortSelect>
          <FaSort />
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="rating">Sort by Rating</option>
            <option value="installations">Sort by Installations</option>
            <option value="capacity">Sort by Capacity</option>
            <option value="name">Sort by Name</option>
          </Select>
        </SortSelect>
      </Controls>

      {sortedVendors.length > 0 ? (
        <VendorGrid>
          {sortedVendors.map(vendor => (
            <VendorCard key={vendor.vendorId} vendor={vendor} />
          ))}
        </VendorGrid>
      ) : (
        <NoResults>
          No vendors found matching your search.
        </NoResults>
      )}
    </PageContainer>
  );
};

export default DistrictPage;
