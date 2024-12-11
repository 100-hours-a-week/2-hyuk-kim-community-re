import React, { useState, useEffect } from 'react';
// import { LOGIN_URL } from './api/constants';
import './../../styles/LoginPage.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [helperText, setHelperText] = useState('');
    const [isHelperVisible, setIsHelperVisible] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(email)) {
            setIsHelperVisible(false);
            setCheckEmail(true);
        } else {
            setHelperText('*올바른 이메일 주소 형식을 입력해주세요 (예: example@example.com)');
            setIsHelperVisible(true);
            setCheckEmail(false);
        }
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?~-]).{8,20}$/;
        if (password.length === 0) {
            setHelperText('*비밀번호를 입력해주세요');
            setIsHelperVisible(true);
            setCheckPassword(false);
        } else if (passwordRegex.test(password)) {
            setIsHelperVisible(false);
            setCheckPassword(true);
        } else {
            setHelperText('*비밀번호가 다릅니다.');
            setIsHelperVisible(true);
            setCheckPassword(false);
        }
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
        <div className="container">
            {/* <HeaderComponent /> */}
            <section className="wrap">
                <article className="login">
                    <p id="loginText">로그인</p>
                </article>

                <article id="article-auth">
                    <div className="input-group">
                        <p className="text-guide">이메일</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateEmail(e.target.value);
                            }}
                            placeholder="이메일을 입력해주세요"
                        />
                    </div>

                    <div className="input-group">
                        <p className="text-guide">비밀번호</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            placeholder="비밀번호를 입력해주세요"
                        />
                        {isHelperVisible && (
                            <p className="helper-text" style={{ visibility: 'visible' }}>
                                {helperText}
                            </p>
                        )}
                    </div>
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
    );
};

export default LoginPage;