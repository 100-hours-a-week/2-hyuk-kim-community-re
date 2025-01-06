export const API_ENDPOINTS = {
    LOGIN: 'api/auth/login',
    SIGNUP: 'api/users/signup',

    GET_PROFILE: 'api/users/:userId/profile',
    UPDATE_USER: 'api/users/profile',
    UPDATE_PASSWORD: 'api/users/:userId/password',
} as const;