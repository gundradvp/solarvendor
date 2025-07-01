import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSun } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${props => props.theme.fontSizes.xlarge};
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const StyledNav = styled.nav`
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: space-between;
  }
`;

const NavItem = styled.li`
  a {
    color: ${props => props.theme.colors.text};
    transition: color 0.2s;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <FaSun size={24} />
          <span>AP & TG Solar Vendors</span>
        </Logo>
        <StyledNav>
          <NavList>
            <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/#statewide">Statewide Vendors</Link>
            </NavItem>
            <NavItem>
              <Link to="/#both-states">Cross-State Vendors</Link>
            </NavItem>
          </NavList>
        </StyledNav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
