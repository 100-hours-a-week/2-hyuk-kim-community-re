import { useState, useRef, ChangeEvent } from 'react';

export const useImageLoader = (setProfileUpdate?: (value: boolean) => void) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // 이미지 크기 제한 (15MB in bytes)
    const MAX_FILE_SIZE = 15 * 1024 * 1024;

    // 이전 상태를 저장할 ref 추가
    const previousPreviewRef = useRef<string>('');

    // 이미지 검증 함수
    const validateImage = (file: File): Promise<boolean> => {
        return new Promise((resolve) => {
            // 파일 크기 검사
            if (file.size > MAX_FILE_SIZE) {
                console.warn(`[Image Validation Error] File size too large: ${file.size} bytes`);
                alert('이미지 크기는 15MB 이하여야 합니다.');
                resolve(false);
                return;
            }

            // 허용되는 이미지 MIME 타입 검사
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                console.warn(`[Image Validation Error] Invalid file type: ${file.type}`);
                alert('지원하지 않는 이미지 형식입니다. (JPG, PNG, GIF만 허용)');
                resolve(false);
                return;
            }

            // 이미지 로드하여 추가 검증
            const img = new Image();
            const objectUrl = URL.createObjectURL(file);

            img.onload = () => {
                URL.revokeObjectURL(objectUrl);
                // 이미지가 정상적으로 로드되면 유효한 이미지로 판단
                resolve(true);
            };

            img.onerror = () => {
                URL.revokeObjectURL(objectUrl);
                console.warn('[Image Validation Error] Failed to load image');
                alert('유효하지 않은 이미지 파일입니다.');
                resolve(false);
            };

            img.src = objectUrl;
        });
    };

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // 파일 선택 취소 시 이전 상태 복원
        if (!file) {
            // 이전 미리보기가 있다면 복원
            if (previousPreviewRef.current) {
                setPreview(previousPreviewRef.current);
            }
            return;
        }

        // 이미지 검증
        const isValid = await validateImage(file);
        if (!isValid) {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            // 이전 상태 복원
            if (previousPreviewRef.current) {
                setPreview(previousPreviewRef.current);
            }
            return;
        }

        // 현재 미리보기를 이전 상태로 저장
        previousPreviewRef.current = preview;

        setSelectedImage(file);

        // 이미지 미리보기 생성
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result as string);
            setProfileUpdate?.(true);
        };
        reader.readAsDataURL(file);
    };

    const triggerFileInput = () => {
        // 파일 입력 트리거 전에 현재 미리보기 상태 저장
        previousPreviewRef.current = preview;
        fileInputRef.current?.click();
    };

    // 미리보기 직접 설정 시에도 이전 상태 저장
    const setPreviewWithBackup = (newPreview: string) => {
        previousPreviewRef.current = preview;
        setPreview(newPreview);
    };

    return {
        selectedImage,
        preview,
        fileInputRef,
        setPreview : setPreviewWithBackup,
        handleImageChange,
        triggerFileInput
    };
};