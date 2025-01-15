import React from 'react';
import styled from 'styled-components';
import GrayButton from '@/components/GrayButton';
import PrimaryButtonLarge from '@/components/PrimaryButtonLarge';

interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    isLoading: boolean;
    title: string;
}

export const DeleteDialog = ({
                                             isOpen,
                                             onClose,
                                             onConfirm,
                                             isLoading,
                                             title,
                                         }: DeleteDialogProps) => {
    if (!isOpen) return null;

    const handleConfirm = async () => {
        try {
            await onConfirm();
            onClose();
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return (
        <>
            <Overlay onClick={onClose} />
            <DialogContainer onClick={(e) => e.stopPropagation()}>
                <Title>{title}</Title>
                <ButtonContainer>
                    <GrayButton
                        className="아니요"
                        onClick={onClose}
                        // disabled={isLoading}
                    />
                    <PrimaryButtonLarge
                        text="예"
                        onClick={handleConfirm}
                        // disabled={isLoading}
                        $isEnabled={!isLoading}
                    />
                </ButtonContainer>
            </DialogContainer>
        </>
    );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const DialogContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
    
  max-width: 32rem;
  background: white;
  border-radius: 8px;
  padding: 24px;
  z-index: 1001;
`;

const Title = styled.h2`
  text-align: center;
  margin: 0;
  font-size: 16px;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
`;