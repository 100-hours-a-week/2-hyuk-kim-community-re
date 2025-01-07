import React, { useEffect, useState } from "react";
import styled from "styled-components";
import like from "@/assets/images/Like.svg";
import comment from "@/assets/images/Comment.svg";
import iconUser from "@/assets/images/icon-user.svg";
import logo from "@/assets/images/Logo.png";
import PostListPage from "@/pages/PostListPage.tsx";
import {theme} from "@/styles/theme.ts";

const PostList: React.FC = () => {


    return (
        <Container>
            <PostListContainer>
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
        </Container>
    );
};

export default PostList;

export const Container = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    transition: all 0.3s ease; // 모든 변화에 애니메이션 적용
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: translateY(-0.25rem);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`
export const PostListContainer = styled.div`
    max-width: 30rem;
    padding: 0.5rem 2rem;
    border-radius: 10px;
    background-color: ${theme.colors.white};
`
export const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;
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