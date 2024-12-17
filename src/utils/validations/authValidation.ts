import {ValidationResult} from "./validationTypes";

/**
 * 이메일 유효성 검사
 * @param email 검사할 이메일 주소
 * @returns ValidationResult
 */
export const validateEmail = (email: string): ValidationResult => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(email)) {
        return {
            isValid: true
        };
    }

    return {
        isValid: false,
        errorMessage: '*올바른 이메일 주소 형식을 입력해주세요 (예: example@example.com)'
    };
};

/**
 * 비밀번호 유효성 검사
 * @param password 검사할 비밀번호
 * @returns ValidationResult
 */
export const validatePassword = (password: string): ValidationResult => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?~-]).{8,20}$/;

    if (password.length === 0) {
        return {
            isValid: false,
            errorMessage: '*비밀번호를 입력해주세요'
        };
    }

    if (passwordRegex.test(password)) {
        return {
            isValid: true
        };
    }

    return {
        isValid: false,
        errorMessage: '*비밀번호가 다릅니다.'
    };
};
