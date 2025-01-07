import React from "react";
import styled from "styled-components";
import {useImageUpload} from "@/hooks/imageUploader.tsx";
import {theme} from "@/styles/theme.ts";
import CustomeInput from "@/components/CustomeInput.tsx";
import PrimaryButtonLarge from "@/components/PrimaryButtonLarge.tsx";
import GrayButton from "@/components/GrayButton.tsx";
import iconUpload from "@/assets/images/icon-upload.svg";
import iconDelete from "@/assets/images/icon-delete.svg";
import logo from "@/assets/images/Logo.png";
import {useNavigate} from "react-router-dom";

const PostCreatePage: React.FC = () => {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const navigate = useNavigate();


    const handleContentChange = (e) => {
        if (content.length <= 500) {
            setContent(content);
        }
    };

    const handlePostButton = async () => {
        console.log("게시글 작성 버튼 클릭!");
    }

    const handleBackButton = async () => {
        navigate("/posts");
    }

    const {
        preview,
        fileInputRef,
        handleImageChange,
        triggerFileInput
    } = useImageUpload();

    return (
      <Container>
        <PostCreatePageContainer>
            <MainTitle> 게시글 작성 </MainTitle>

            <ProfileContainer>
                <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif"
                    hidden
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
                <ProfileButton
                    $iconDelete={iconDelete}
                    $iconUrl={iconUpload}
                    onClick={triggerFileInput}
                >
                    <img src={preview as string || logo as string} alt="프로필 이미지"/>
                </ProfileButton>
            </ProfileContainer>


            {/*제목*/}
            <CustomeInput
                label="제목"
                type="textarea"
                value={title}
                onChange={setTitle}
                placeholder="제목을 입력해주세요"
                // validation={handleEmailValidation}
                required={true}
            />
            {/*내용 ==> 크기가 좀 커야함!*/}
            <ContentInputWrapper>
            <CustomeInput
                label="내용"
                type="textarea"  // input 대신 textarea 사용
                value={content}
                onChange={setContent}
                placeholder="내용을 입력해주세요"
                required={true}
            />
            </ContentInputWrapper>

            <ButtonContainer>
                <GrayButton
                    className={"뒤로가기"}
                    type={"button"}
                    onClick={handleBackButton}
                />
                <PrimaryButtonLarge
                    $isEnabled={title && content}
                    className={"작성하기"}
                    type={"button"}
                    onClick={handlePostButton}
                />
            </ButtonContainer>
        </PostCreatePageContainer>
      </Container>
    );
};

export default PostCreatePage;

export const Container = styled.main`
    width: 100vw;
    height: calc(100vh - 4rem);
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    
    border-radius: 10px;
    
    @media (max-width: 640px) {
        width: calc(100vw - 2rem);
        padding: 2rem 1rem;
        align-items: start;
    }
`;
export const PostCreatePageContainer = styled.div`
    width: 100%;
    max-width: 30rem;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    background-color: ${theme.colors.white};
`;
export const MainTitle = styled.h2`
    color: ${theme.colors.seaGreenDark3};
    font-family: ${theme.font.bold};
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    text-align: center;
`;

const ContentInputWrapper = styled.div`
    margin-top: 1rem;
    input {
        max-height: 10rem !important; // 원하는 높이로 조정
        height: 15rem !important;
        resize: none;
        word-wrap: break-word !important;     // 긴 단어나 URL이 있을 경우에도 줄바꿈
        word-break: break-all !important;     // 모든 가능한 지점에서 줄바꿈
        white-space: pre-wrap !important;     // 줄바꿈과 공백을 보존하면서 자동 줄바꿈
    }
`;

const CharacterCount = styled.span`
  position: absolute;
  bottom: 8px;
  right: 16px;
  font-size: 0.875rem;
  color: #6b7280;
`;

const ProfileContainer = styled.div`
    margin: 2rem 0;
`;

const ProfileButton = styled.button<{$iconDelete, $iconUrl}>`
    position: relative;
    width: 10rem;
    height: 10rem;
    
    border-radius: 50%;
    border: 0;
    display: block;
    margin: 0 auto;
    background-color: transparent;
    padding: 0;

    @media (max-width: 640px) {
        width: 15rem;
        height: 15rem;
    }
    
    &::after {
        content: '';
        background-image: url("${props => props.$iconUrl}");
        background-size: cover;
        background-position: center;
        position: absolute;
        bottom: -1rem;
        right: -1rem;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        opacity: 0.7;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    margin-top: 2rem;
    gap: 15rem;
`;