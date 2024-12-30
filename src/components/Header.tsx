import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeaderStyled } from './Header.styled.ts';
import backIcon from '@/assets/images/back.svg';
import defaultProfile from '../assets/images/profile.webp';
import githubLogo from '../assets/images/logo-github.svg';


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
        <HeaderStyled>
            <header className="header">
                <div className="header-overlay"></div>
                <div className="header-content">
                    <span className="header-logo">잡담은 경쟁력</span>
                    <div className="github-container">
                        <a href="https://github.com/100-hours-a-week/2-hyuk-kim-community-re" target="_blank" rel="noopener noreferrer"
                           className="github-link">
                            <img className="github-icon" src={githubLogo} alt="GitHub"/>
                            GitHub
                        </a>
                    </div>
                </div>
            </header>
        </HeaderStyled>
    );
};

export default Header;