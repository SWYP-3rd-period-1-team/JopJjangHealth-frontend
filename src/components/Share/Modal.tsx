import React from 'react';
import styles from "../../styles/ShareButton.module.css";
import {ShareModalProps} from '../../types/Layout';

const Modal: React.FC<ShareModalProps> = ({ show, onClose, children }) => {
	if (!show) {
		return null;
	}
	
	return (
		<div className={styles.modal} onClick={onClose}>
			<div>공유하기</div>
			<div className={styles.modal_content} onClick={e => e.stopPropagation()}>
				<span className={styles.close} onClick={onClose}>&times;</span>
				{children}
			</div>
		</div>
	);
};

export default Modal;
