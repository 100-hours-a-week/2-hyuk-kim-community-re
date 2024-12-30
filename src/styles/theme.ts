import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
    colors: {



        white: '#fff',
        black: '#000',
        purple: '#aca0eb',
        red: '#ff0000',
        paleBlue: '#EDECF7',    // 연한 파스텔 블루
        paleBluePastel: '#F7F6FB',
        lavender: '#DCBBE3',    // 라벤더
        lavenderPastel: '#F5E6F7',
        greyPurple: '#B3B0D1',  // 회보라
        greyPurplePastel: '#E7E2E8',
        coolGrey: '#9B9DA9',    // 차가운 회색
        coolGreyPastel: '#D8D9E0',
        navy: '#464599',
        navyPastel: '#C8C8E6',
        skyBlue: '#B9D6F8',     // 하늘색
        skyBluePastel: '#D4E5FA',
        warmGrey: '#908983',    // 따뜻한 회색
        warmGreyPastel: '#D6D4D2',
        darkGrey: '#36373F',    // 어두운 회색
        darkGreyPastel: '#C5C5C8',
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
