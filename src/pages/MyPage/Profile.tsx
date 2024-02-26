import React from 'react';
import styles from './ChangeProfile/UserProfile.module.css'; // 가정한 CSS 모듈 파일 경로

interface UserProfileProps {
    username: string;
    userId: string;
    email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, userId, email }) => {
    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileImage}></div>
            <div className={styles.profileInfo}>
                <div className={styles.userName}>{username}</div>
                <div className={styles.userId}>{userId}</div>
                <div className={styles.userEmail}>{email}</div>
            </div>
            <button className={styles.editButton}>편집</button>
        </div>
    );
};

export default UserProfile;
