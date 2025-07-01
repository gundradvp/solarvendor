import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Icon = styled.div`
  color: ${props => props.theme.colors.warning};
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxlarge};
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 2rem;
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0b5ed7;
    color: white;
  }
`;

const NotFoundPage = () => {
  return (
    <Container>
      <Icon>
        <FaExclamationTriangle />
      </Icon>
      <Title>Page Not Found</Title>
      <Message>
        Sorry, the page you are looking for doesn't exist or has been moved.
      </Message>
      <HomeButton to="/">
        <FaHome /> Return to Home
      </HomeButton>
    </Container>
  );
};

export default NotFoundPage;