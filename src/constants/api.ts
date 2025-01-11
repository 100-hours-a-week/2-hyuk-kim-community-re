export const API_ENDPOINTS = {
    LOGIN: 'api/auth/login',
    SIGNUP: 'api/users/signup',

    GET_PROFILE: 'api/users/:userId/profile',
    UPDATE_USER: 'api/users/profile',
    UPDATE_PASSWORD: 'api/users/password',

    GET_POSTS: 'api/posts',
    GET_POST: '/posts/:postId',
    GET_POST_EDIT: '/posts/:postId/edit',
    POST_POST: 'api/posts',
    PATCH_POST: '/posts/:postId',
    DELETE_POST: '/posts/:postId',

    POST_COMMENT: 'api/comments',
    PATCH_COMMENT: '/comments/:commentId',
    DELETE_COMMENT: '/comments/:commentId',
} as const;