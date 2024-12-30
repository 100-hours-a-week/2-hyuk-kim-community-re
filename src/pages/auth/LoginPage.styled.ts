import styled from 'styled-components';
import {COLORS} from "../../styles/colors";

export const LoginPageStyled = styled.div`
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .wrap {
        width: 35.5rem;
        justify-content: center;
    }

    .login #loginText {
        font-size: 3.2rem;
        font-weight: 700;
        line-height: 3.8rem;
        text-align: center;
        margin-top: 0;
        margin-bottom: 6.2rem;
    }

    #article-auth {
        width: 39.2rem;
        margin-top: 1rem;
    }

    .input-group {
        margin-bottom: 2rem;
    }

    .form-login {
        width: 100%;
        height: auto;
        background: ${COLORS.original.white};
        border-radius: 20px;
        padding: 30px;
    }

    .button-purple {
        margin-top: 2.3rem;
        margin-bottom: 1.2rem;
        border-radius: 0.4rem;
        width: 35.5rem;
        height: 3.3rem;
        border: none;
        color: white;
        cursor: pointer;
        background: ${COLORS.original.paleBlue};

        &:disabled {
            cursor: not-allowed;
        }
    }

    .button-text {
        font-size: 1.4rem;
        text-align: center;
        margin: 0;
    cursor: pointer;
    }
`;