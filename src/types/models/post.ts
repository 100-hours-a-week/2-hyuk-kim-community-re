import {Comment} from "./comment.ts";
import {User} from "@/types/models/user.ts";

export interface Post {
    id: number;
    title: string;
    content: string;
    countLike: number;
    image: string;
    user: Pick<User, 'nickname' | 'profile'>;
    commentList: Comment[];
}