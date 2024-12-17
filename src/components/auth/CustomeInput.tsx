import React, {useState} from 'react';

const InputField = ({
                        label,
                        type = 'text',
                        value,
                        onChange,
                        placeholder,
                        validation,
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
        <div className="input-group">
        <p className="text-guide">{label}</p>
            <input
    type={type}
    value={value}
    onChange={handleChange}
    placeholder={placeholder}
    />
    {isHelperVisible && (
        <p className="helper-text" style={{ visibility: 'visible' }}>
        {helperText}
        </p>
    )}
    </div>
);
};

export default InputField;