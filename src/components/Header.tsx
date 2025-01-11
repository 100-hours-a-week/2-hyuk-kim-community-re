import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backIcon from '@/assets/images/back.svg';
import defaultProfile from '@/assets/images/icon-user.svg';
import githubLogo from '@/assets/images/logo-github.svg';
import styled from "styled-components";
import {theme} from "@/styles/theme.ts";
import logo from "@/assets/images/Logo.png";
import {STORAGE_KEYS} from "@/constants/storage.ts";

const Header: React.FC = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(defaultProfile);
    const navigate = useNavigate();
    const location = useLocation();
    const buttonProfileRef = useRef<HTMLButtonElement>(null!);
    const menuRef = useRef<HTMLDivElement>(null!);
    const isLoginPage = window.location.pathname === '/login';

    useEffect(() => {
        const storedProfile = sessionStorage.getItem('profile');
        if (storedProfile) {
            setProfileImage(storedProfile);
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (isMenuVisible && !menuRef.current?.contains(event.target as Node)) {
                setIsMenuVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuVisible]);

    const handleLogoClick = () => {
        navigate('/posts');
    }

    const handleProfileClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (buttonProfileRef.current && menuRef.current) {
            const profileRect = buttonProfileRef.current.getBoundingClientRect();
            const menuWidth = menuRef.current.offsetWidth;
            const offset = 8;

            menuRef.current.style.left = `${profileRect.right - menuWidth}px`;
            menuRef.current.style.top = `${profileRect.bottom + offset}px`;
        }
        setIsMenuVisible(!isMenuVisible);
    };

    const handleMenuClick = (path: string) => {
        if (path === 'logout') {
            sessionStorage.removeItem('email');
            navigate('/LoginPage');
        } else {
            navigate(`/${path}`);
        }
        setIsMenuVisible(false);
    };

    return (
        <HeaderContainer>
            <HeaderOverlay/>
            <HeaderContent>
                <HeaderLogo onClick={handleLogoClick}>
                    <Logo src={logo} alt="logo"/>
                    잡담은 경쟁력
                </HeaderLogo>
                <RightContainer>
                    {isLoginPage ? (
                        <GithubLink
                            href="https://github.com/100-hours-a-week/2-hyuk-kim-community-re"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GithubIcon src={githubLogo}/>
                            GitHub
                        </GithubLink>
                    ) : (
                        <TempContainer>
                            <WelcomeText>반가워요!</WelcomeText>
                            <ProfileButton ref={buttonProfileRef} onClick={handleProfileClick}>
                                <img src={profileImage as string} alt="profile" />
                            </ProfileButton>
                            {isMenuVisible && (
                                <MenuContainer ref={menuRef}>
                                    <MenuItem onClick={() => handleMenuClick('settings/profile')}>
                                        회원정보 수정
                                    </MenuItem>
                                    <MenuItem onClick={() => handleMenuClick('settings/password')}>
                                        비밀번호 수정
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={() => {
                                        sessionStorage.removeItem(STORAGE_KEYS.USER_ID);
                                        sessionStorage.removeItem(STORAGE_KEYS.USER_PROFILE_IMAGE);
                                        handleMenuClick('login')
                                    }}>
                                        로그아웃
                                    </MenuItem>
                                </MenuContainer>
                            )}
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
`

const MenuContainer = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    width: 10rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 50;
    overflow: hidden;
`

const MenuItem = styled.button`
    width: 100%;
    padding: 0.75rem 1rem;
    text-align: left;
    background: none;
    border: none;
    color: ${theme.colors.gray6};
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${theme.colors.gray1};
    }
`

const MenuDivider = styled.div`
    height: 1px;
    background-color: ${theme.colors.gray2};
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