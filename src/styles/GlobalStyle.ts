// src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  :root {
    --header-height: ${theme.sizes.headerHeight};
  }

  html {
    font-size: 62.5%;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${theme.colors.background};
  }

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: ${theme.fontSize.base};
    height: 100%;
    width: 100%;
    margin: 0;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .helper-text {
    color: ${theme.colors.red};
    font-size: ${theme.fontSize.small};
    font-weight: 400;
    text-align: left;
    margin-top: 0.4rem;
    visibility: hidden;
  }

  .button-purple {
    background: ${theme.colors.purple};
    text-align: center;
    color: ${theme.colors.white};
    font-weight: bold;
    border: none;
  }
`;