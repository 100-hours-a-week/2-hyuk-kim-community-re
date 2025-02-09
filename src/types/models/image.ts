export interface PresignedUrlRequest {
    fileType: string;
    type: string;
}

export interface PresignedUrlResponse {
    presignedUrl: string;
    imageUrl: string;
    key: string;
}