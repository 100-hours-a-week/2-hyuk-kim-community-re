export interface User {
    userId: number;
    nickname: string;
    email: string;
    profile: string;
}

export interface GetProfileResponse {
    email: string;
    nickname: string;
}

export interface UpdateUserInfoRequest {
    nickname: string;
    image: File | string;
}

export interface UpdateUserInfoResponse {
    profile: string;
}

export interface UpdatePasswordRequest {
    userId: number;
    password: string;
}

export interface UpdatePasswordResponse {
    result: number;
}