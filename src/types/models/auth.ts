import {User} from "@/types/models/user.ts";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
}

export interface SignupRequest {
    email: string;
    password: string;
    nickname: string;
    image: File;
}

