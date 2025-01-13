import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PostList from "@/components/PostList.tsx";
import {theme} from "@/styles/theme.ts";
import uploadPostButton from "@/assets/images/icon-upload-post.svg"
import {useNavigate} from "react-router-dom";
import PostDetailPage from "@/pages/PostDetailPage.tsx";
import {GetPosts, Post} from '@/types/models/post.ts'
import {login} from "@/api/auth.ts";
import {getPosts} from "@/api/post.ts";

const PostListPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const POSTS_PER_PAGE = 10;

    const [posts, setPosts] = useState<GetPosts[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPosts({
                    page: currentPage,
                    limit: POSTS_PER_PAGE
                });

                if (currentPage === 1) {
                    setPosts(response.posts);
                } else {
                    setPosts(prev => [...prev, ...response.posts]); // 인수 타입 (prev: any) => (PostList | GetPosts)[] 을(를) 매개변수 타입 ((prevState: PostList[]) => PostList[]) | PostList[] 에 할당할 수 없습니다
                }
                setHasMore(response.hasMore);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        fetchPosts();
    }, [currentPage]);

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
                {/*{selectedPostId && (*/}
                {/*    <PostDetailPage*/}
                {/*        postId={selectedPostId}*/}
                {/*        onClose={() => setSelectedPostId(null)}*/}
                {/*    />*/}
                {/*)}*/}
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