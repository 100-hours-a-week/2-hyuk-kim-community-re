import styled from 'styled-components';
import {COLORS} from "../styles/colors";

export const CustomInputStyled = styled.div`
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
        background-color: ${COLORS.original.white};

        &::placeholder {
            font-size: 1.4rem;
            font-weight: 400;
            line-height: 1.6rem;
            text-align: left;
        }
    }
`