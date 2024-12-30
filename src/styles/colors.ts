export const COLORS = {
    // 원본 색상 (reference)
    original: {
        white: '#fff',
        black: '#000',
        paleBlue: '#EDECF7',    // 연한 파스텔 블루
        lavender: '#DCBBE3',    // 라벤더
        skyBlue: '#B9D6F8',     // 하늘색
        greyPurple: '#B3B0D1',  // 회보라
        warmGrey: '#908983',    // 따뜻한 회색
        coolGrey: '#9B9DA9',    // 차가운 회색
        darkGrey: '#36373F',    // 어두운 회색
        navy: '#464599',        // 네이비
    },

    // 파스텔톤으로 변환된 색상
    pastel: {
        paleBlue: '#F7F6FB',
        lavender: '#F5E6F7',
        skyBlue: '#D4E5FA',
        greyPurple: '#E7E2E8',
        warmGrey: '#D6D4D2',
        coolGrey: '#D8D9E0',
        darkGrey: '#C5C5C8',
        navy: '#C8C8E6',
    },

} as const;