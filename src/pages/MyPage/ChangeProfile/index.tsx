import React from 'react';
import styles from '../../../styles/UserProfile.module.css';
import Layout from '../../../components/Layout';
import Link from 'next/link';

interface UserProfileProps {
    username: string;
    userId: string;
    email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, userId, email }) => {
    const openPopup = (url: string,text:string) => {
        localStorage.setItem('activeTab',text)
        window.open(url, 'popup', 'width=600,height=400');
    };
    
    return (
        <Layout>
            <div className={styles.profileContainer}>
                <div>
                    <div className={styles.profileImage}></div>
                    <div className={styles.profileEdit} onClick={() => openPopup('/MyPage/ChangeProfileImage',"ChangeBasicImage")}>편집하기</div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <div className={styles.likedListContainer}>
                        <span className={styles.userAsk}>닉네임</span>
                        <span className={styles.userAnswer}>직짱인12345</span>
                        <button className={styles.userNameChangeButton}>닉네임 변경하기</button>
                        <p className={styles.hint}>닉네임은 2번 이상 바꿀 수 없고, 8글자이며 똑같은 닉네임이 없을 경우 가능합니다.</p>
                    </div>
                    <div className={styles.likedListContainer}>
                        <span className={styles.userAsk}>아이디</span>
                        <span className={styles.userAnswer}>jickjjangin12</span>
                    </div>
                    <div className={styles.likedListContainer}>
                        <span className={styles.userAsk}>이메일</span>
                        <span className={styles.userAnswer}>jobjjang@naver.com</span>
                    </div>
                </div>
                <button className={styles.editButton}>확인</button>
            </div>
        </Layout>
    );
};

export default UserProfile;
