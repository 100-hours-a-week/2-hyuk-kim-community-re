import {Comment} from "./comment.ts";
import {User} from "@/types/models/user.ts";

export interface Post {
    id: number;
    title: string;
    content: string;
    countLike: number;
    isLiked: boolean;
    image: string;
    countView: number;
    createat: string;
    user: Pick<User, 'nickname' | 'profile'>;
    commentList: Comment[];
    isMyPost: boolean;
}

export interface GetPostsResponse {
    posts: GetPosts[];
    totalCount: number;
    hasMore: boolean;
}
export interface GetPosts {
    post: Omit<Post, 'commentList'>;
    countComments: number;
}

export interface CreatePostRequest {
    post: Pick<Post, 'title' | 'content'>;
    image?: File;
}

export interface UpdatePostRequest {
    post: Pick<Post, 'id' | 'title' | 'content'>;
    image?: File | string;
}
