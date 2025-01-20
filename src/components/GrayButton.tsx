import React from 'react';
import styled from "styled-components";
import {theme} from "@/styles/theme.ts";

const GrayButton = ({
                        className,
                        type,
                        onClick,
                    }) => {

    return (
        <LoginButton
            onClick={onClick}
            className={className}
            type={type}
        >
            <span>{className}</span>
        </LoginButton>
);
};

export default GrayButton;

const LoginButton = styled.button`
    width: 100%;
    padding: 0.875rem;
    border-radius: 0.75rem;
    border-width: 0;
    color: ${theme.colors.gray6};
    font-weight: 500;
    position: relative;
    overflow: hidden;
    
    background: ${theme.colors.gray3});
    span {
        position: relative;
        z-index: 10;
    }

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to right, ${theme.colors.gray3}, ${theme.colors.gray4});
        transform: translateX(100%);
        transition: transform 0.3s;
    }

    &:hover::after {
        transform: translateX(0);
    }
`;