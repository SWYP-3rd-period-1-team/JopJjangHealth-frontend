import React from 'react';
import styles from './MyPage.module.css'; // Assume you have a CSS module for styling

const MyPage = () => {
	const userProfile = {
		username: '직짱인 님',
		userId: 'abcde123'
	};
	
	return (
		<div className={styles.myPageContainer}>
			<div className={styles.profileContainer}>
				<div className={styles.profileImage}>
				</div>
				<div className={styles.profileInfo}>
					<div className={styles.username}>{userProfile.username}</div>
					<div className={styles.userId}>{userProfile.userId}</div>
				</div>
			</div>
			<div className={styles.likedListContainer}>
				<div className={styles.likedTitle}>내가 찜한 리스트</div>
			</div>
		</div>
	);
};

export default MyPage;
