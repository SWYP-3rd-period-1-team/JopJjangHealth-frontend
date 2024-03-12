import React from 'react';

export interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

export interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
}

export interface KakaoShareButtonProps {
    text: string;
}

export interface ShareModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export interface LoginConfirmPopupProps {
    onConfirm: () => void;
    onCancel: () => void;
}
