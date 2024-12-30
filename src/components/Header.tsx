import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeaderStyled } from './Header.styled.ts';
import backIcon from '@/assets/images/back.svg';
console.log("type", typeof backIcon);
import defaultProfile from '../assets/images/profile.webp';


const Header: React.FC = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(defaultProfile);
    const navigate = useNavigate();
    const location = useLocation();
    const buttonProfileRef = useRef<HTMLButtonElement>(null); // 인수 타입 null을(를) 매개변수 타입 HTMLButtonElement에 할당할 수 없습니다
    const menuRef = useRef<HTMLDivElement>(null); // 인수 타입 null을(를) 매개변수 타입 HTMLButtonElement에 할당할 수 없습니다

    


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
            <div className="header">
                {shouldShowBackButton && (
                    <button className="button-back" onClick={() => navigate(-1)}>
                        {/*타입 {}을(를) 타입 string | undefined에 할당할 수 없습니다*/}
                        <img src={backIcon} alt="back" />
                    </button>
                )}
                <p className="logo">잡담은 경쟁력</p>
                {shouldShowProfileButton && (
                    <button
                        className="button-profile"
                        ref={buttonProfileRef}
                        onClick={handleProfileClick}
                    >
                        {/*타입 {}을(를) 타입 string | undefined에 할당할 수 없습니다*/}
                        <img className="button-profile-img" src={profileImage} alt="profile" />
                    </button>
                )}
                {isMenuVisible && (
                    <div className="menu-container" ref={menuRef} onClick={(e) => e.stopPropagation()}>
                        <button className="menu-item" onClick={() => handleMenuClick('EditProfile')}>
                            회원정보수정
                        </button>
                        <button className="menu-item" onClick={() => handleMenuClick('EditPasswordPage')}>
                            비밀번호수정
                        </button>
                        <button className="menu-item" onClick={() => handleMenuClick('logout')}>
                            로그아웃
                        </button>
                    </div>
                )}
            </div>
        </HeaderStyled>
    );
};

export default Header;