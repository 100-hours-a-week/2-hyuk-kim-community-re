import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PostList from "@/components/PostList.tsx";
import {theme} from "@/styles/theme.ts";
import uploadPostButton from "@/assets/images/icon-upload-post.svg"
import {useNavigate} from "react-router-dom";
import PostDetailPage from "@/pages/PostDetailPage.tsx";
import {Post} from '@/types/models/post.ts'

const PostListPage: React.FC = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // 또는 여러 게시글 데이터
                setPosts([
                    {
                        id: 1,
                        title: '첫번째 게시글입니다',
                        content: '안녕하세요! 첫 번째 게시글의 내용입니다. 오늘 날씨가 정말 좋네요.',
                        countLike: 15,
                        image: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg',
                        user: {
                            nickname: '행복한하루',
                            profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                        },
                        commentList: [
                            {
                                user: {
                                    nickname: '사용자1',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 13:20'
                            },
                            {
                                user: {
                                    nickname: '댓글러2',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 13:25'
                            },
                            {
                                user: {
                                    nickname: '행복한하루',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 13:30'
                            },
                            {
                                user: {
                                    nickname: '구름나그네',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 13:35'
                            },
                            {
                                user: {
                                    nickname: '바람돌이',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 13:40'
                            },
                            {
                                user: {
                                    nickname: '달빛산책',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 13:45'
                            },
                            {
                                user: {
                                    nickname: '별님달님',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 13:50'
                            },
                            {
                                user: {
                                    nickname: '해피데이',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 13:55'
                            },
                            {
                                user: {
                                    nickname: '꿈나무',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 14:00'
                            },
                            {
                                user: {
                                    nickname: '햇살가득',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 14:05'
                            }
                        ]
                    },
                    {
                        id: 2,
                        title: '오늘의 맛집 추천',
                        content: '맛있는 음식점을 소개합니다. 가성비도 좋고 분위기도 좋아요!',
                        countLike: 23,
                        image: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg',
                        user: {
                            nickname: '맛집탐험가',
                            profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                        },
                        commentList: [
                            {
                                user: {
                                    nickname: '맛집탐험가',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 15:10'
                            },
                            {
                                user: {
                                    nickname: '미식가',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 15:15'
                            },
                            {
                                user: {
                                    nickname: '푸드러버',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 15:20'
                            },
                            {
                                user: {
                                    nickname: '맛있는인생',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 15:25'
                            },
                            {
                                user: {
                                    nickname: '먹방여신',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 15:30'
                            },
                            {
                                user: {
                                    nickname: '디저트킹',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 15:35'
                            },
                            {
                                user: {
                                    nickname: '카페홀릭',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 15:40'
                            },
                            {
                                user: {
                                    nickname: '음식사진사',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 15:45'
                            },
                            {
                                user: {
                                    nickname: '맛집매니아',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 15:50'
                            },
                            {
                                user: {
                                    nickname: '먹방도사',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 15:55'
                            }
                        ]
                    },
                    {
                        id: 3,
                        title: '취미 공유해요',
                        content: '저의 취미는 등산입니다. 주말마다 산에 오르는게 정말 좋아요.',
                        countLike: 8,
                        image: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg',
                        user: {
                            nickname: '산사랑',
                            profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                        },
                        commentList: [
                            {
                                user: {
                                    nickname: '산사랑',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 16:10'
                            },
                            {
                                user: {
                                    nickname: '등산왕',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 16:15'
                            },
                            {
                                user: {
                                    nickname: '자연인',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 16:20'
                            },
                            {
                                user: {
                                    nickname: '트레킹맨',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 16:25'
                            },
                            {
                                user: {
                                    nickname: '산악인',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 16:30'
                            },
                            {
                                user: {
                                    nickname: '등린이',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 16:35'
                            },
                            {
                                user: {
                                    nickname: '산돌이',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 16:40'
                            },
                            {
                                user: {
                                    nickname: '정상정복',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 16:45'
                            },
                            {
                                user: {
                                    nickname: '산행러버',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 16:50'
                            },
                            {
                                user: {
                                    nickname: '등산스타',
                                    profile: 'https://ktb-community-storage.s3.ap-northeast-2.amazonaws.com/image/profile/b7e4ff7c-fbda-4325-ba4b-f06478996907.jpeg'
                                },
                                date: '2024.01.08 16:55'
                            }
                        ]
                    }
                ]);

                // const response = await fetch('/api/posts');
                // const data = await response.json();
                // setPosts(data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handlePostButton = async () => {
        navigate("/posts/create");
    }

    return (
        <Container>
            <PostListPageContainer>
                <UploadContainer>
                    <UploadTitle>새 게시물 추가하기...</UploadTitle>
                    <UploadButton onClick={handlePostButton}>
                        <img src={uploadPostButton}/>
                    </UploadButton>
                </UploadContainer>
                {/*<PostList/>*/}
                {posts.map(post => (
                    <PostList
                        key={post.id}
                        post={post}
                        onClick={() => setSelectedPostId(post.id)}
                    />
                ))}
                {selectedPostId && (
                    <PostDetailPage
                        postId={selectedPostId}
                        onClose={() => setSelectedPostId(null)}
                    />
                )}
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
    margin: 0;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: ${theme.colors.white};

    @media (max-width: 640px) {
        width: 100%;
    }
`

const UploadTitle = styled.span`
    font-family: ${theme.font.thin};
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