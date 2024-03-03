import React from 'react';
import styles from '../../styles/LoginConfirmPopup.module.css';

interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

const LoginConfirmPopup: React.FC<Props> = ({ onConfirm, onCancel }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h3 className={styles.title}>로그인 하시겠습니까?</h3>
                <h5 className={styles.message}>로그인 없이는 건강 설문지 조회 불가, 추천 병원 이동만 가능합니다.</h5>
                <h5 className={styles.message}>로그인으로 더 많은 혜택을 얻으세요.</h5>
                
                <div className={styles.actions}>
                    <button className={styles.loginButton} onClick={onConfirm}>예</button>
                    <button className={styles.cancelButton} onClick={onCancel}>아니요</button>
                </div>
            </div>
        </div>
    );
};

export default LoginConfirmPopup;
