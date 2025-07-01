import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
  }

  html, body {
    height: 100%;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
  }

  /* Responsive font size */
  html {
    font-size: 16px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    html {
      font-size: 14px;
    }
  }

  /* For better mobile UX */
  input, select, textarea, button {
    font-family: inherit;
    font-size: inherit;
  }
`;

export default GlobalStyle;
