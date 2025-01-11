import React, { useEffect, useState } from "react";
import styled from "styled-components";
import like from "@/assets/images/Like.svg";
import comment from "@/assets/images/Comment.svg";
import iconUser from "@/assets/images/icon-user.svg";
import logo from "@/assets/images/Logo.png";
import PostListPage from "@/pages/PostListPage.tsx";
import {theme} from "@/styles/theme.ts";
import {GetPosts, Post} from "@/types/models/post.ts";

interface PostListProps {
    post: GetPosts;
    onClick: () => void;
}

const PostList: React.FC<PostListProps> = ({post, onClick}) => {
    console.log("post: ", post);
    console.log("postpost: ", post.post);
    console.log("user: ", post.user);

    return (
        <Container onClick={onClick}>
                <UserContainer>
                    <UserContent>
                        <ProfileImage src={post.user.profile}/>
                        <UserNickname>{post.user.nickname}</UserNickname>
                    </UserContent>
                </UserContainer>
            <PostListContainer>
                {/*    프로필사진 이름 작성일*/}
                {/*    row로 정렬하기!*/}
                {/*    이미지*/}

                <BoardContainer>
                    {post.image &&
                        <ImageContainer src={post.image} alt="게시글이미지"/>
                    }
                    {/*    제목 및 내용(1줄)*/}
                    <PostContainer>
                        {/*    제목*/}
                        <PostTitle>{post.title}</PostTitle>
                        {/*    내용*/}
                        <PostContent>{post.content}</PostContent>
                        {/*    댓글*/}
                        {/*        <CommentContent>댓글 1개 보기...</CommentContent>*/}
                    </PostContainer>
                </BoardContainer>
                {/*<DivisionLine />*/}

                {/*    좋아요 댓글 등 ~*/}
                <PostMetaDataContent>
                    {/*<PostDate>${post.date}</PostDate>*/}
                    <PostDate>7시간전</PostDate>
                    <LikeImg src={like as string} alt=""/>
                    <LikeCount> {post.countLike}</LikeCount>
                    <CommentImg src={comment as string} alt=""/>
                    <CommentCount> {post.countComments}</CommentCount>
                </PostMetaDataContent>

            </PostListContainer>
        </Container>
    );
};

export default PostList;

export const Container = styled.main`
    max-width: 33rem;
    width: calc(100% - 4rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0.3rem 0;
    border-radius: 8px;
    padding: 1rem 0.5rem;
    background: ${theme.colors.white};
    transition: all 0.3s ease; // 모든 변화에 애니메이션 적용
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: translateY(-0.25rem);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`
export const PostListContainer = styled.div`
    //margin: 0;
    //width: calc(100% - 4rem);
    width: 100%;
    //padding: 1rem 2rem;
    //border-radius: 0px 15px 15px 15px;



`
export const UserContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    //margin-top: 1.5rem;
    margin-bottom: 0.75rem;
`

export const UserContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    
`
export const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 2rem;
    max-height: 2rem;
    margin-right: 0.75rem;
    margin-left: 0.3rem;
    border-radius: 50%;
`
export const UserNickname = styled.span`
    font-family: ${theme.font.regular};
    //font-size: 0.9rem;
`

export const DivisionLine = styled.hr`
    width: calc(100% + 0.5rem);
    border: none;
    border-top: 0.5px solid ${theme.colors.gray3};
    margin: 0.5rem 0;
    justify-self: center;
`
export const BoardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;

    padding: 0.5rem 1rem;
    border-radius: 5px;
    
    background-color: ${theme.colors.gray1};

    position: relative;

    // 꼬리! => 주석는 작성자용!
    &:before {
        content: '';
        position: absolute;
        top: -1rem;
        left: 0.5rem; // 꼬리 위치 조절
        //right: 0.5rem; // 꼬리 위치 조절
        width: 0;
        height: 2px;
        border-left: 0.75rem solid transparent;
        border-right: 1rem solid transparent;
        //border-right: 1rem solid transparent;
        //border-left: 3rem solid transparent;
        //border-bottom: 2rem solid white;
        border-bottom: 1rem solid ${theme.colors.gray1};
        border-bottom: 1rem solid ${theme.colors.gray1};
    }
`
export const ImageContainer = styled.img`
    width: 100%;
    height: 100%;
    max-width: 5rem;
    max-height: 5rem;
    object-fit: cover;
    margin-right: 1rem;
    //margin-top: 0.5rem;
    //margin-bottom: 0;
    border-radius: 3px;
    
`

export const PostContainer = styled.div``
export const PostMetaDataContent = styled.div`
    display: flex;
    justify-content: start;
    align-items: end;
    padding: 0.5rem 0.5rem 0 0.5rem;
`
export const PostDate = styled.span`
    font-family: ${theme.font.light};
    color: ${theme.colors.gray4};
    font-size: 0.9rem;
    margin-right: auto;
    align-self: center;
`
export const LikeImg = styled.img`
    width: 1.2rem;
    height: 1.2rem;
`
export const CommentImg = styled.img`
    width: 1.2rem;
    height: 1.2rem;
`
export const LikeCount = styled.span`
    font-family: ${theme.font.regular};
    font-size: 0.9rem;
    margin-right: 0.5rem;
`
export const CommentCount = styled.span`
    font-family: ${theme.font.regular};
    font-size: 0.9rem;
    //margin-right: 0.5rem;
`
export const PostTitle = styled.p`
    font-size: 0.9rem;
    font-family: ${theme.font.bold};
    margin: 1rem 0 1rem 0.5rem;
`
export const PostContent = styled.p`
    margin-left: 0.5rem;
    font-size: 0.9rem;
    font-family: ${theme.font.regular};
    color: ${theme.colors.gray5};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`
export const CommentContent = styled.p`
    font-family: ${theme.font.light};
    color: ${theme.colors.gray5};
    margin-left: 0.5rem;
`