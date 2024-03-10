import React, {useState, useEffect} from 'react';
import styles from '../../../styles/UserProfile.module.css';
import Layout from '../../../components/Layout';
import {validateNickname} from '../../../utils/validation';
import {useRouter} from 'next/router';
import {changeUserNickname, deleteUserProfileImage, fetchUserInfo} from '../../../api/mypage';
import {checkUserAuthentication} from '../../../utils/auth';
import {GetServerSideProps} from 'next';
import useAuth from '../../../hooks/useAuth';
import defaultImg from '../../../../public/assets/myPage/Default.png';
import Image from 'next/image';

const DEFAULT_IMAGE_URL = '/assets/myPage/Default.png';

const UserProfile = () => {
    useAuth();
    const router = useRouter();
    const [userInfo, setUserInfo] = useState(
        {
            profileImage: '',
            nickname: '',
            userId: '',
            email: '',
        },
    );
    const [newNickname, setNewNickname] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [nicknameValidationPassed, setNicknameValidationPassed] = useState(true);
    const [nicknameChangeRequested, setNicknameChangeRequested] = useState(true);
    
    useEffect(() => {
        const loadUserInfo = async () => {
            const userInfo = await fetchUserInfo();
            if (userInfo) {
                setUserInfo({
                    profileImage: userInfo.data.data.profileImage || defaultImg,
                    nickname: userInfo.data.data.nickname || '',
                    userId: userInfo.data.data.userId || '',
                    email: userInfo.data.data.email || '',
                });
            }
        };
        loadUserInfo();
    }, []);
    
    useEffect(() => {
        setNewNickname(userInfo.nickname);
    }, [userInfo]);
    
    const handleNickNameChange = (event: {target: {value: React.SetStateAction<string>;};}) => {
        setNewNickname(event.target.value);
        setErrorMessage('');
        setNicknameChangeRequested(false);
    };
    
    const changeNickname = async () => {
        const validationResult = validateNickname(newNickname);
        if (validationResult !== true) {
            setErrorMessage(validationResult);
            setNicknameValidationPassed(false);
            return;
        }
        setNicknameValidationPassed(true);
        const response = await changeUserNickname(newNickname);
        if (response?.success) {
            alert(response.data.data.message);
            setUserInfo({...userInfo, nickname: newNickname});
            setNicknameChangeRequested(true);
        } else {
            setErrorMessage(response.message);
            setNicknameChangeRequested(false);
        }
    };
    
    const refreshUserInfo = async () => {
        const userInfo = await fetchUserInfo();
        if (userInfo) {
            setUserInfo({
                profileImage: userInfo.data.data.profileImage || defaultImg,
                nickname: userInfo.data.data.nickname || '',
                userId: userInfo.data.data.userId || '',
                email: userInfo.data.data.email || '',
            });
        }
    };
    
    const openPopup = (url: string, text: string): void => {
        const isDefaultImage = userInfo.profileImage === DEFAULT_IMAGE_URL;
        localStorage.setItem('activeTab', text);
        localStorage.setItem('isDefaultImage', isDefaultImage ? 'true' : 'false');
        const popup: Window | null = window.open(url, 'popup', 'width=800,height=800');
        
        if (popup) {
            const interval = setInterval(() => {
                if (popup.closed) {
                    clearInterval(interval);
                    refreshUserInfo();
                }
            }, 1000);
        }
    };
    
    
    const onSubmit = async () => {
        alert('회원정보가 저장 되었습니다.');
        router.push('/Mypage');
    };
    
    const deleteProfile = async () => {
        alert('프로필 사진이 삭제 됩니다!');
        try {
            await deleteUserProfileImage();
            setUserInfo(userInfo => ({
                ...userInfo,
                profileImage: DEFAULT_IMAGE_URL,
            }));
        } catch (error) {
            console.error('프로필 사진 삭제 중 오류 발생:', error);
        }
    };

    return (
        <Layout>
            <div className={styles.profileContainer}>
                <>
                    <div className={styles.imageContainer}>
                        <Image
                            className={styles.profileImage}
                            src={userInfo?.profileImage ?? defaultImg}
                            alt={'User Profile'}
                            width={'150px'}
                            height={'150px'}
                        />
                        <div className={styles.profileBroke} onClick={deleteProfile}>
                            {userInfo.profileImage && userInfo.profileImage !== DEFAULT_IMAGE_URL ? <>X</> : ''}
                        </div>
                    </div>
                    <div className={styles.profileEdit}
                         onClick={() => openPopup('/MyPage/ChangeProfileImage', 'ChangeBasicImage')}>편집하기
                    </div>
                </>
                <div style={{marginTop: '20px'}}>
                    <div className={styles.likedListContainer}>
                        <span className={styles.userAsk}>닉네임</span>
                        <input
                            type="text"
                            value={newNickname}
                            onChange={handleNickNameChange}
                            className={styles.userAnswer}
                        />
                        <button
                            className={styles.userNameChangeButton}
                            onClick={changeNickname}
                            disabled={!validateNickname(newNickname)}>닉네임 변경하기
                        </button>
                        {errorMessage && (
                            <div className={styles.errorMessage}>
                                {errorMessage}
                            </div>
                        )}
                        <p className={styles.hint}>닉네임은 영어와 한글을 포함하여 8자 이하이어야 합니다.</p>
                    </div>
                    <div className={styles.likedListContainer}>
                        <span className={styles.userAsk}>아이디</span>
                        <input
                            type="text"
                            value={userInfo.userId}
                            className={styles.userAnswer}
                            readOnly={true}
                        />
                    </div>
                    <div className={styles.likedListContainer}>
                        <span className={styles.userAsk}>이메일</span>
                        <input
                            type="text"
                            value={userInfo.email}
                            className={styles.userAnswer}
                            readOnly={true}
                        />
                    </div>
                </div>
                <button
                    onClick={onSubmit}
                    className={styles.editButton}
                    disabled={!nicknameValidationPassed || !nicknameChangeRequested}>확인
                </button>
            </div>
        </Layout>
    )
        ;
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return checkUserAuthentication(context);
};
