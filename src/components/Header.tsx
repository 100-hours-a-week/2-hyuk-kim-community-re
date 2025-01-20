import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfile from '@/assets/images/icon-user.svg';
import githubLogo from '@/assets/images/logo-github.svg';
import styled from "styled-components";
import {theme} from "@/styles/theme.ts";
import logo from "@/assets/images/Logo.png";
import DropdownMenu from "@/components/DropdownMenu.tsx";
import {useUserActions, useIsAuthenticated, useUser} from "@/store/useUserStore.ts";

const Header: React.FC = () => {
    const user = useUser();
    const isLoggedIn = useIsAuthenticated();
    const isLoginPage = window.location.pathname === '/login';
    const { clearUser } = useUserActions();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const navigate = useNavigate();
    const buttonProfileRef = useRef<HTMLButtonElement>(null!);

    const handleLogoClick = () => {
        navigate('/posts');
    };

    const handleProfileClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsMenuVisible(!isMenuVisible);
    };

    const handleMenuClick = (path: string) => {
        navigate(`/${path}`);
        setIsMenuVisible(false);
    };

    // 로그인된 사용자의 메뉴 아이템
    const loggedInMenuItems = [
        {
            label: '회원정보 수정',
            onClick: () => handleMenuClick('settings/profile')
        },
        {
            label: '비밀번호 수정',
            onClick: () => handleMenuClick('settings/password')
        },
        { isDivider: true },
        {
            label: '로그아웃',
            onClick: () => {
                clearUser();
                handleMenuClick('login');
            }
        }
    ];

    // 비로그인 사용자의 메뉴 아이템
    const loggedOutMenuItems = [
        {
            label: '로그인',
            onClick: () => handleMenuClick('login')
        }
    ];

    // 프로필 버튼의 위치를 기준으로 메뉴 위치 계산
    const getMenuPosition = () => {
        if (!buttonProfileRef.current) return {};

        const buttonRect = buttonProfileRef.current.getBoundingClientRect();
        return {
            $top: `${buttonRect.height + 8}px`, // 8px 간격 추가
            $right: '0'
        };
    };

    return (
        <HeaderContainer>
            <HeaderOverlay/>
            <HeaderContent>
                <HeaderLogo onClick={handleLogoClick}>
                    <Logo src={logo as string} alt="logo"/>
                    잡담은 경쟁력
                </HeaderLogo>
                <RightContainer>
                    {isLoginPage ? (
                        <GithubLink
                            href="https://github.com/100-hours-a-week/2-hyuk-kim-community-re"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GithubIcon src={githubLogo as string}/>
                            GitHub
                        </GithubLink>
                    ) : (
                        <TempContainer>
                            {isLoggedIn && <WelcomeText>반가워요!</WelcomeText>}
                            <ProfileButton ref={buttonProfileRef} onClick={handleProfileClick}>
                                <img
                                    // error 타입 {}을(를) 타입 string | undefined에 할당할 수 없습니다
                                    src={isLoggedIn ? (user?.profile as string ?? defaultProfile as string) : defaultProfile as string}
                                    alt="profile"
                                />
                            </ProfileButton>
                            <DropdownMenu
                                isVisible={isMenuVisible}
                                items={isLoggedIn ? loggedInMenuItems : loggedOutMenuItems}
                                onClose={() => setIsMenuVisible(false)}
                                position={getMenuPosition()}
                            />
                        </TempContainer>
                    )}
                </RightContainer>
            </HeaderContent>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.header`
    width: 100%;
    max-width: 100%;
    height: 4rem;
    position: relative;
    background: linear-gradient(to right, #00FFC0, #00C596);
    overflow: visible;
`

const HeaderOverlay = styled.div`
    position: absolute;
    inset: 0;
    background:
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 20px 20px;
`

const HeaderContent = styled.div`
    margin: 0 auto;
    width: calc(100% - 2rem);
    padding: 0 1rem;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 10;
    justify-content: space-between;

    @media (max-width: 640px) {
        padding: 0 1rem;
        gap: 0.5rem;
    }
`

const HeaderLogo = styled.p`
    color: ${theme.colors.white};
    font-size: 1.25rem;
    font-family: ${theme.font.bold};
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;

    @media (max-width: 640px) {
        font-size: 1rem;
    }
`

const Logo = styled.img`
    margin-right: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
`

const RightContainer = styled.div`
    margin-left: auto;
    position: relative;
`

const TempContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0;
`

const WelcomeText = styled.span`
    font-size: 1rem;
    color: ${theme.colors.white};
    margin-right: 0.5rem;
    padding: 0;
`

const ProfileButton = styled.button`
    width: 2rem;
    height: 2rem;
    background: none;
    border: none;
    transition: background-color 0.3s;
    align-self: center;
    justify-self: center;
    padding: 0;
    cursor: pointer;

    img {
        width: 2rem;
        height: 2rem;
        align-self: center;
        justify-self: center;
        padding: 0;
        border-radius: 50%;
        object-fit: cover;
    }
    //margin: 0.25rem 0;
`

const GithubLink = styled.a`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    color: white;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 640px) {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
    }
`

const GithubIcon = styled.img`
    width: 1.25rem;
    height: 1.25rem;

    @media (max-width: 640px) {
        width: 1rem;
        height: 1rem;
    }
`