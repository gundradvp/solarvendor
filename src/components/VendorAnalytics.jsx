import React from 'react';
import styled from 'styled-components';
import { FaChartBar, FaChartPie, FaHandshake } from 'react-icons/fa';

const StatsContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const StatsTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.large};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background-color: #ddd;
    margin-left: 1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.light};
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  &.ap {
    border-left: 4px solid #0d6efd;
  }
  
  &.tg {
    border-left: 4px solid #6A0572;
  }
  
  &.both {
    border-left: 4px solid #FF6B35;
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.color || props.theme.colors.primary};
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.secondary};
`;

const VendorAnalytics = ({ vendors }) => {
  // Calculate statistics
  const apOnlyVendors = vendors.filter(v => 
    v.ap_districts && 
    v.ap_districts.length > 0 && 
    (!v.tg_districts || v.tg_districts.length === 0)
  );
  
  const tgOnlyVendors = vendors.filter(v => 
    v.tg_districts && 
    v.tg_districts.length > 0 && 
    (!v.ap_districts || v.ap_districts.length === 0)
  );
  
  const bothStatesVendors = vendors.filter(v => 
    v.ap_districts && 
    v.ap_districts.length > 0 && 
    v.tg_districts && 
    v.tg_districts.length > 0
  );
  
  const totalVendors = vendors.length;
  
  // Calculate percentages
  const apOnlyPercentage = Math.round((apOnlyVendors.length / totalVendors) * 100);
  const tgOnlyPercentage = Math.round((tgOnlyVendors.length / totalVendors) * 100);
  const bothStatesPercentage = Math.round((bothStatesVendors.length / totalVendors) * 100);
  
  return (
    <StatsContainer>
      <StatsTitle>
        <FaChartBar /> Vendor Distribution Analytics
      </StatsTitle>
      
      <StatsGrid>
        <StatCard className="ap">
          <StatIcon color="#0d6efd">
            <FaChartPie />
          </StatIcon>
          <StatValue>{apOnlyVendors.length}</StatValue>
          <StatLabel>Andhra Pradesh Only ({apOnlyPercentage}%)</StatLabel>
        </StatCard>
        
        <StatCard className="tg">
          <StatIcon color="#6A0572">
            <FaChartPie />
          </StatIcon>
          <StatValue>{tgOnlyVendors.length}</StatValue>
          <StatLabel>Telangana Only ({tgOnlyPercentage}%)</StatLabel>
        </StatCard>
        
        <StatCard className="both">
          <StatIcon color="#FF6B35">
            <FaHandshake />
          </StatIcon>
          <StatValue>{bothStatesVendors.length}</StatValue>
          <StatLabel>Both States ({bothStatesPercentage}%)</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <FaChartBar />
          </StatIcon>
          <StatValue>{totalVendors}</StatValue>
          <StatLabel>Total Vendors</StatLabel>
        </StatCard>
      </StatsGrid>
    </StatsContainer>
  );
};

export default VendorAnalytics;