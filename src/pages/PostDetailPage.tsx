import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import like from "@/assets/images/Like.svg";
import comment from "@/assets/images/Comment.svg";
import view from "@/assets/images/icon-view.svg";
import iconMenu from "@/assets/images/icon-menu.svg";
import logo from "@/assets/images/Logo.png";
import PostListPage from "@/pages/PostListPage.tsx";
import {theme} from "@/styles/theme.ts";
import {CreateCommentRequest, Post} from "@/types/models/post.ts";
import PostList from "@/components/PostList.tsx";
import {createComment, deletePost, getPost, postLike, unlikePost} from "@/api/post.ts";
import {useParams} from "react-router";
import {DateFormatter} from "@/utils/DateFormatter.ts";
import CustomeInput from "@/components/CustomeInput.tsx";
import PrimaryButtonLarge from "@/components/PrimaryButtonLarge.tsx";
import CommentList from "@/components/CommentList.tsx";
import DropdownMenu from "@/components/DropdownMenu.tsx";
import {STORAGE_KEYS} from "@/constants/storage.ts";
import {useNavigate} from "react-router-dom";
import likeTrue from "@/assets/images/icon-like-true.svg";
import {DeleteDialog} from "@/components/DeleteDialog.tsx";


const PostDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [post, setPost] = useState<Post | null>(null);
    const [commentContent, setCommentContent] = useState<string>(null);
    const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
    const [totalComments, setTotalComments] = useState(0);
    const buttonProfileRef = useRef<HTMLButtonElement>(null);    // ref 생성
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { postId } = useParams();
    const [isLikeLoading, setIsLikeLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // 게시글 삭제 핸들러
    const handleDeletePost = async () => {
        if (!postId) return;

        setIsDeleting(true);
        try {
            await deletePost(postId);
            navigate('/posts'); // 목록으로 이동
        } catch (error) {
            console.error('Failed to delete post:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleLike = async () => {
        if (isLikeLoading || !post) return;

        setIsLikeLoading(true);
        try {
            // 현재 좋아요 상태에 따라 다른 API 호출
            if (post.isLiked) {
                // 이미 좋아요 상태인 경우 취소
                await unlikePost(postId);
            } else {
                // 좋아요가 안 된 상태인 경우 좋아요 추가
                await postLike(postId);
            }

            // API 호출이 성공하면 게시글 상태 업데이트
            setPost(prevPost => {
                if (!prevPost) return null;
                return {
                    ...prevPost,
                    isLiked: !prevPost.isLiked,
                    countLike: prevPost.isLiked ? prevPost.countLike - 1 : prevPost.countLike + 1
                };
            });
        } catch (error) {
            console.error('Failed to update like:', error);
            // 에러 시 토스트 메시지 표시 가능
        } finally {
            setIsLikeLoading(false);
        }
    };

// 댓글 제출 후 값을 비우는 함수
    const clearTextArea = () => {
        if (textAreaRef.current) {
            textAreaRef.current.value = '';
        }
    };


    // 메뉴 버튼 클릭
    const handleMenuClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsMenuVisible(!isMenuVisible);
    };
    // // 메뉴 내 항목(수정, 삭제) 클릭
    // const handleMenuSelected = (path: string) => {
    //     navigate(`/${path}`);
    //     setIsMenuVisible(false);
    // };

    const menuItems = [
        {
            label: '수정',
            onClick: () => {
                navigate(`/posts/${postId}/edit`, {
                    state: {
                        post: {
                            id: post?.id,
                            title: post?.title,
                            content: post?.content,
                        },
                        image: post?.image,
                    }
                });
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
            $top: `${buttonRect.height + 8}px`, // 8px 간격 추가
            $right: '0'
        };
    };


    const handlePostButton = async () => {
        const fetchPostDetail = async () => {
            try {
                if (!postId || !commentContent) {
                    return;
                }

                // postId가 유효한 숫자인지 확인
                const numericPostId = parseInt(postId);
                if (isNaN(numericPostId)) {
                    return;
                }

                // commentContent가 유효한 문자열인지 확인
                const strContent = commentContent.toString();
                if (!strContent.trim()) {
                    return;
                }

                const body: CreateCommentRequest = {
                    postId: numericPostId,
                    content: strContent,
                }

                const response = await createComment(body);
                const data = await response;


                // 상태 업데이트를 올바르게 수정
                setPost(prevPost => {
                    if (!prevPost) return null;
                    return {
                        ...prevPost,
                        commentList: [...prevPost.commentList, data]
                    }
                });

                // 댓글 입력 필드 초기화
                clearTextArea();
            } catch (error) {
                console.error('Failed to fetch post detail:', error);
            }
        };

        fetchPostDetail();
    }

    // 게시글 상세 정보 불러오기 (1페이지 댓글 포함)
    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await getPost(postId);
                setPost(response);
                setTotalComments(response.commentList.length);
            } catch (error) {
                console.error('Failed to fetch post detail:', error);
            }
        };

        fetchPostDetail();
    }, [postId]);

    return (
        <Container>
        <PostDetailContainer>
            <PostListContainer onClick={e => e.stopPropagation()}>
            {/*    프로필사진 이름 작성일*/}
            {/*    row로 정렬하기!*/}
                <UserContainer>
                    <ProfileImage src={post?.user.profile}/>
                    <UserContent>
                        <TitleMenuContainer>
                        {/*    제목*/}
                            <PostTitle>{post?.title}</PostTitle>
                            {post?.isMyPost ?
                                <MenuButton ref={buttonProfileRef} onClick={handleMenuClick}>
                                    <img src={iconMenu}/>
                                </MenuButton>  : null}
                            <DropdownMenu
                                isVisible={isMenuVisible}
                                items={menuItems}
                                onClose={() => setIsMenuVisible(false)}
                                position={getMenuPosition()}
                            />
                        </TitleMenuContainer>
                        {/*<UserNickname>{post?.user.nickname}</UserNickname>*/}
                        <PostDate>{post?.user.nickname} · {DateFormatter.toRelativeTime(post?.createat)}</PostDate>
                    </UserContent>
                </UserContainer>
            {/*    이미지*/}
                {post?.image && <ImageContainer src={post?.image}/>}
            {/*    제목 및 내용(1줄)*/}
                <PostContainer>
            {/*    내용*/}
                    <PostContent>{post?.content}</PostContent>
            {/*    댓글*/}
            {/*        <CommentContent>댓글 1개 보기...</CommentContent>*/}
                    <DivisionLine/>
            {/*    좋아요 댓글 등 ~*/}
                    <PostMetaDataContent>
                        <button
                            onClick={handleLike}
                            disabled={isLikeLoading}
                            style={{
                                all: 'unset',
                                cursor: 'pointer',
                                opacity: isLikeLoading ? 0.5 : 1
                            }}
                        >
                            <LikeImg
                                src={post?.isLiked ? likeTrue as string : like as string}
                                alt={post?.isLiked ? "좋아요 취소" : "좋아요"}
                                className={isLikeLoading ? 'opacity-50' : ''}
                            />
                        </button>
                        <LikeCount> {post?.countLike}</LikeCount>

                        <CommentImg src={comment as string} alt=""/>
                        <CommentCount> {post?.commentList.length}</CommentCount>

                        <ViewImg src={view as string} alt="" />
                        <LikeCount> {post?.countView}</LikeCount>
                    </PostMetaDataContent>
                </PostContainer>
            </PostListContainer>
            <CommentListContainer>
                <CommentListTitle>댓글 ({post?.commentList.length})</CommentListTitle>
                {post?.commentList.map(comment => (
                    <CommentList
                        key={comment.id}
                        comment={comment}
                        // onClick={() => setSelectedCommentId(comment.id)}
                        // onClick={() => setSelectedCommentId(1)}
                    />
                ))}

                <PostComment>
                    <InputWrapper>
                    <CustomeInput
                        label=""
                        type="textarea"
                        // value={commentContent}
                        onChange={setCommentContent}
                        placeholder="댓글을 남겨주세요!"
                        // validation={handleEmailValidation}
                        required={false}
                        maxLength={100}
                    />
                    </InputWrapper>
                    <ButtonWrapper>
                    <PrimaryButtonLarge
                        $isEnabled={commentContent}
                        text={"등록"}
                        type={"button"}
                        onClick={handlePostButton}/>
                    </ButtonWrapper>
                </PostComment>
            </CommentListContainer>
        </PostDetailContainer>
            <DeleteDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeletePost}
                isLoading={isDeleting}
                title={"게시글을 삭제하시겠습니까?"}
            />
        </Container>
    );
};

