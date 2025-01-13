import {User} from "@/types/models/user.ts";

export interface Comment {
    id: number;
    date: string;
    content: string;
    user: Pick<User, 'nickname' | 'profile'>;
    isAuthorComments: boolean;
    isMyComment: boolean;
}