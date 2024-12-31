import styled from 'styled-components';
import {theme} from "@/styles/theme.ts";
import React, { useState } from 'react';
import InputField from "@/components/CustomeInput.tsx";
import {validateEmail, validatePassword} from "@/utils/validations/authValidation.ts";


const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);

    const handleEmailValidation = (value: string) => {
        const check = validateEmail(value);
        setCheckEmail(check.isValid);
        return {
            message: check.isValid ? '' : check.errorMessage
        };
    };

    const handlePasswordValidation = (value: string) => {
        const check = validatePassword(value);
        setCheckPassword(check.isValid);
        return {
            message: check.isValid ? '' : check.errorMessage
        };
    };

    return (
        <Container>
            <GridContainer>
                <WelcomeSection>
                    <WelcomeTitle>
                        환영합니다! 👋
                        <TitleDecoration />
                    </WelcomeTitle>
                    <WelcomeText>잡담으로 시작하는 새로운 경쟁력</WelcomeText>

                    <CardGrid>
                        <Card href="/browse">
                            <CardContent>
                                <CardTitle>자유롭게</CardTitle>
                                <CardDesc>둘러보기</CardDesc>
                            </CardContent>
                            <CardDecoration/>
                        </Card>
                    </CardGrid>
                </WelcomeSection>

                <LoginContainer>
                    <LoginDecorationTop />
                    <LoginDecorationBottom />

                    <LoginContent>
                        <LoginTitle>로그인</LoginTitle>
                        <form>
                            <FormGroup>
                                <InputField
                                    label="이메일"
                                    type="email"
                                    value={email}
                                    onChange={setEmail}
                                    placeholder="이메일을 입력해주세요"
                                    validation={handleEmailValidation}
                                />
                            </FormGroup>

                            <FormGroup>
                                <InputField
                                    label="비밀번호"
                                    type="password"
                                    value={password}
                                    onChange={setPassword}
                                    placeholder="비밀번호를 입력해주세요"
                                    validation={handlePasswordValidation}
                                />
                            </FormGroup>

                            <LoginButton>
                                <span>로그인하기</span>
                            </LoginButton>

                            <FormFooter>
                                <FormLink href="/signup">회원가입</FormLink>
                            </FormFooter>
                        </form>
                    </LoginContent>
                </LoginContainer>
            </GridContainer>
        </Container>
    );

};
export default LoginPage;

const Container = styled.main`
    width: 100%;
    display: flex;
    justify-content: center;
    //padding: 4rem 1.5rem;
    @media (max-width: 640px) {
        width: calc(100% - 2rem);
        padding: 0 1rem;
    }
`;

const GridContainer = styled.div`
    width: 100%;
    max-width: 35.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: center;

    @media (max-width: 640px) {
        margin-top: 2.5rem;
        gap: 2.5rem;
    }
`;

const WelcomeSection = styled.div`
 max-width: 35.5rem;
 width: 100%;
 text-align: left;
    margin-bottom: 0;
`;

const WelcomeTitle = styled.h1`
    color: ${theme.colors.seaGreenDark3};
    font-family: ${theme.font.bold};
    font-size: 2.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;



const TitleDecoration = styled.div`
  position: absolute;
  top: -20%;
  left: -10%;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: ${theme.colors.seaGreenLight};
  filter: blur(60px);
  opacity: 0.3;
  z-index: -1;
`;

const WelcomeText = styled.p`
  font-size: 1.125rem;
  color: ${theme.colors.gray6};
  margin-bottom: 1rem;
`;

const CardGrid = styled.div`
    width: 100%;
    max-width: 35.5rem;

`;

const Card = styled.a`
    width: 100%;
    max-width: 35.5rem;
    text-decoration: none;
    border-radius: 1rem;
    background-color: white;
    position: relative;
    overflow: hidden;
    display: block;
    transition: transform 0.3s;


  &:hover {
    transform: translateY(-0.25rem);
  }
`;

const CardContent = styled.div`
    padding: 0.5rem 1.5rem;
    position: relative;
    z-index: 10;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: ${theme.colors.seaGreenDark1};
`;

const CardDesc = styled.p`
  color: ${theme.colors.gray6};
`;

const CardDecoration = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: ${theme.colors.seaGreenDark1};
  transform: translate(50%, -50%);
  opacity: 0.1;
  transition: opacity 0.3s;

  ${Card}:hover & {
    opacity: 0.2;
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

const LoginDecorationTop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: ${theme.colors.seaGreenLight};
  opacity: 0.1;
  transform: translate(50%, -50%);
`;

const LoginDecorationBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: ${theme.colors.seaGreenDark1};
  opacity: 0.1;
  transform: translate(-50%, 50%);
`;

const LoginContent = styled.div`
  position: relative;
`;

const LoginTitle = styled.h2`
  color: ${theme.colors.seaGreenDark3};
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  border-radius: 0.75rem;
  border-width: 0;
  color: white;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to right, ${theme.colors.seaGreenLight}, ${theme.colors.seaGreenDark1});

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