export default PostDetailPage;

export const Container = styled.main`
    width: 100%;
    height: 100%;
    //position: fixed;

`
export const PostDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-self: center;
    width: 60%;
    //max-width: 30rem;
    //max-height: 90vh;
    border-radius: 10px;
    background-color: ${theme.colors.white};
    justify-content: center;
    align-items: center;
    margin: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    
    @media (max-width: 640px) {
        width: 90%;
    }
`
export const PostListContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 2rem 2rem;
    overflow-y: auto;
`
export const UserContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
    //margin-top: 1rem;
`
export const ProfileImage = styled.img`
    width: 2.75rem;
    height: 2.75rem;
    margin-right: 1rem;
    border-radius: 50%;
    object-fit: cover;
`

export const UserContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
export const TitleMenuContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const MenuButton = styled.button`
    background-color: transparent;
    padding: 0;
    margin-left: auto;
    border: none;
    img {
        width: 1rem;
        height: 1rem;
    }
`
export const UserNickname = styled.span`
    font-family: ${theme.font.bold};
`
export const PostDate = styled.span`
    font-size: 0.9rem;
    font-family: ${theme.font.light};
    color: ${theme.colors.gray5};
`

export const ImageContainer = styled.img`
    display: block;
    width: 20rem;
    height: 20rem;
    object-fit: cover;
    padding: 1rem;
    margin: 1rem auto 0 auto;  /* 좌우 margin을 auto로 설정 */

    //img {
    //    width: 100%;
    //    height: 100%;
    //    object-fit: cover;
    //    border-radius: 10px;
    //}
