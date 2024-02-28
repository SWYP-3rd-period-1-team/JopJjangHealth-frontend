import React from 'react';
import styles from '../../styles/Logout.module.css';

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
                <p className={styles.modalText}>로그아웃 하시겠습니까?</p>
                <div className={styles.modalActions}>
                    <button onClick={onLogout} className={styles.logoutButton}>확인</button>
                    <button onClick={onClose} className={styles.closeButton}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
