// LogoutModal.tsx
import React from 'react';
import styles from './Logout.module.css'; // This is assuming you have a LogoutModal.module.css

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onLogout }) => {
    if (!isOpen) return null;
    
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2 className={styles.modalTitle}>로그아웃 하시겠습니까?</h2>
                <div className={styles.modalActions}>
                    <button className={styles.modalButton} onClick={onLogout}>네</button>
                    <button className={styles.modalButton} onClick={onClose}>아니요</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
