import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
    // ${theme.}
    colors: {
        // Primary Colors (Sea Green)
        seaGreenBG: '#F3F6F6',     // RGB(232, 232, 232)
        seaGreenLight: '#00FFC0',   // RGB(0, 255, 192)
        seaGreenDark1: '#00C596',   // RGB(0, 197, 150)
        seaGreenDark2: '#00C596',   // RGB(0, 177, 135)
        seaGreenDark3: '#009773',   // RGB(0, 151, 115)

        // Gray Scale
        gray1: '#F4F4F4',          // RGB(244, 244, 244)
        gray2: '#E0E0E0',          // RGB(244, 244, 244)
        gray3: '#C8C8C8',          // RGB(200, 200, 200)
        gray4: '#A0A0A0',          // RGB(160, 160, 160)
        gray5: '#787878',          // RGB(120, 120, 120)
        gray6: '#404040',          // RGB(64, 64, 64)

        // Active Colors
        activeBlue: '#00AAD2',     // RGB(0, 170, 210)
        activeRed: '#E63312',      // RGB(230, 51, 18)

        white: '#fff',
        black: '#000',
    },

    media: {
        large_tablet: 'only screen and (max-width: 1280px)',
        tablet: 'only screen and (max-width:1024px)',
        mobile: 'only screen and (max-width: 767px)',
        small_mobile: 'only screen and (max-width: 320px)',
    },
    mediaSize: {
        large_tablet: 1280,
        tablet: 1024,
        mobile: 767,
        small_mobile: 320,
    },

    sizes: {
        headerHeight: '52rem'
    },

    font: {
        thin: 'pretendard-thin',
        light: 'pretendard-light',
        regular: 'pretendard-regular',
        medium: 'pretendard-medium',
        semiBold: 'pretendard-semiBold',
        bold: 'pretendard-bold',
    },

}
