import React, {useState} from 'react';
import styled from "styled-components";
import {theme} from "@/styles/theme.ts";

const InputField = ({
                        label,
                        type = 'text',
                        value,
                        onChange,
                        placeholder,
                        validation,
                        required,
                        disabled = false,
                    }) => {
    const [helperText, setHelperText] = useState('');
    const [isHelperVisible, setIsHelperVisible] = useState(false);

    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue);

        if (validation) {
            // [변경] validation 함수가 객체를 반환하도록 수정
            const validationResult = validation(newValue);
            setHelperText(validationResult.message || '');
            setIsHelperVisible(!!validationResult.message);
        }
    };
    return (
        <InputGroup>
            <FormLabel required={required}>{label}</FormLabel>
                <FormInput
                    type={type}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={disabled}
                    />
            {isHelperVisible && (
                <HelperLabel style={{ visibility: 'visible' }}>
                {helperText}
                </HelperLabel>
            )}
        </InputGroup>
);
};

export default InputField;

const InputGroup = styled.div`
    width: 100%;
`

const FormLabel = styled.label<{ required: boolean }>`
    display: block;
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: ${theme.colors.gray6};

    ${props => props.required && `
       &::after {
           content: '*';
           color: red;
           margin-left: 4px;
       }
   `}
`;

const FormInput = styled.input<{ disabled: boolean }>`
    width: 100%;
    max-height: 30px;
    padding: 0.6rem 1rem;
    border-radius: 0.5rem;
    border: 2px solid ${theme.colors.gray2};
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;
    font-size: 1rem;

    
  ${props => props.disabled && `
    cursor: not-allowed;
    pointer-events: none;
    background-color: #f5f5f5;
  `}
    
    &:focus {
        border-color: ${theme.colors.seaGreenDark2};
        box-shadow: 0 0 0 4px rgba(0, 197, 150, 0.1);
    }
`;

const HelperLabel = styled.label`
    margin: 0;
    margin-top: 0.4rem;
    padding-left: 1rem;
    color: red;
    font-size: 0.875rem;
`