`

export const PostContainer = styled.div`

`
export const PostMetaDataContent = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`
export const LikeImg = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
`
export const ViewImg = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
`
export const CommentImg = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
`
export const LikeCount = styled.span`
    font-family: ${theme.font.regular};
    font-size: 0.9rem;
    margin-right: 0.5rem;
`
export const CommentCount = styled.span`
    font-family: ${theme.font.regular};
    font-size: 0.9rem;
    margin-right: 0.5rem;
`
export const PostTitle = styled.span`
    font-size: 1.5rem;
    font-family: ${theme.font.bold};
    margin-right: 1rem;
    //margin: 1rem 0 1rem 0.5rem;
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
    box-sizing: border-box;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    background-color: ${theme.colors.gray1};
    border-radius: 0 0 10px 10px;
`
export const CommentListTitle = styled.p`
    font-family: ${theme.font.bold};
    color: ${theme.colors.black};
`

export const PostComment = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    //position: fixed;
    //bottom: 0;
    //left: 0;
    //width: 100%;
`

const InputWrapper = styled.div`
    width: 85%;
    margin-right: 3%;
`

const ButtonWrapper = styled.div`
    width: 10%;
    height: 8%;
    
    // 버튼이 wrapper 크기에 맞게 채워지도록
    > button {
        font-size: 1rem;
        width: 100%;
        height: 100%;
        padding: 0.7rem 1rem;
        margin: 0rem;
    }
    
    @media (max-width: 1024px) {
        width: 15%;
    }
`

export const DivisionLine = styled.hr`
    width: calc(100% - 2rem);
    border: none;
    border-top: 0.5px solid ${theme.colors.gray3};
    margin: 0.5rem 0;
    
    justify-self: center;
`
