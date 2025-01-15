export const API_ENDPOINTS = {
    LOGIN: 'api/auth/login',
    SIGNUP: 'api/users/signup',

    GET_PROFILE: 'api/users/:userId/profile',
    UPDATE_USER: 'api/users/profile',
    UPDATE_PASSWORD: 'api/users/password',

    GET_POSTS: 'api/posts',
    GET_POST: 'api/posts/:postId',
    GET_POST_EDIT: '/apiposts/:postId/edit',
    POST_POST: 'api/posts',
    PATCH_POST: 'api/posts/:postId',
    DELETE_POST: 'api/posts/:postId',

    POST_COMMENT: 'api/comments',
    PATCH_COMMENT: 'api/comments/:commentId',
    DELETE_COMMENT: 'api/comments/:commentId',

    POST_LIKE: 'api/posts/like/:postId',
    POST_UNLIKE: 'api/posts/unlike/:postId',
} as const;