// components/GlobalLoading.tsx
import styled, { keyframes } from 'styled-components';
import { useLoadingStore } from '@/store/useLoadingStore';
import logo from '@/assets/images/Logo.png';
import {theme} from "@/styles/theme.ts";

export const GlobalLoading = () => {
    const isLoading = useLoadingStore((state) => state.isLoading);

    if (!isLoading) return null;

    return (
        <LoadingOverlay>
            <LoadingContainer>
                <LogoWrapper>
                    <Logo src={logo} alt="Loading" />
                </LogoWrapper>
                <LoadingText>Loading...</LoadingText>
            </LoadingContainer>
        </LoadingOverlay>
    );
};

const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

const pulse = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
`;

const LogoWrapper = styled.div`
    animation: ${pulse} 2s ease-in-out infinite;
`;

const Logo = styled.img`
    width: 60px;
    height: 60px;
`;

const LoadingText = styled.div`
    font-size: 16px;
    color: ${theme.colors.gray4};
    font-weight: 500;
`;