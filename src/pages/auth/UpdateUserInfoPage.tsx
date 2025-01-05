import styled from 'styled-components';
import {theme} from "@/styles/theme.ts";
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import InputField from "@/components/CustomeInput.tsx";
import {validateEmail, validatePassword, validatePasswordRe, validateNickname} from "@/hooks/authValidation.ts";
import iconUser from "@/assets/images/icon-user.svg"
import iconUpload from "@/assets/images/icon-upload.svg"
import PrimaryButtonLarge from "@/components/PrimaryButtonLarge.tsx";
import {useImageUpload} from "@/hooks/imageUploader.tsx";
import {SignupRequest} from "@/types/models/auth.ts";
import {signup} from "@/api/auth.ts";

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('기존 이메일');
    const [nickname, setNickname] = useState('');
    const [updateProfile, setUpdateProfile] = useState(false);
    const [checkNickname, setCheckNickname] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState<string>(
        // 기본 이미지로 iconUser 사용하거나, 사용자의 기존 프로필 이미지 URL 설정
        sessionStorage.getItem('profile') || iconUser as string
    );
    // 프로필 이미지 업로드를 위한 코드!
    const {
        preview,
        fileInputRef,
        handleImageChange,
        triggerFileInput
    } = useImageUpload();

    const handleNicknameValidation = (value: string) => {
        const check = validateNickname(value);
        setCheckNickname(check.isValid);
        return {
            message: check.isValid ? '' : check.errorMessage
        };
    };

    const handleSignup = async () => {
        try {
            const files = fileInputRef.current?.files;

            const request: updateUserInfoRequest = {
                nickname: nickname ? nickname : "",
                image: files && files.length > 0 ? files[0] : ""
            };

            const response = await updateUser(request);

            if (response) {
                alert('회원정보 수정이 완료되었습니다.');
                navigate('/');
            } else {
                alert('회원정보 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('회원정보 수정 오류:', error);
            alert('회원정보 수정 중 오류가 발생했습니다.');
        }
    };

    return (
        <Container>
            <GridContainer>
                <LoginContainer>
                    <LoginContent>
                        <LoginTitle>회원정보 수정</LoginTitle>
                        <ProfileContainer>
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                            <ProfileButton
                                $iconUrl={iconUpload}
                                onClick={triggerFileInput}
                            >
                                <img
                                    src={preview || profileImageUrl}
                                    alt="프로필 이미지"
                                    onError={(e) => {
                                        // 이미지 로드 실패시 기본 이미지로 대체
                                        e.currentTarget.src = iconUser as string;
                                    }}
                                />
                            </ProfileButton>
                        </ProfileContainer>

                        <FormGroup>
                            <InputField
                                label="이메일"
                                type="email"
                                value={email}
                                placeholder="기존 이메일"
                                required={false}
                                disabled={true}
                            />
                        </FormGroup>

                        <FormGroup>
                            <InputField
                                label="닉네임"
                                type="text"
                                value={nickname}
                                onChange={setNickname}
                                placeholder="기존 닉네임"
                                validation={handleNicknameValidation}
                                required={true}
                            />
                        </FormGroup>

                        <PrimaryButtonLarge
                            $isEnabled={updateProfile || checkNickname}
                            className={"회원정보 수정"}
                            type={"button"}
                            onClick={() => {
                                if(updateProfile || checkNickname) {
                                    // 회원가입 로직
                                    console.log("수정하기 클릭!!")
                                }
                            }}
                        />

                        <FormFooter>
                            <FormLink href="/login">계정 삭제</FormLink>
                        </FormFooter>
                        {/*</form>*/}
                    </LoginContent>
                </LoginContainer>
            </GridContainer>
        </Container>
    );

};
export default SignUpPage;

const Container = styled.main`
    width: 100%;
    height: calc(100vh - 4rem);
    display: flex;
    justify-content: center;

    @media (max-width: 640px) {
        width: calc(100% - 2rem);
        padding: 0 1rem;
    }
`;

const GridContainer = styled.div`
    width: 100%;
    max-width: 30.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: center;

    @media (max-width: 640px) {
        margin-top: 2.5rem;
        gap: 2.5rem;
    }
`;

const ProfileContainer = styled.div`
    margin: 2rem 0;
`;

const ProfileText = styled.p`
    display: block;
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: ${theme.colors.gray6};
`;

const ProfileHelperText = styled.p`
    width: 100%;
    visibility: visible;
    text-align: start;
`;

const ProfileButton = styled.button<{ $iconUrl: string }>`
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 0;
    display: block;
    margin: 0 auto;
    background-color: transparent;
    padding: 0;

    &::before {
        content: "*";
        position: absolute;
        top: 0;
        right: 0;
        color: red;
        font-size: 20px;
    }
    
    &::after {
        content: '';
        background-image: url("${props => props.$iconUrl}");
        background-size: cover;
        background-position: center;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
`;

const LoginContainer = styled.div`
    max-width: 35.5rem;
    background-color: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    margin: 0;
`;


const LoginContent = styled.div`
    position: relative;
`;

const LoginTitle = styled.h2`
    color: ${theme.colors.seaGreenDark3};
    font-family: ${theme.font.bold};
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
`;

const FormGroup = styled.div`
    margin-bottom: 1.5rem;
`;

const LoginButton = styled.button<{ isEnabled: boolean }>`
    width: 100%;
    padding: 0.875rem;
    border-radius: 0.75rem;
    border-width: 0;
    color: white;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    
    background: ${props => props.isEnabled
            ? `linear-gradient(to right, ${theme.colors.seaGreenLight}, ${theme.colors.seaGreenDark1})`
            : 'gray'};
    cursor: ${props => props.isEnabled ? 'pointer' : 'not-allowed'};
    opacity: ${props => props.isEnabled ? 1 : 0.5};
    
    span {
        position: relative;
        z-index: 10;
    }

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to right, ${theme.colors.seaGreenDark1}, ${theme.colors.seaGreenDark3});
        transform: translateX(100%);
        transition: transform 0.3s;
    }

    &:hover::after {
        transform: translateX(0);
    }
`;

const FormFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    padding-top: 0.5rem;
`;

const FormLink = styled.a`
    color: ${theme.colors.activeRed};

    &:hover {
        text-decoration: underline;
    }
`;
