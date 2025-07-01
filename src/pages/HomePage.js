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
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 3rem 1rem;
  text-align: center;
  margin-bottom: 3rem;
  border-radius: 8px;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
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

const HomePage = () => {
  const [vendors, setVendors] = useState([]);
  const [districts, setDistricts] = useState({ ap: [], tg: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeState, setActiveState] = useState('ap'); // 'ap' or 'tg'
  const [stateFilter, setStateFilter] = useState('all'); // 'all', 'ap', 'tg', or 'both'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api-data/all_combined_vendors.json');
        setVendors(response.data);
        
        // Extract unique districts for AP and TG
        const apDistricts = [...new Set(
          response.data.flatMap(vendor => vendor.ap_districts || [])
        )];
        
        const tgDistricts = [...new Set(
          response.data.flatMap(vendor => vendor.tg_districts || [])
        )];

        // Combine districts and sort alphabetically
        const allDistricts = {
          ap: apDistricts.sort(),
          tg: tgDistricts.sort()
        };
        
        setDistricts(allDistricts);
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

  const StateSelector = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
    background-color: ${props => props.theme.colors.light};
    padding: 1rem;
    border-radius: 8px;
  `;
  
  const StateButton = styled.button`
    background-color: ${props => props.active ? props.theme.colors.primary : 'white'};
    color: ${props => props.active ? 'white' : props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
    padding: 0.5rem 2rem;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-size: ${props => props.theme.fontSizes.medium};
    
    &:hover {
      background-color: ${props => !props.active && props.theme.colors.light};
    }
  `;

  const BothStatesMessage = styled.div`
    background-color: ${props => props.theme.colors.info};
    color: white;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  
  const BothStatesCount = styled.span`
    background-color: white;
    color: ${props => props.theme.colors.info};
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-left: 1rem;
  `;

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
