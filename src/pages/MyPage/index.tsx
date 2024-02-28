import React, {useState} from 'react';
import styles from '../../styles/MyPage.module.css';
import Layout from '../../components/Layout';
import Link from 'next/link';
import LogoutModal from '../../components/Mypage/Logout';
import {logout} from '../../utils/auth';

const MyPage = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const userProfile = {
        username: '직짱인 님',
        userId: 'abcde123',
    };
    
    const handleLogoutSectionClick = () => {
        setShowLogoutModal(true); // This will trigger the modal to open
    };
    
    return (
        <Layout>
            <div className={styles.myPageContainer}>
                <div className={styles.profileContainer}>
                    <div className={styles.profileInfo}>
                        <div className={styles.profileImage} />
                        <div className={styles.profileText}>
                            <span className={styles.username}>{userProfile.username}</span>
                            <span className={styles.username}>
								<Link href={'/MyPage/ChangeProfile'}>
									   <button className={styles.userbutton}>프로필 변경하기</button>
								</Link>
              </span>
                            <div className={styles.userId}>{userProfile.userId}</div>
                        </div>
                    </div>
                </div>
                <Link href={'/MyPage/MySurveyList'}>
                    <div className={styles.likedListContainer}>나의 질병 리스트</div>
                </Link>
                <Link href={'/MyPage/ChangePassword'}>
                    <a className={styles.likedListContainer}>비밀번호 변경</a>
                </Link>
                <div className={styles.likedListContainer} onClick={handleLogoutSectionClick}>
                    로그아웃
                </div>
                {showLogoutModal && <LogoutModal
                    isOpen={showLogoutModal}
                    onClose={() => setShowLogoutModal(false)}
                    onLogout={() => {
                        logout()
                        setShowLogoutModal(false);
                    }}
                />}
            </div>
        </Layout>
    );
};

export default MyPage;