import React, {useEffect, useState} from 'react';
import styles from '../../styles/MyPage.module.css';
import Layout from '../../components/Layout';
import Link from 'next/link';
import LogoutModal from '../../components/MyPage/Logout';
import {checkUserAuthentication, logout} from '../../utils/auth';
import useToken from '../../hooks/useToken';
import axiosInstance from '../../api/axiosInstance';
import useAuth from '../../hooks/useAuth';
import {GetServerSideProps} from 'next';
import defaultImg from "../../../public/assets/myPage/Default.png";
import Image, {StaticImageData} from 'next/image';
import {useRouter} from 'next/router';
import LoadingView from '../../components/common/LoadingView';

interface UserInfo {
    profileImage: StaticImageData | string;
    nickname: string;
    userId: string;
    email: string;
}

const MyPage = () => {
    useAuth();
    const { getTokenValue, logoutDeleteToken } = useToken();
    const router = useRouter();
    const refreshToken = getTokenValue('zzgg_rt');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        profileImage: defaultImg,
        nickname: '',
        userId: '',
        email: '',
    });
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get('/api/members/my-page');
                setUserInfo(response.data.data);
            } catch (error) {
                console.error('사용자 정보 가져오기 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserInfo();
    }, []);
    
    
    const onLogout = async () => {
        if (refreshToken) {
            const response = await logout(refreshToken);
            if (response?.data?.blacklist?.length !== 0) {
                logoutDeleteToken();
                await router.push('/Home');
            } else {
                alert(response?.data?.message);
            }
        }
    };
    
    const handleLogoutSectionClick = () => {
        setShowLogoutModal(true);
    };
    
    return (
        <Layout>
            {isLoading ?
                <LoadingView/> :
                <>
                    <div className={styles.myPageContainer}>
                        <div className={styles.profileContainer}>
                            <div className={styles.profileInfo}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        className={styles.profileImage}
                                        src={userInfo?.profileImage ?? defaultImg}
                                        alt={'User Profile'}
                                        width={'150px'}
                                        height={'150px'}
                                        objectFit={"scale-down"}
                                    />
                                </div>
                                <div className={styles.profileText}>
                                    <span className={styles.username}>{userInfo?.nickname}</span>
                                    <span className={styles.username}>
								<Link href={'/MyPage/ChangeProfile'}>
									   <button className={styles.userButton}>프로필 변경하기</button>
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
                </>
            }
        
        </Layout>
    );
};

export default MyPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return checkUserAuthentication(context);
};
