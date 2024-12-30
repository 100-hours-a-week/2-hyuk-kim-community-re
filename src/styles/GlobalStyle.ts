// src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
    :root {
         --header-height: ${theme.sizes.headerHeight};
    }
    
    #root {
        width: 100%;
    }
    
    #app {
        width: 100%;
    }

    html {
        font-size: 62.5%;
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-size: cover;
        background: ${theme.colors.background};
    }


    body {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        background: ${theme.colors.activeBlue};   
    }

    .wrap {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
`;