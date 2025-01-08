import {User} from "@/types/models/user.ts";

export interface Comment {
    id: number;
    date: string;
    user: Pick<User, 'nickname' | 'profile'>;
}