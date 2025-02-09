import styled from 'styled-components';
import {theme} from "@/styles/theme.ts";
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import InputField from "@/components/CustomeInput.tsx";
import {validateNickname} from "@/hooks/authValidation.ts";
import iconUser from "@/assets/images/icon-user.svg"
import iconUpload from "@/assets/images/icon-upload.svg"
import PrimaryButtonLarge from "@/components/PrimaryButtonLarge.tsx";
import {useImageLoader} from "@/hooks/imageLoader.tsx";
import {deleteUser, getProfile, updateUser} from "@/api/user.ts";
import {UpdateUserInfoRequest} from "@/types/models/user.ts";
import useUserStore, {useUser} from "@/store/useUserStore.ts";

const UpdateUserInfoPage: React.FC = () => {
    const user = useUser();

    const navigate = useNavigate();
    const [email, setEmail] = useState('기존 이메일');
    const [nickname, setNickname] = useState('');
    const [updateProfile, setUpdateProfile] = useState(false);
    const [checkNickname, setCheckNickname] = useState(false);
    const [profileImageUrl] = useState<string>(
        // 기본 이미지로 iconUser 사용하거나, 사용자의 기존 프로필 이미지 URL 설정
        user?.profile || iconUser as string
    );
    // 프로필 이미지 업로드를 위한 코드!
    const {
        preview,
        fileInputRef,
        handleImageChange,
        triggerFileInput
    } = useImageLoader(setUpdateProfile);



    const handleNicknameValidation = (value: string) => {
        const check = validateNickname(value);
        setCheckNickname(check.isValid);
        return {
            message: check.isValid ? '' : check.errorMessage
        };
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                setEmail(response.email);
                setNickname(response.nickname);
            } catch (e) {
                console.error(e);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdateUser = async () => {
        try {
            const files = fileInputRef.current?.files;

            const request: UpdateUserInfoRequest = {
                nickname: nickname ? nickname : "",
                image: files && files.length > 0 ? files[0] : ""
            };

            const response = await updateUser(request);

            if (response) {
                alert('회원정보 수정이 완료되었습니다.');
                navigate('/posts');
            } else {
                alert('회원정보 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('회원정보 수정 오류:', error);
            alert('회원정보 수정 중 오류가 발생했습니다.');
        }
    };

    const handleDeleteUser = async () => {
        // console.log(user);
        if(!user) {
            alert("로그인이 필요한 서비스입니다.");
            return;
        }
        try {
            await deleteUser();
            navigate('/login');

            alert("회원 탈퇴가 완료되었습니다.");
            useUserStore.getState().clearUser();
            return;
        } catch (error) {
            console.error('회원탈퇴 오류:', error);
            alert('회원탈퇴 중 오류가 발생했습니다.');
        }
    }

    return (
        <Container>
            <GridContainer>
                <LoginContainer>
                    <LoginContent>
                        <LoginTitle>회원정보 수정</LoginTitle>
                        <ProfileContainer>
                            <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/gif"
                                hidden
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                            <ProfileButton
                                $iconUrl={iconUpload as string}
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
                                maxLength={10}
                            />
                        </FormGroup>

                        <PrimaryButtonLarge
                            $isEnabled={updateProfile || checkNickname}
                            text={"회원정보 수정"}
                            type={"button"}
                            onClick={handleUpdateUser}
                        />

                        <FormFooter>
                            {/*<FormLink href="/login">계정 삭제</FormLink>*/}
                            <FormLink onClick={handleDeleteUser}>계정 삭제</FormLink>
                        </FormFooter>
                        {/*</form>*/}
                    </LoginContent>
                </LoginContainer>
            </GridContainer>
        </Container>
    );

};
export default UpdateUserInfoPage;

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
    height: calc(100% - 2rem);
    max-width: 30.5rem;
    display: grid;
    align-items: center;

    @media (max-width: 640px) {
        margin-top: 2.5rem;
        align-items: flex-start;
    }
`;
const ProfileContainer = styled.div`
    margin: 2rem 0;
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
