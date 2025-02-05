import { API_ENDPOINTS } from "@/constants/api.ts";
import {GetProfileResponse, UpdateUserInfoRequest, UpdateUserInfoResponse} from "@/types/models/user.ts";
import instance from "./axios";
import useUserStore from "@/store/useUserStore.ts";


export const updateUser = async (data: UpdateUserInfoRequest) => {
    try {
        // FormData 생성
        const formData = new FormData();
        formData.append('nickname', data.nickname);
        formData.append('image', data.image);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const response = await instance.patch<UpdateUserInfoResponse>(API_ENDPOINTS.UPDATE_USER, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.data.profile) {
            useUserStore.getState().updateUser(response.data);
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async () => {
    try {
        const response = await instance.delete(API_ENDPOINTS.DELETE_USER);
        if (response) {
            useUserStore.getState().clearUser();
        }
    } catch (error) {
        throw error;
    }
}


export const getProfile = async () => {
    try {

        // const url = API_ENDPOINTS.GET_PROFILE.replace(":userId", useUserStore.getState().user?.userId as string);
        // const response = await axios.get<GetProfileResponse>(url);
        const response = await instance.get<GetProfileResponse>(API_ENDPOINTS.GET_PROFILE);
        return response.data;
    }catch (error) {
        // handleError(error);
        throw error;
    }
}