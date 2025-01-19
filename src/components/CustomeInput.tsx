import React, {useState} from 'react';
import styled from "styled-components";
import {theme} from "@/styles/theme.ts";

const InputField = ({
                        label,
                        type,
                        value,
                        onChange,
                        placeholder,
                        validation,
                        required,
                        disabled = false,
                        maxLength = 500,
                        isTall = false,
                        style,
                    }) => {
    const [helperText, setHelperText] = useState('');
    const [isHelperVisible, setIsHelperVisible] = useState(false);

    const handleChange = (e) => {
        const newValue = e.target.value;
        if (maxLength && newValue.length > maxLength) {
            return; // 최대 길이 초과시 입력 무시
        }
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
            <InputWrapper $hasHelper={isHelperVisible}>

                <FormInput
                    type={type}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={disabled}
                    maxLength={maxLength}
                    $isTall={isTall}
                    />
            {!disabled && <CharacterCount>
                    {value ? value.length : 0}/{maxLength}
                </CharacterCount>}
            {isHelperVisible && (
                <HelperLabel style={{ visibility: 'visible' }}>
                {helperText}
                </HelperLabel>
            )}
            </InputWrapper>
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
const InputWrapper = styled.div<{ $hasHelper: boolean }>`
    position: relative;
    width: 100%;
    margin-bottom: ${props => props.$hasHelper ? '2rem' : '0'};
`;
const FormInput = styled.input<{ disabled: boolean, $isTall: boolean }>`
    width: 100%;
    max-height: 2.2rem;
    padding: 0.6rem 4.5rem 0.6rem 1rem;
    border-radius: 0.5rem;
    border: 2px solid ${theme.colors.gray2};
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;
    font-size: 1rem;
    white-space: pre-line;     // pre-wrap에서 pre-line으로 변경
    word-break: break-all;     // 추가
    overflow-wrap: break-word; // 추가
    resize: none;              // 추가 (사용자가 크기 조절하는 것을 방지)
    
    
  ${props => props.$isTall && `
    max-height: 10rem;
    height: 10rem;
  `}
    
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
const CharacterCount = styled.span`
    position: absolute;
    bottom: 0.5rem;
    right: 1rem;
    font-size: 0.875rem;
    color: ${theme.colors.gray4};
`;
const HelperLabel = styled.label`
    position: absolute;
    bottom: -1rem;
    left: 0;
    color: red;
    font-size: 0.875rem;
`