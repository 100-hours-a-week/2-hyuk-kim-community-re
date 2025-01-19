// 문자열이 유효한 내용을 포함하고 있는지 확인합니다
export const hasValidContent = (text: string): boolean => {
    return !/^\s*$/.test(text);
};