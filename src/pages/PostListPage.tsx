import React from 'react';
import styled from 'styled-components';
import PostList from "@/components/PostList.tsx";
import {theme} from "@/styles/theme.ts";
import uploadPostButton from "@/assets/images/icon-upload-post.svg"
import {useNavigate} from "react-router-dom";

const PostListPage: React.FC = () => {
    const navigate = useNavigate();

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
                <PostList/>
            </PostListPageContainer>
        </Container>
    );
};
export default PostListPage;

const Container = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
`

const PostListPageContainer = styled.div`
    
    //max-width: 35rem;
`

const UploadContainer = styled.main`
    display: flex;
    flex-direction: row;
    padding: 0.5rem 1rem;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    background: ${theme.colors.white};
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