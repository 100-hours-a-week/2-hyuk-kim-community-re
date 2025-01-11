import axios from "@/api/axios.ts";
import {API_ENDPOINTS} from "@/constants/api.ts";
import {CreatePostRequest, GetPostsResponse} from "@/types/models/post.ts";

export const getPosts = async (params: PaginationParams) => {
    try {
        const response = await axios.get<GetPostsResponse>(
            API_ENDPOINTS.GET_POSTS,
            {
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

export const createPost = async (params: CreatePostRequest) => {
    try {
        const response = await axios.post(API_ENDPOINTS.POST_POST, params);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}