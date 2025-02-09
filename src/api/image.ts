import { API_ENDPOINTS } from "@/constants/api";
import { PresignedUrlRequest, PresignedUrlResponse } from "@/types/models/image";
import instance from "./axios";

export const uploadImage = async (file: File, type: string) => {
    try {
        // Presigned URL 받아오기
        const { preSignedUrl, imageUrl } = await getPresignedUrl({
            fileType: file.type,
            type
        });

        // S3에 이미지 업로드
        await uploadImageToS3(preSignedUrl, file);

        return imageUrl;
    } catch (error) {
        throw error;
    }
};


export const getPresignedUrl = async (presignedUrlData: PresignedUrlRequest) => {
    try {
        const response = await instance.post<PresignedUrlResponse>(
            API_ENDPOINTS.GET_PRESIGNED_URL,
            presignedUrlData
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const uploadImageToS3 = async (presignedUrl: string, file: File) => {
    try {

        const response = await fetch(presignedUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type
            }
        });

        if (response.status === 200) {
            return true;
        }

        throw new Error(`Upload failed with status: ${response.status}`);
    } catch (error: any) {
        console.error('Upload error:', error);
        throw error;
    }
};