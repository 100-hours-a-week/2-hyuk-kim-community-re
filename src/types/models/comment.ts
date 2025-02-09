import {User} from "@/types/models/user.ts";

export interface Comment {
    id: number;
    date: string;
    content: string;
    user: Pick<User, 'nickname' | 'profile' | 'deleteat'>;
    isAuthorComments: boolean;
    isMyComment: boolean;
}

export interface CreateCommentRequest {
    postId: number;
    content: string;
}