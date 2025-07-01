import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DistrictList from '../components/DistrictList';
import StatewideVendors from '../components/StatewideVendors';
import StateFilter from '../components/StateFilter';
import VendorAnalytics from '../components/VendorAnalytics';
import CrossStateVendors from '../components/CrossStateVendors';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%);
  color: white;
  padding: 4rem 1rem;
  text-align: center;
  margin-bottom: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(13, 110, 253, 0.3);
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.95;
  line-height: 1.6;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
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

const StateSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  background-color: ${props => props.theme.colors.light};
  padding: 1rem;
  border-radius: 8px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const StateButton = styled.button`
  background-color: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${props => props.theme.fontSizes.medium};
  
  &:hover {
    background-color: ${props => !props.active ? '#e6f0ff' : props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.75rem 1rem;
  }
`;

const HomePage = () => {
  const [vendors, setVendors] = useState([]);
  const [districts, setDistricts] = useState({ ap: [], tg: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeState, setActiveState] = useState('ap');
  const [stateFilter, setStateFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try multiple possible paths for the data file
        let response;
        try {
          response = await axios.get('/api-data/all_combined_vendors.json');
        } catch (err) {
          // Fallback to public directory
          response = await axios.get('/combined_vendors.json');
        }
        
        // Process vendor data
        const processedVendors = response.data.map(vendor => ({
          ...vendor,
          // Calculate if vendor operates in both states
          operatesInBothStates: Boolean(
            vendor.ap_districts && vendor.ap_districts.length > 0 &&
            vendor.tg_districts && vendor.tg_districts.length > 0
          ),
          // Calculate if vendor is statewide (serves 5+ districts in a state)
          isStatewide: Boolean(
            (vendor.ap_districts && vendor.ap_districts.length >= 5) ||
            (vendor.tg_districts && vendor.tg_districts.length >= 5)
          ),
          // Total district count
          districtCount: (vendor.ap_districts?.length || 0) + (vendor.tg_districts?.length || 0)
        }));
        
        setVendors(processedVendors);
        
        // Extract unique districts for AP and TG
        const apDistricts = [...new Set(
          processedVendors.flatMap(vendor => vendor.ap_districts || [])
        )];
        
        const tgDistricts = [...new Set(
          processedVendors.flatMap(vendor => vendor.tg_districts || [])
        )];

        setDistricts({
          ap: apDistricts.sort(),
          tg: tgDistricts.sort()
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load vendor data. Please refresh the page to try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <LoadingMessage>Loading vendors data...</LoadingMessage>
      </PageContainer>
    );
  }

  // Count vendors in both states
  const bothStatesVendors = vendors.filter(vendor => vendor.operatesInBothStates);
  
  return (
    <>
      <Hero>
        <HeroTitle>Solar Vendors Directory</HeroTitle>
        <HeroSubtitle>
          Find the best solar vendors in your district across Andhra Pradesh and Telangana.
          Compare ratings, installations, and service areas to make an informed choice.
        </HeroSubtitle>
      </Hero>

      <PageContainer>
        {error && (
          <ErrorMessage>{error}</ErrorMessage>
        )}

        <StateSelector>
          <StateButton 
            active={activeState === 'ap'} 
            onClick={() => setActiveState('ap')}
          >
            Andhra Pradesh
          </StateButton>
          <StateButton 
            active={activeState === 'tg'} 
            onClick={() => setActiveState('tg')}
          >
            Telangana
          </StateButton>
        </StateSelector>

        <StateFilter 
          activeFilter={stateFilter}
          onChange={setStateFilter}
        />

        <VendorAnalytics vendors={vendors} />

        <Section>
          <CrossStateVendors vendors={vendors} />
        </Section>

        <Section>
          <DistrictList 
            districts={districts[activeState]} 
            stateName={activeState === 'ap' ? 'Andhra Pradesh' : 'Telangana'} 
          />
        </Section>

        <Section>
          <StatewideVendors 
            vendors={vendors.filter(vendor => {
              // First filter by active state tab (AP or TG)
              const matchesActiveState = 
                (activeState === 'ap' && vendor.ap_districts && vendor.ap_districts.length > 0) ||
                (activeState === 'tg' && vendor.tg_districts && vendor.tg_districts.length > 0);
              
              // Then filter by selected state filter
              if (stateFilter === 'all') {
                return matchesActiveState;
              } else if (stateFilter === 'ap') {
                return vendor.ap_districts && vendor.ap_districts.length > 0 && !vendor.operatesInBothStates;
              } else if (stateFilter === 'tg') {
                return vendor.tg_districts && vendor.tg_districts.length > 0 && !vendor.operatesInBothStates;
              } else if (stateFilter === 'both') {
                return vendor.operatesInBothStates;
              }
              
              return matchesActiveState;
            })}
            showBothStates={stateFilter === 'both'}
          />
        </Section>

        {bothStatesVendors.length > 0 && (
          <Section>
            <StatewideVendors 
              vendors={bothStatesVendors}
              showBothStates={true}
              title="Vendors Operating in Both States"
            />
          </Section>
        )}
      </PageContainer>
    </>
  );
};

export default HomePage;