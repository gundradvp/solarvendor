import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './App.css';

// Import components
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import DistrictPage from './pages/DistrictPage.jsx';
import VendorDetailPage from './pages/VendorDetailPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import GlobalStyle from './styles/GlobalStyle';

// Define theme
const theme = {
  colors: {
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    background: '#f4f7f9',
    text: '#333333',
  },
  fontSizes: {
    small: '0.8rem',
    medium: '1rem',
    large: '1.2rem',
    xlarge: '1.5rem',
    xxlarge: '2rem',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    wide: '1200px',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/district/:districtId" element={<DistrictPage />} />
          <Route path="/vendor/:vendorId" element={<VendorDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;