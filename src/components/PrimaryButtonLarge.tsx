import React from 'react';
import styled from "styled-components";
import {theme} from "@/styles/theme.ts";


const PrimaryButtonLarge = ({
                        $isEnabled,
                        text,
                        type,
                        onClick,
                    }) => {

    return (
        <LoginButton
            $isEnabled={$isEnabled}
            onClick={onClick}
            className={text}
            disabled={!$isEnabled}
            type={type}
        >
            <span>{text}</span>
        </LoginButton>
);
};

export default PrimaryButtonLarge;

const LoginButton = styled.button<{ $isEnabled: boolean }>`
    width: 100%;
    padding: 0.875rem;
    border-radius: 0.75rem;
    border-width: 0;
    color: white;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    
    background: ${props => props.$isEnabled
    ? `linear-gradient(to right, ${theme.colors.seaGreenLight}, ${theme.colors.seaGreenDark1})`
    : 'gray'};
    cursor: ${props => props.$isEnabled ? 'pointer' : 'not-allowed'};
    opacity: ${props => props.$isEnabled ? 1 : 0.5};
    
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

    @media (max-width: 640px) {
        //width: fit-content;
        padding-right: 0;
        padding-left: 0;
    }
`;