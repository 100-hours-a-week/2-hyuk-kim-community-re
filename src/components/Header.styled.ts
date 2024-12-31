import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const HeaderStyled = styled.header`
    width: 100%;
    .header {
        max-width: 100%;
        height: 4rem;
        position: relative;
        background: linear-gradient(to right, #00FFC0, #00C596);
        
    }

    .header-overlay {
        position: absolute;
        inset: 0;
        background:
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px);
        background-size: 20px 20px;
    }

    .header-content {
        max-width: 72rem;  // 주석 해제
        margin: 0 auto;
        width: 100%;
        padding: 0 1.5rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        z-index: 10;
    }

    .header-logo {
        color: ${theme.colors.white};
        font-size: 1.25rem;
        font-weight: bold;
        //margin-right: auto;
    }
    
    .github-container {
           
        //position: absolute;
        //right: 4.5rem;
    }

    .github-link {
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
    }

    .github-link:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .github-icon {
        width: 1.25rem;
        height: 1.25rem;
    }

    @media (max-width: 640px) {
        .header-content {
            width: 100%;
            //flex-direction: row;
            //justify-content: center;
            gap: 0.5rem;
            padding: 0 1rem;
        }

        .header-logo {
            font-size: 1rem;
        }

        .github-link {
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
        }

        .github-icon {
            width: 1rem;
            height: 1rem;
        }
`;