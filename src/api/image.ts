import { API_ENDPOINTS } from "@/constants/api";
import { PresignedUrlRequest, PresignedUrlResponse } from "@/types/models/image";
import instance from "./axios";

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

/*
 axios 설정시 자동으로 JSON 파싱을 하기 때문에 에러가 남!
 => 반환값이 비어있는 경우는 이 기능 뿐이기 때문에 여기서는 fetch 사용!!
 => 추후에 기능이 많아지면 fetch 대신 axios 기본 설정 바꾸는 거 고려!
 */
export const uploadImageToS3 = async (presignedUrl: string, file: File) => {
    try {
        console.log('upload image to s3 start');

        const response = await fetch(presignedUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type
            }
        });

        if (response.status === 200) {
            console.log('upload image to s3 end');
            return true;
        }

        throw new Error(`Upload failed with status: ${response.status}`);
    } catch (error: any) {
        console.error('Upload error:', error);
        throw error;
    }
};

export const uploadImage = async (file: File, type: string) => {
    try {
        // 1. Presigned URL 받아오기
        const { preSignedUrl, imageUrl } = await getPresignedUrl({
            fileType: file.type,
            type
        });

        console.log(`preSignedUrl : ${preSignedUrl}`);
        console.log(`imageUrl : ${imageUrl}`);

        // 2. S3에 이미지 업로드
        await uploadImageToS3(preSignedUrl, file);

        return imageUrl;
    } catch (error) {
        throw error;
    }
};