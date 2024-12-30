// src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import {COLORS} from "./colors";

export const GlobalStyle = createGlobalStyle`
    :root {
        // --header-height: ${theme.sizes.headerHeight};
    }

    html {
        font-size: 62.5%;
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        // 스크롤 시 배경 고정
        background: linear-gradient(
                135deg,
                ${COLORS.pastel.skyBlue} 0%,
                ${COLORS.pastel.greyPurple} 70%,
                ${COLORS.pastel.lavender} 80%,
                ${COLORS.pastel.paleBlue} 100%
        ) fixed;
        background-size: cover;
    }


    body {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
        margin: 0;
    }

    .wrap {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
`;