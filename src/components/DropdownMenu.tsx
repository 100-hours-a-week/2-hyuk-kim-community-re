import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';  // 테마 경로는 프로젝트 구조에 맞게 수정

interface MenuContainerProps {
    $top?: string;
    $right?: string;
    $width?: string;
}

interface MenuItem {
    label?: string;
    onClick?: () => void;
    disabled?: boolean;
    isDivider?: boolean;
}

interface DropdownMenuProps {
    isVisible: boolean;
    items: MenuItem[];
    onClose: () => void;
    position?: MenuContainerProps;
}

const DropdownMenu = ({
                          isVisible,
                          items,
                          onClose,
                          position = {},
                          title,
                      }: DropdownMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <MenuContainer ref={menuRef} {...position}>
            {items.map((item, index) => {
                if (item.isDivider) {
                    return <MenuDivider key={`divider-${index}`} />;
                }

                return (
                    <MenuItem
                        key={`${item.label}-${index}`}
                        onClick={item.onClick}
                        disabled={item.disabled}
                    >
                        {item.label}
                    </MenuItem>
                );
            })}
        </MenuContainer>
    );
};

export default DropdownMenu;



const MenuContainer = styled.div<MenuContainerProps>`
    position: absolute;
    top: ${props => props.$top || '100%'};
    right: ${props => props.$right || '0'};
    width: ${props => props.$width || '10rem'};
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 1;
    overflow: hidden;
`;

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

    &:disabled {
        color: ${theme.colors.gray3};
        cursor: not-allowed;
        &:hover {
            background-color: transparent;
        }
    }
`;

const MenuDivider = styled.div`
    height: 1px;
    background-color: ${theme.colors.gray2};
`;