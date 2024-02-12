import React, {useEffect, useState} from 'react';
import styles from '../../styles/Find.module.css';
import FindId from './UserId';
import FindPassword from './Password';

const TabComponent: () => JSX.Element = () => {
	const [activeTab, setActiveTab] = useState('');
	
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedTab = localStorage.getItem('activeTab');
			setActiveTab(storedTab);
		}
	}, []);
	
	return (
		<div className={styles.findContainer}>
			<div className={styles.findText}>아이디/ 비밀번호 찾기</div>
			<br/>
			<div className={styles.tabs}>
				<div
					className={`${styles.tabButton} ${activeTab === 'FindId' ? styles.activeTab : ''}`}
					onClick={() => setActiveTab('FindId')}
				>
					아이디 찾기
				</div>
				<div
					className={`${styles.tabButton} ${activeTab === 'FindPassword' ? styles.activeTab : ''}`}
					onClick={() => setActiveTab('FindPassword')}
				>
					비밀번호 찾기
				</div>
			</div>
			<div>
				{activeTab === 'FindId' && <FindId/>}
				{activeTab === 'FindPassword' && <FindPassword/>}
			</div>
		</div>
	);
};

export default TabComponent;
