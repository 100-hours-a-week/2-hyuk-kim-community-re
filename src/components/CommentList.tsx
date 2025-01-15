import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import like from "@/assets/images/Like.svg";
import comment from "@/assets/images/Comment.svg";
import iconUser from "@/assets/images/icon-user.svg";
import logo from "@/assets/images/Logo.png";
import PostListPage from "@/pages/PostListPage.tsx";
import {theme} from "@/styles/theme.ts";
import {GetPosts, Post} from "@/types/models/post.ts";
import {DateFormatter} from "@/utils/DateFormatter.ts";
import {Comment} from "@/types/models/comment.ts";
import iconMenu from "@/assets/images/icon-menu.svg";
import {MenuButton} from "@/pages/PostDetailPage.tsx";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {deletePost} from "@/api/post.ts";
import {DeleteDialog} from "@/components/DeleteDialog.tsx";
import DropdownMenu from "@/components/DropdownMenu.tsx";

interface CommentListProps {
    key: number;
    comment: Comment;
}

const CommentList: React.FC<CommentListProps> = ({comment}) => {
    const navigate = useNavigate();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const buttonProfileRef = useRef<HTMLButtonElement>(null);    // ref 생성
    const [isLikeLoading, setIsLikeLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // 댓글 삭제 핸들러
    const handleDeleteComment = async () => {
        if (!comment.id) return;

        setIsDeleting(true);
        try {
            await deletePost(String(comment.id));
            // navigate('/posts'); // 목록으로 이동
        } catch (error) {
            console.error('Failed to delete post:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    // 메뉴 버튼 클릭
    const handleMenuClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsMenuVisible(!isMenuVisible);
    };

    const menuItems = [
        {
            label: '수정',
            onClick: () => {

                setIsMenuVisible(false);
            }
        },
        {
            label: '삭제',
            onClick: () => {
                setIsDeleteDialogOpen(true);
                setIsMenuVisible(false);
            }
        }
    ];

    const getMenuPosition = () => {
        if (!buttonProfileRef.current) return {};

        const buttonRect = buttonProfileRef.current.getBoundingClientRect();
        return {
            $top: `${buttonRect.height + 5}px`, // 8px 간격 추가
            $right: '0'
        };
    };

    return (
        <Container>
                <UserContainer>
                    <ProfileImage src={comment.user.profile}/>
                    <ContentContainer>
                        <UserContent>
                            <UserNickname>{comment.user.nickname}</UserNickname>
                            {comment.isAuthorComments ? <AuthorTag>작성자</AuthorTag> : null}
                            <PostDate>{DateFormatter.toRelativeTime(comment?.date)}</PostDate>
                            {comment?.isMyComment ?
                                <MenuButton ref={buttonProfileRef} onClick={handleMenuClick}>
                                    <img src={iconMenu} alt=""/>
                                </MenuButton>  : null}
                            <DropdownMenu
                                isVisible={isMenuVisible}
                                items={menuItems}
                                onClose={() => setIsMenuVisible(false)}
                                position={getMenuPosition()}
                            />
                        </UserContent>
                        <PostContent>{comment.content}</PostContent>
                    </ContentContainer>
                </UserContainer>


            <PostListContainer>

                {/*    좋아요 댓글 등 ~*/}
                {/*<PostMetaDataContent>*/}
                {/*    /!*<PostDate>${post.date}</PostDate>*!/*/}
                {/*    <PostDate>{DateFormatter.toRelativeTime(comment.createat)}</PostDate>*/}
                {/*    <LikeImg src={like as string} alt=""/>*/}
                {/*    <LikeCount> {comment.countLike}</LikeCount>*/}
                {/*    <CommentImg src={comment as string} alt=""/>*/}
                {/*    <CommentCount> {comment.countComments}</CommentCount>*/}
                {/*</PostMetaDataContent>*/}

            </PostListContainer>
            <DeleteDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteComment}
                isLoading={isDeleting}
                title={"댓글을 삭제하시겠습니까?"}
            />
        </Container>
    );
};

export default CommentList;

export const Container = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 640px) {
        margin: 0.5rem 0;
    }
`
export const PostListContainer = styled.div`
    width: 100%;
`
export const UserContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    //margin-top: 1.5rem;
    margin-bottom: 0.75rem;
`
export const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    //margin-top: 1.5rem;
    margin-bottom: 0.75rem;
`

export const UserContent = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    
`
export const ProfileImage = styled.img`
    width: 100%;
    max-width: 2rem;
    max-height: 2rem;
    margin-right: 0.75rem;
    margin-left: 0.3rem;
    border-radius: 50%;
    height: 100%;
    object-fit: cover;
`
export const UserNickname = styled.span`
    font-family: ${theme.font.regular};
    margin-right: 0.5rem;
    //font-size: 0.9rem;
`
export const AuthorTag = styled.span`
    font-family: ${theme.font.regular};
    padding: 1px 4px;
    background-color: ${theme.colors.seaGreenDark2};  // 민트 계열 연한 배경색
    color: ${theme.colors.white};  // 민트 계열 글자색
    border-radius: 4px;
    font-size: 0.75rem;
    margin-right: 0.5rem;
`
export const PostDate = styled.span`
    font-family: ${theme.font.light};
    color: ${theme.colors.gray5};
    font-size: 0.8rem;
    align-self: center;
`
export const PostContent = styled.span`
    width: 100%;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    font-family: ${theme.font.regular};
    color: ${theme.colors.gray5};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word; // 단어 단위로 줄바꿈
    white-space: normal;    // pre-wrap에서 normal로 변경
    line-height: 1.2em;     // 줄 높이 추가
`