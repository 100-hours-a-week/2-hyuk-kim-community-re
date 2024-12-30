import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const HeaderStyled = styled.header`
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 10vh;
        border-bottom: #EDECF7 solid 1px;
        border-radius: 0 0 10px 10px;
        position: relative;
        background: ${theme.colors.white};
        margin-left: auto;
        margin-right: auto;
    }

    .logo {
        /* rem 대신 vw 사용 */
        width: 20vw;  /* 뷰포트 너비의 20% */
        font-size: clamp(2rem, 4vw, 3.2rem);  /* 최소 2rem, 최대 3.2rem */
        line-height: 1;  /* font-size에 비례하도록 설정 */
        text-align: center;
        margin-left: 13.3rem;
        margin-right: 13.3rem;
        font: ${({ theme }) => theme.font.bold};
    }


    .button-back {
        width: 4rem;
        height: 4rem;
        border: none;
        background: none;
        cursor: pointer;
        padding: 0;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .button-profile {
        width: 3.6rem;
        height: 3.6rem;
        position: relative;
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
    }

    .button-profile-img {
        width: 3.6rem;
        height: 3.6rem;
        object-fit: cover;
        border-radius: 50%;
    }

    .menu-container {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .menu-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 11.7rem;
        height: 3.5rem;
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 1.452rem;
        background: #d9d9d9;
        border: none;
        margin: 0;
        cursor: pointer;

        &:hover {
            background-color: #e9e9e9;
        }
    }
`;