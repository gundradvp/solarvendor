import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.light};
  padding: 1.5rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
  
  p {
    margin-bottom: 0.5rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <p>© {new Date().getFullYear()} AP & TG Solar Vendors Directory</p>
        <p>A comprehensive directory of solar vendors across districts of Andhra Pradesh and Telangana</p>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
