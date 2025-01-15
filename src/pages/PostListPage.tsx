import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import PostList from "@/components/PostList.tsx";
import {theme} from "@/styles/theme.ts";
import uploadPostButton from "@/assets/images/icon-upload-post.svg"
import {useNavigate} from "react-router-dom";
import PostDetailPage from "@/pages/PostDetailPage.tsx";
import {GetPosts, Post} from '@/types/models/post.ts'
import {login} from "@/api/auth.ts";
import {getPosts} from "@/api/post.ts";
import * as timers from "node:timers";
import {useInfiniteScroll} from "@/hooks/infiniteScroll.ts";

const PostListPage: React.FC = () => {
    const navigate = useNavigate();
    // const [posts, setPosts] = useState<GetPosts[]>([]);

    const fetchPosts = useCallback(async (page: number) => {
        const response = await getPosts({
            page,
            limit: 10
        });

        return {
            data: response.posts,
            hasMore: response.hasMore
        };
    }, []);


    const {
        data: posts, isLoading, hasMore, observerRef
    } = useInfiniteScroll({
        fetchData: fetchPosts
    });

    const handlePostButton = async () => {
        navigate("/posts/create");
    }

    const handlePostDetail = async (postId: number) => {
        navigate(`/posts/${postId}`);
    }

    return (
        <Container>
            <PostListPageContainer>
                <UploadContainer>
                    <UploadTitle>안녕하세요! 잡담은 경쟁력 게시판입니다!</UploadTitle>
                    <UploadButton onClick={handlePostButton}>
                        <img src={uploadPostButton}/>
                    </UploadButton>
                </UploadContainer>
                {/*<PostList/>*/}
                {posts.map(post => (
                    <PostList
                        key={post.id}
                        post={post}
                        onClick={() => handlePostDetail(post.id)}
                    />
                ))}
                <ObserverTarget ref={observerRef} />
                {isLoading && <LoadingSpinner>Loading...</LoadingSpinner>}
            </PostListPageContainer>
        </Container>
    );
};
export default PostListPage;

const Container = styled.main`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
`

const PostListPageContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: center;
    //max-width: 35rem;
    
    @media (max-width: 640px) {
        width: 80%;
    }
`

const UploadContainer = styled.main`
    max-width: 32rem;
    width: calc(100% + 2rem);
    display: flex;
    flex-direction: row;
    padding: 0.5rem 1rem;
    margin: 0 0 0.5rem 0;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: ${theme.colors.white};

    @media (max-width: 640px) {
        margin: 0.5rem 0;
    }
`

const UploadTitle = styled.span`
    font-family: ${theme.font.regular};
    color: ${theme.colors.gray5};
    margin-right: auto;
`

const UploadButton = styled.button`
    width: 2.5rem;
    height: 2.5rem;
    background: none;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    transition: all 0.3s ease; // 모든 변화에 애니메이션 적용

    &:hover {
        transform: translateY(-0.15rem);
    }
`

const ObserverTarget = styled.div`
    width: 100%;
    height: 10px;
    margin-top: 10px;
`;


const LoadingSpinner = styled.div`
    text-align: center;
    padding: 20px 0;
    color: ${theme.colors.gray5};
    animation: pulse 1.5s ease-in-out infinite;
    
    @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
    }
`;