import React, {useEffect, useState} from 'react';
import styles from '../../../../../JopJjangHealth-frontend_stage/src/styles/Find.module.css';
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
			<div className={styles.tabs}>
				<div
					className={`${styles.tabButton} ${activeTab === 'FindId' ? styles.activeTab : ''}`}
					onClick={() => setActiveTab('FindId')}
				>
					기본 사진
				</div>
				<div
					className={`${styles.tabButton} ${activeTab === 'FindPassword' ? styles.activeTab : ''}`}
					onClick={() => setActiveTab('FindPassword')}
				>
					갤러리에서 불러오기
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
