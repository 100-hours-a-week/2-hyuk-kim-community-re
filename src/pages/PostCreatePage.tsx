import React, {useEffect} from "react";
import styled from "styled-components";
import {useImageLoader} from "@/hooks/imageLoader.tsx";
import {theme} from "@/styles/theme.ts";
import CustomeInput from "@/components/CustomeInput.tsx";
import PrimaryButtonLarge from "@/components/PrimaryButtonLarge.tsx";
import GrayButton from "@/components/GrayButton.tsx";
import iconUpload from "@/assets/images/icon-upload.svg";
import iconUploadImage from "@/assets/images/icon-upload-image.svg";
import iconDelete from "@/assets/images/icon-delete.svg";
import {useNavigate} from "react-router-dom";
import {createPost} from "@/api/post.ts";
import {CreatePostRequest} from "@/types/models/post.ts";
import CustomeTextArea from "@/components/CustomeTextArea.tsx";
import {hasValidContent} from "@/utils/stringValidators.ts";
import {uploadImage} from "@/api/image.ts";

const PostCreatePage: React.FC = () => {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    const handlePostButton = async () => {
        try {
            const imageFile = fileInputRef.current?.files?.[0];
            const data: CreatePostRequest = {
                post: {
                    title: title,
                    content: content,
                    ...(imageFile && { image: await uploadImage(imageFile, 'board') })
                },
            };

            const response = await createPost(data);
            if (response) {
                navigate(`/posts/${response}`);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleBackButton = async () => {
        navigate("/posts");
    }

    const {
        preview,
        fileInputRef,
        handleImageChange,
        triggerFileInput
    } = useImageLoader();

    return (
      <Container>
        <PostCreatePageContainer>
            <MainTitle> 게시글 작성 </MainTitle>

            <ProfileContainer
                onClick={triggerFileInput}>
                <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif"
                    hidden
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
                {preview &&
                <ProfileButton
                    $iconDelete={iconDelete}
                    $iconUrl={iconUpload}
                >
                    <img src={preview as string} alt="프로필 이미지"/>
                </ProfileButton>}
                {!preview && <img src={iconUploadImage as string} alt=""/>}
                {!preview && <ProfileUploadText>클릭해서 사진을 업로드해주세요</ProfileUploadText>}
                {!preview && <ProfileTypeText>PNG, JPG, GIF (최대 10MB)</ProfileTypeText>}
                {/*{!preview && <ProfileHelperText>(사진은 1:1 비율로 조정됩니다)</ProfileHelperText>}*/}
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
                maxLength={26}
            />
            {/*내용 ==> 크기가 좀 커야함!*/}
            <ContentInputWrapper>
            <CustomeTextArea
                label="내용"
                value={content}
                onChange={setContent}
                placeholder="내용을 입력해주세요"
                required={true}
                maxLength={300}
                isTall={true}
            />
            </ContentInputWrapper>

            <ButtonContainer>
                <GrayButton
                    className={"뒤로가기"}
                    type={"button"}
                    onClick={handleBackButton}
                />
                <PrimaryButtonLarge
                    $isEnabled={title && content && hasValidContent(title) && hasValidContent(content)}
                    text={"작성하기"}
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
    padding: 1rem 2rem;
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

const ProfileContainer = styled.div`
    width: calc(100% - 3rem);
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dashed ${theme.colors.gray4};
    border-radius: 15px;
    padding: 1.5rem;
    margin: 2rem 0;
    
    background: ${theme.colors.white};
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
        width: 10rem;
        height: 10rem;
    }
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
`;
export const ProfileUploadText = styled.span`
    width: 100%;
    display: flex;           /* Flex 컨테이너로 설정 */
    align-items: center;     /* 수직 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */
    text-align: center;
    font-size: 1rem;
    color: ${theme.colors.gray6};

    margin-top: 1rem;
    margin-bottom: 0.25rem;
    
    @media (max-width: 640px) {
        width: 15rem;
        height: 15rem;
    }
`
export const ProfileTypeText = styled.span`
    width: 100%;
    display: flex;           /* Flex 컨테이너로 설정 */
    align-items: center;     /* 수직 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */
    text-align: center;
    font-size: 0.8rem;
    color: ${theme.colors.gray5};
    
    @media (max-width: 640px) {
        width: 15rem;
        height: 15rem;
    }
`

export const ProfileHelperText = styled.span`
    width: 100%;
    display: flex;           /* Flex 컨테이너로 설정 */
    align-items: center;     /* 수직 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */
    text-align: center;
    font-size: 0.7rem;
    margin-top: 0.1rem;
    color: ${theme.colors.gray5};
    
    @media (max-width: 640px) {
        width: 15rem;
        height: 15rem;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    margin-top: 1rem;
    gap: 15rem;
`;