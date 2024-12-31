import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {

            // Primary Colors (Sea Green)
            seaGreenBG: string;
            seaGreenLight: string;
            seaGreenDark1: string;
            seaGreenDark2: string;
            seaGreenDark3: string;

            // Gray Scale
            white: string;
            gray1: string;
            gray2: string;
            gray3: string;
            gray4: string;
            gray5: string;
            gray6: string;
            black: string;

            // Active Colors
            activeBlue: string;
            activeRed: string;

            // before primary Colors
            background: string;
        };
        media: {
            large_tablet: string;
            tablet: string;
            mobile: string;
            small_mobile: string;
        };
        mediaSize: {
            large_tablet: number;
            tablet: number;
            mobile: number;
            small_mobile: number;
        };
        sizes: {
            headerHeight: string;
        };
        font: {
            thin: string;
            light: string;
            regular: string;
            medium: string;
            semiBold: string;
            bold: string;
        };
    }
}