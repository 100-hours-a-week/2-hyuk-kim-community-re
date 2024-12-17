import React, { useState, useEffect } from 'react';
// import { LOGIN_URL } from './api/constants';
// import './../../styles/LoginPage.styled.css';
import {LoginPageStyled} from "../../styles/LoginPage.styled";
import { validateEmail, validatePassword } from '../../utils/validations/authValidation';
import InputField from "../../components/auth/CustomeInput";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [helperText, setHelperText] = useState('');
    const [isHelperVisible, setIsHelperVisible] = useState(false);

    const handleEmailValidation = (value) => {
        const check = validateEmail(value);
        return {
            message: check.isValid ? '' : check.errorMessage
        };
    };

    const handlePasswordValidation = (value) => {
        const check = validatePassword(value);
        return {
            message: check.isValid ? '' : check.errorMessage
        };
    };

    const handleLogin = async () => {
        try {
            // const response = await fetch(LOGIN_URL, {
            const response = await fetch("LOGIN_URL", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw { status: response.status, response: error };
            }

            const data = await response.json();
            sessionStorage.setItem('userId', data.userId);
            sessionStorage.setItem('profile', data.profile);
            sessionStorage.setItem('sessionId', data.sessionId);
            window.location.href = '/posts';
        } catch (error: any) {
            console.error(error.stack);
            if (error.status === 400) {
                // Show toast message
                console.error(error.response.message);
            }
        }
    };

    const handleSignup = () => {
        window.location.href = '/signup';
    };

    return (
        <LoginPageStyled>
        <div className="container">
            {/* <HeaderComponent /> */}
            <section className="wrap">
                <article className="login">
                    <p id="loginText">로그인</p>
                </article>

                <article id="article-auth">
                    <InputField
                        label="이메일"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="이메일을 입력해주세요"
                        validation={handleEmailValidation}
                    />

                    <InputField
                        label="비밀번호"
                        type="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="비밀번호를 입력해주세요"
                        validation={handlePasswordValidation}
                    />
                </article>

                <article>
                    <button
                        id="login-button"
                        className="button-purple"
                        disabled={!checkEmail || !checkPassword}
                        onClick={handleLogin}
                        style={{
                            backgroundColor: checkEmail && checkPassword ? '#7F6AEE' : '#ACA0EB'
                        }}
                    >
                        로그인
                    </button>
                    <p id="signup-button" className="button-text" onClick={handleSignup}>
                        회원가입
                    </p>
                </article>
            </section>
        </div>
        </LoginPageStyled>
    );
};

export default LoginPage;