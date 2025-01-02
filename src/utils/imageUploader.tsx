import { useState, useRef, ChangeEvent } from 'react';

export const useImageUpload = () => {
    // 선택된 이미지 파일을 저장하는 state
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    // 이미지 미리보기 URL을 저장하는 state
    const [preview, setPreview] = useState<string>('');
    // 파일 입력 요소에 대한 참조를 저장하는 ref
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // 이미지 파일이 선택될 때 실행되는 핸들러
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // 선택된 첫 번째 파일 가져오기
        const file = e.target.files?.[0];
        if (!file) return;

        // 선택된 파일을 state에 저장
        setSelectedImage(file);
        // FileReader 인스턴스 생성
        const reader = new FileReader();
        // 파일 읽기가 완료되면 실행되는 콜백
        reader.onload = () => {
            // 읽은 결과(base64 문자열)를 미리보기 state에 저장
            setPreview(reader.result as string);
        };
        // 파일을 base64 문자열로 읽기 시작
        reader.readAsDataURL(file);
    };

    // 숨겨진 파일 입력 요소의 클릭 이벤트를 트리거하는 함수
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    // 컴포넌트에서 사용할 값과 함수들을 반환
    return {
        selectedImage,  // 선택된 이미지 파일
        preview,        // 이미지 미리보기 URL
        fileInputRef,   // 파일 입력 요소 참조
        handleImageChange,  // 이미지 선택 핸들러
        triggerFileInput   // 파일 선택 다이얼로그 트리거 함수
    };
};