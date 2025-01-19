import axios from "@/api/axios.ts";
import {API_ENDPOINTS} from "@/constants/api.ts";
import {CreatePostRequest, GetPostsResponse, UpdatePostRequest} from "@/types/models/post.ts";
import {UpdateCommentRequest, CreateCommentRequest} from "@/types/models/comment.ts";
import instance from "@/api/axios.ts";

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
        const response = await axios.get(url);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createPost = async (params: CreatePostRequest) => {
    try {
        const response = await axios.post(API_ENDPOINTS.POST_POST, params, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export const updatePost = async (params: UpdatePostRequest) => {
    try {
        console.log(params);
        console.log(params.post.id);
        const url = API_ENDPOINTS.PATCH_POST.replace(':postId', String(params.post.id));
        const response = await axios.patch(url, params, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export const deletePost = async (postId: string) => {
    try {
        const url = API_ENDPOINTS.DELETE_POST.replace(':postId', String(postId));
        const response = await axios.delete(url);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const createComment = async (body: CreateCommentRequest) => {
    try {
        // const response = await axios.post(API_ENDPOINTS.POST_COMMENT, {skipLoading: true, body});
        const response = await axios.post(API_ENDPOINTS.POST_COMMENT, body);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export const updateComment = async (commentId: number, content: string) => {
    try {
        const url = API_ENDPOINTS.PATCH_COMMENT.replace(':commentId', String(commentId));
        const response = await axios.patch(url, {content});
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export const deleteComment = async (commentId: string) => {
    try {
        const url = API_ENDPOINTS.DELETE_COMMENT.replace(':commentId', String(commentId));
        const response = await axios.delete(url);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const unlikePost = async (postId: string) => {
    try {
        const url = API_ENDPOINTS.POST_UNLIKE.replace(':postId', (postId));
        const response = await axios.post(url);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const postLike = async (postId: string) => {
    try {
        const url = API_ENDPOINTS.POST_LIKE.replace(':postId', (postId));
        const response = await axios.post(url);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}


