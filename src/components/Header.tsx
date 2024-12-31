import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeaderStyled } from './Header.styled.ts';
import backIcon from '@/assets/images/back.svg';
import defaultProfile from '../assets/images/profile.webp';
import githubLogo from '../assets/images/logo-github.svg';
import styled from "styled-components";
import {theme} from "@/styles/theme.ts";
import logo from "@/assets/images/Logo.png";


const Header: React.FC = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(defaultProfile);
    const navigate = useNavigate();
    const location = useLocation();
    const buttonProfileRef = useRef<HTMLButtonElement>(null!); // 인수 타입 null을(를) 매개변수 타입 HTMLButtonElement에 할당할 수 없습니다
    const menuRef = useRef<HTMLDivElement>(null!); // 인수 타입 null을(를) 매개변수 타입 HTMLButtonElement에 할당할 수 없습니다




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

    const shouldShowBackButton = !location.pathname.match(
        /(LoginPage|EditProfilePage|EditPasswordPage|Posts)/
    );

    const shouldShowProfileButton = !location.pathname.match(
        /(LoginPage|SignUpPage)/
    );

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

                <HeaderLogo>
                    <Logo src={logo} alt="logo"/>
                    잡담은 경쟁력
                </HeaderLogo>
                <GithubContainer>
                    <GithubLink
                        href="https://github.com/100-hours-a-week/2-hyuk-kim-community-re"
                        target="_blank"
                        rel="noopener noreferrer"
                       >
                        <GithubIcon src={githubLogo}/>
                        GitHub
                    </GithubLink>
                </GithubContainer>
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
    overflow: hidden;
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
    max-width: 72rem;
    margin: 0 auto;
    width: calc(100% - 2rem);
    padding: 0 1.5rem;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 10;
    justify-content: space-between;

    @media (max-width: 640px) {
        padding: 0 1rem; // 수정
        gap: 0.5rem; // 추가
    }
`
const HeaderLogo = styled.span`
    color: ${theme.colors.white};
    font-size: 1.25rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    min-width: 0;

    @media (max-width: 640px) {
        font-size: 1rem;
    }
`

const Logo = styled.img`
    margin-right: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
`
const GithubContainer = styled.div`
    margin-left: auto;
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