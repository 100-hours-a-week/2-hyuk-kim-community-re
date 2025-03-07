import styled from 'styled-components';
import {theme} from "@/styles/theme.ts";
import React, {useState} from 'react';
import InputField from "@/components/CustomeInput.tsx";
import {validatePassword, validatePasswordRe} from "@/hooks/authValidation.ts";
import PrimaryButtonLarge from "@/components/PrimaryButtonLarge.tsx";
import {updatePassword} from "@/api/auth.ts";
import {useNavigate} from "react-router-dom";

const UpdateUserPasswordPage: React.FC = () => {
    const navigate = useNavigate();
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

    const handleUpdatePassword = async () => {
        const response = await updatePassword(password);
        if (response) {
            alert("비밀번호가 수정되었습니다.");
            navigate('/posts');
        }
    }

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
                                maxLength={20}
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
                                maxLength={20}
                            />
                        </FormGroup>

                        <PrimaryButtonLarge
                            $isEnabled={checkPassword && checkPasswordRe}
                            text={"비밀번호수정"}
                            type={"button"}
                            onClick={handleUpdatePassword}
                        />

                        {/*</form>*/}
                    </LoginContent>
                </LoginContainer>
            </GridContainer>
        </Container>
    );

};
export default UpdateUserPasswordPage;

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