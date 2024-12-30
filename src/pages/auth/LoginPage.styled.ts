import styled from 'styled-components';
import { COLORS } from "../../styles/colors";

export const LoginPageStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #F3F6F6;

    .container {
        width: 100%;
        max-width: 400px;
        padding: 2rem;
    }

    .login #loginText {
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
        margin-top: 0;
        margin-bottom: 2rem;
        color: #009773;
    }

    .form-login {
        width: 100%;
        background: ${COLORS.original.white};
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    #article-auth {
        margin-bottom: 2rem;
    }

    .button-purple {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        border-radius: 0.4rem;
        width: 100%;
        height: 3.3rem;
        border: none;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
        background: linear-gradient(to right, #00FFC0, #00C596);

        &:disabled {
            cursor: not-allowed;
            background: #ACA0EB;
        }

        &:hover:not(:disabled) {
            background: linear-gradient(to right, #00C596, #009773);
        }
    }

    .button-text {
        font-size: 1rem;
        text-align: center;
        margin: 0;
        cursor: pointer;
        color: #00C596;

        &:hover {
            text-decoration: underline;
        }
    }
`;