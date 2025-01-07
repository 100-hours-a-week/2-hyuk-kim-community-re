import axios from './axios';
import { STORAGE_KEYS } from "@/constants/storage.ts";
import { API_ENDPOINTS } from "@/constants/api.ts";
import {LoginRequest, LoginResponse, SignupRequest} from "@/types/models/auth.ts";

export const login = async (loginData: LoginRequest) => {
    try {
        const response = await axios.post<LoginResponse>(API_ENDPOINTS.LOGIN, loginData);
        sessionStorage.setItem(STORAGE_KEYS.USER_PROFILE_IMAGE, response.data.profile ?? "");
        sessionStorage.setItem(STORAGE_KEYS.USER_ID, response.data.userId ?? "");

        return response.data;
    } catch (error) {
        // handleError(error);
        throw error;
    }
};

export const signup = async (signupData: SignupRequest) => {
    try {
        // FormData 생성
        const formData = new FormData();
        formData.append('email', signupData.email);
        formData.append('password', signupData.password);
        formData.append('nickname', signupData.nickname);
        formData.append('image', signupData.image);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const response = await axios.post<number>(API_ENDPOINTS.SIGNUP, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        // handleError(error);
        throw error;
    }
};

export const updatePassword = async (password: string) => {
    try {
        const response = await axios.patch<number>(API_ENDPOINTS.UPDATE_PASSWORD, {password});
        return response.data;
    } catch (error) {
        throw error;
    }
}