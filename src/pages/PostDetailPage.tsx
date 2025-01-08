import React, { useEffect, useState } from "react";
import styled from "styled-components";
import like from "@/assets/images/Like.svg";
import comment from "@/assets/images/Comment.svg";
import iconUser from "@/assets/images/icon-user.svg";
import logo from "@/assets/images/Logo.png";
import PostListPage from "@/pages/PostListPage.tsx";
import {theme} from "@/styles/theme.ts";
import {Post} from "@/types/models/post.ts";
import PostList from "@/components/PostList.tsx";

interface PostDetailProps {
    postId: number;
    onClick: () => void;
}

const PostDetailPage: React.FC<PostDetailProps> = ({postId, onClose}) => {
    const [post, setPost] = useState<Post | null>(null);
    const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

    useEffect(() => {
        // 팝업이 열릴 때 body 스크롤 막기
        document.body.style.overflow = 'hidden';

        // 컴포넌트가 언마운트될 때(팝업이 닫힐 때) body 스크롤 복구
        return () => {
            document.body.style.overflow = 'unset';
        };

        const fetchPostDetail = async () => {
            try {
                console.log(`게시글 상세페이지 오픈!! PostId: ${postId}`);
                // const response = await fetch(`/api/posts/${postId}`);
                // const data = await response.json();
                // setPost(data);
            } catch (error) {
                console.error('Failed to fetch post detail:', error);
            }
        };

        fetchPostDetail();
    }, [postId]);

    return (
        <Container onClick={onClose}>
            <PostListContainer onClick={e => e.stopPropagation()}>
            {/*    프로필사진 이름 작성일*/}
            {/*    row로 정렬하기!*/}
                <UserContainer>
                    <ProfileImage src={iconUser}/>
                    <UserContent>
                        <UserNickname>닉네임</UserNickname>
                        <PostDate>0000.00.00 00:00</PostDate>
                    </UserContent>
                </UserContainer>
            {/*    이미지*/}
                <ImageContainer src={logo}/>
            {/*    제목 및 내용(1줄)*/}
                <PostContainer>
            {/*    좋아요 댓글 등 ~*/}
                    <PostMetaDataContent>
                        <LikeImg src={like as string} alt="" />
                    <LikeCount> 0</LikeCount>
                        <CommentImg src={comment as string} alt="" />
                    <CommentCount> 0</CommentCount>
                    </PostMetaDataContent>
                    {/*    제목*/}
                    <PostTitle>제목</PostTitle>
            {/*    내용*/}
                    <PostContent>내용</PostContent>
            {/*    댓글*/}
            {/*        <CommentContent>댓글 1개 보기...</CommentContent>*/}
                </PostContainer>
            </PostListContainer>
            <CommentListContainer>
                {/*{post.commentList.map(comment => (*/}
                {/*    <CommentList*/}
                {/*        // key={comment.id}*/}
                {/*        comment={comment}*/}
                {/*        // onClick={() => setSelectedCommentId(comment.id)}*/}
                {/*        onClick={() => setSelectedCommentId(1)}*/}
                {/*    />*/}
                {/*))}*/}
            </CommentListContainer>
        </Container>
    );
};

export default PostDetailPage;

export const Container = styled.dialog`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
    border: none;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    
    @media (max-width: 640px) {
        flex-direction: column;
    }
`
export const PostListContainer = styled.div`
    width: 90%;
    max-width: 30rem;
    max-height: 90vh;
    border-radius: 10px;
    padding: 20px;
    background-color: ${theme.colors.white};
    overflow-y: auto;
`
export const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    //margin-top: 1rem;
`
export const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    max-width: 2.5rem;
    max-height: 2.5rem;
    margin-right: 1rem;
`

export const UserContent = styled.div`
    display: flex;
    flex-direction: column;
`
export const UserNickname = styled.span`
    font-family: ${theme.font.bold};
`
export const PostDate = styled.span`
    font-family: ${theme.font.light};
    color: ${theme.colors.gray5};
`

export const ImageContainer = styled.img`
    //width: 100%;
    //height: 100%;
    max-width: 28rem;
    max-height: 28rem;
    object-fit: cover;
    padding: 1rem;
    margin: 1rem 0;
`

export const PostContainer = styled.div``
export const PostMetaDataContent = styled.div`
    display: flex;
    justify-content: start;
    align-items: end;
`
export const LikeImg = styled.img`
    width: 100%;
    height: 100%;
    max-width: 2.5rem;
    max-height: 2.5rem;
`
export const CommentImg = styled.img`
    width: 100%;
    height: 100%;
    max-width: 2.5rem;
    max-height: 2.5rem;
`
export const LikeCount = styled.span`
    font-family: ${theme.font.bold};
    margin-right: 0.5rem;
`
export const CommentCount = styled.span`
    font-family: ${theme.font.bold};
    margin-right: 0.5rem;
`
export const PostTitle = styled.p`
    font-size: 1.5rem;
    font-family: ${theme.font.bold};
    margin: 1rem 0 1rem 0.5rem;
`
export const PostContent = styled.p`
    margin-left: 0.5rem;
`
export const CommentContent = styled.p`
    font-family: ${theme.font.light};
    color: ${theme.colors.gray5};
    margin-left: 0.5rem;
`

export const CommentListContainer = styled.div`
    display: flex;
    flex-direction: column;
`

