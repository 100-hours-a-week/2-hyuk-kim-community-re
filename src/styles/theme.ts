// src/styles/theme.ts
export const theme = {
    colors: {
        purple: '#aca0eb',
        red: '#ff0000',
        white: '#ffffff',
        background: '#f4f5f7'
    },
    sizes: {
        headerHeight: '104px'
    },
    fontSize: {
        base: '1.6rem',
        small: '1.2rem'
    }
} as const;

// 테마에 대한 타입 생성
export type Theme = typeof theme;