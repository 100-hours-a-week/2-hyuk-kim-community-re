import axios from './axios';
import { STORAGE_KEYS } from "@/constants/storage.ts";
import { API_ENDPOINTS } from "@/constants/api.ts";
import {GetProfileResponse, UpdateUserInfoRequest, UpdateUserInfoResponse} from "@/types/models/user.ts";


export const updateUser = async (data: UpdateUserInfoRequest) => {
    try {
        // FormData 생성
        const formData = new FormData();
        formData.append('nickname', data.nickname);
        formData.append('image', data.image);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const response = await axios.patch<UpdateUserInfoResponse>(API_ENDPOINTS.UPDATE_USER, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.data.profile) {
            sessionStorage.setItem(STORAGE_KEYS.USER_PROFILE_IMAGE, response.data.profile ?? "");
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getProfile = async () => {
    try {
        const url = API_ENDPOINTS.GET_PROFILE.replace(":userId", sessionStorage.getItem(STORAGE_KEYS.USER_ID) as string);
        const response = await axios.get<GetProfileResponse>(url);
        return response.data;
    }catch (error) {
        // handleError(error);
        throw error;
    }
}