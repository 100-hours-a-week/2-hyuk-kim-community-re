import styled from 'styled-components';

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

    .text-guide {
        width: fit-content;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.79rem;
        text-align: left;
    }

    .helper-text {
        margin: 0;
        margin-top: 0.4rem;
        color: red;
        font-size: 1.2rem;
    }

    input {
        width: 33.3rem;
        height: 2.9rem;
        border-radius: 0.4rem;
        border-width: 0.1rem;
        border-style: solid;
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: transparent;

        &::placeholder {
            font-size: 1.4rem;
            font-weight: 400;
            line-height: 1.6rem;
            text-align: left;
        }
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