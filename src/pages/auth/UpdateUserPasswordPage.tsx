import styled from 'styled-components';
import {theme} from "@/styles/theme.ts";
import React, {useState} from 'react';
import InputField from "@/components/CustomeInput.tsx";
import {validateEmail, validatePassword, validatePasswordRe, validateNickname} from "@/utils/validations/authValidation.ts";
import iconUser from "@/assets/images/Logo.png"
import iconUpload from "@/assets/images/icon-upload.svg"
import PrimaryButtonLarge from "@/components/PrimaryButtonLarge.tsx";

const SignUpPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [passwordRe, setPasswordRe] = useState('');
    const [checkPassword, setCheckPassword] = useState(false);
    const [checkPasswordRe, setCheckPasswordRe] = useState(false);


    const handlePasswordValidation = (value: string) => {
        const check = validatePassword(value);
        setCheckPassword(check.isValid);
        return {
            message: check.isValid ? '' : check.errorMessage
        };
    };

    const handlePasswordReValidation = (value: string) => {
        const check = validatePasswordRe(value, password);
        setCheckPasswordRe(check.isValid);
        return {
            message: check.isValid ? '' : check.errorMessage
        };
    };

    return (
        /*
        Login이랑 같은 태그 이름 사용! -> 필요시 변경하고 주석 달기!
        1. 프로필 이미지 부분 생성함.
        2. 비밀번호 확인, 닉네임 생성함.
         */
        <Container>
            <GridContainer>
                <LoginContainer>
                    <LoginContent>
                        <LoginTitle>비밀번호 수정</LoginTitle>

                        <FormGroup>
                            <InputField
                                label="비밀번호"
                                type="password"
                                value={password}
                                onChange={setPassword}
                                placeholder="변경할 비밀번호를 입력해주세요"
                                validation={handlePasswordValidation}
                                required={true}
                            />
                        </FormGroup>

                        <FormGroup>
                            <InputField
                                label="비밀번호 확인"
                                type="password"
                                value={passwordRe}
                                onChange={setPasswordRe}
                                placeholder="변경할 비밀번호를 한번 더 입력해주세요"
                                validation={handlePasswordReValidation}
                                required={true}
                            />
                        </FormGroup>

                        <PrimaryButtonLarge
                            isEnabled={checkPassword && checkPasswordRe}
                            className={"비밀번호수정"}
                            type={"button"}
                            onClick={() => {
                                if(checkPassword && checkPasswordRe) {
                                    // 회원가입 로직
                                    console.log("비밀번호수정 클릭!!")
                                }
                            }}
                        />

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
    align-items: center;

    @media (max-width: 640px) {
        margin-top: 2.5rem;
        gap: 2.5rem;
    }
`;

const ProfileContainer = styled.div`

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

const ProfileButton = styled.button<{ iconUrl: string }>`
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
        background-image: url('${props => props.iconUrl}'); 
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
        object-fit: contain;
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
    margin: 2rem 0;
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
    color: ${theme.colors.seaGreenDark1};

    &:hover {
        text-decoration: underline;
    }
`;
