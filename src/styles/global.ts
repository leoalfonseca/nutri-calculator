import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 0;
    outline: 0;
  }

  html, body, #root {
    width: 100vw;
    height: 100vh;
  }

  body {
    background-color: #fafafa;
    font-size: 15px;
    font-family: Raleway;
  }
`;

export default GlobalStyles;
