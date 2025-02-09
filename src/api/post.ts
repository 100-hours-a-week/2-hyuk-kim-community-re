import {API_ENDPOINTS} from "@/constants/api.ts";
import {CreatePostRequest, GetPostsResponse, UpdatePostRequest} from "@/types/models/post.ts";
import {CreateCommentRequest} from "@/types/models/comment.ts";
import instance from "@/api/axios.ts";
import {AxiosRequestConfig} from "axios";

interface CustomConfig extends AxiosRequestConfig {
    skipLoading?: boolean;
}

export const getPosts = async (params: PaginationParams) => {
    try {
        const response = await instance.get<GetPostsResponse>(
            API_ENDPOINTS.GET_POSTS,
            {
                skipLoading: true,
                params: {
                    page: params.page,
                    limit: params.limit
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getPost = async (postId: number) => {
    try {
        const url = API_ENDPOINTS.GET_POST.replace(":postId", String(postId));
        const response = await instance.get(url);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createPost = async (params: CreatePostRequest) => {
    try {
        const response = await instance.post(API_ENDPOINTS.POST_POST, params);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export const updatePost = async (params: UpdatePostRequest) => {
    try {
        const url = API_ENDPOINTS.PATCH_POST.replace(':postId', String(params.post.id));
        const response = await instance.patch(url, params);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export const deletePost = async (postId: string) => {
    try {
        const url = API_ENDPOINTS.DELETE_POST.replace(':postId', String(postId));
        const response = await instance.delete(url);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const createComment = async (body: CreateCommentRequest) => {
    try {
        const response = await instance.post(API_ENDPOINTS.POST_COMMENT, body, {skipLoading: true});
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export const updateComment = async (commentId: number, content: string) => {
    try {
        const url = API_ENDPOINTS.PATCH_COMMENT.replace(':commentId', String(commentId));
        const response = await instance.patch(url, {content}, {skipLoading: true});
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export const deleteComment = async (commentId: string) => {
    try {
        const url = API_ENDPOINTS.DELETE_COMMENT.replace(':commentId', String(commentId));
        const response = await instance.delete(url, {}, {skipLoading: true});
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const unlikePost = async (postId: string) => {
    try {
        const url = API_ENDPOINTS.POST_UNLIKE.replace(':postId', (postId));
        const response = await instance.post(url, {}, {skipLoading: true});
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const postLike = async (postId: string) => {
    try {
        const url = API_ENDPOINTS.POST_LIKE.replace(':postId', (postId));
        const response = await instance.post(url, {},{skipLoading: true});
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}


