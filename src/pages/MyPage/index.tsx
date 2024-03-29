import React, {useEffect, useState} from 'react';
import styles from '../../styles/MyPage.module.css';
import Layout from '../../components/common/Layout';
import Link from 'next/link';
import LogoutModal from '../../components/MyPage/Logout';
import {checkUserAuthentication} from '../../api/auth';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import Image from 'next/image';
import LoadingView from '../../components/common/LoadingView';
import {useRecoilState} from 'recoil';
import {showLogoutModalState, userInfoState} from '../../state/mypage';
import {GetServerSideProps} from 'next';
import defaultImg from '../../../public/assets/myPage/Default.png';
import {useQuery_UserInfo} from '../../hooks/react-query';
import {useLogout} from '../../hooks/react-query/useAuth';

const MyPage = () => {
    useAuthRedirect();
    const [isClient, setIsClient] = useState<boolean>(false);
    const {mutate: logout} = useLogout();
    const [showLogoutModal, setShowLogoutModal] = useRecoilState(showLogoutModalState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const {data: userData, isLoading} = useQuery_UserInfo();
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    useEffect(() => {
        if (userData) {
            setUserInfo(userData?.data);
        }
    }, [userData]);
    
    const onLogout = () => {
        logout();
    };
    
    const handleLogoutSectionClick = () => setShowLogoutModal(true);
    
    return (
        <Layout>
            <div className={styles.myPageContainer}>
                {isClient && isLoading ? <LoadingView /> : (
                    <>
                        <div className={styles.profileContainer}>
                            <div className={styles.profileInfo}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        className={styles.profileImage}
                                        src={userInfo?.profileImage ?? defaultImg}
                                        alt={'User Profile'}
                                        width={'150px'}
                                        height={'150px'}
                                        objectFit={'scale-down'}
                                        priority
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
                    </>
                )}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    return checkUserAuthentication(context);
};
