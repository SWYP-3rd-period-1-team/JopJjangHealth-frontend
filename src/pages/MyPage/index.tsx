import React, {useEffect, useState} from 'react';
import styles from '../../styles/MyPage.module.css';
import Layout from '../../components/Layout';
import Link from 'next/link';
import LogoutModal from '../../components/MyPage/Logout';
import {logout} from '../../utils/auth';
import useToken from '../../hooks/useToken';
import axiosInstance from '../../api/axiosInstance';
// import Image from 'next/image';

const MyPage = () => {
    const {logoutDeleteToken, getTokenValue} = useToken();
    const refreshToken = getTokenValue('zzgg_rt');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [userInfo, setUserInfo] = useState(
        {
            profileImage: '',
            nickname: '',
            userId: '',
            email: '',
        },
    );
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get('/api/members/my-page');
                setUserInfo(response.data.data);
            } catch (error) {
                console.error('사용자 정보 가져오기 실패:', error);
            }
        };
        fetchUserInfo();
    }, []);
    
    
    const onLogout = async () => {
        localStorage.clear();
        logoutDeleteToken();
        // todo : 토큰이 안보내지고 있는거 같다.
        await logout();
    };
    
    const handleLogoutSectionClick = () => {
        setShowLogoutModal(true);
    };
    
    return (
        <Layout>
            <div className={styles.myPageContainer}>
                <div className={styles.profileContainer}>
                    <div className={styles.profileInfo}>
                        <img
                            className={styles.profileImage}
                            src={userInfo?.profileImage ?? '/default.png'}
                            alt={'User Profile'}
                        />
                        <div className={styles.profileText}>
                            <span className={styles.username}>{userInfo?.nickname}</span>
                            <span className={styles.username}>
								<Link href={'/MyPage/ChangeProfile'}>
									   <button className={styles.userbutton}>프로필 변경하기</button>
								</Link>
              </span>
                            <div className={styles.userId}>{userInfo?.userId}</div>
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
                        onLogout();
                        setShowLogoutModal(false);
                    }}
                />}
            </div>
        </Layout>
    );
};

export default MyPage;
