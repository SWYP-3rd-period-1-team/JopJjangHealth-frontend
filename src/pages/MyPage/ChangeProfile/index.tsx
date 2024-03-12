import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import Layout from '../../../components/common/Layout';
import { validateNickname } from '../../../utils/validation';
import { changeUserNickname, deleteUserProfileImage, fetchUserInfo } from '../../../api/mypage';
import {
    userInfoState,
    newNicknameState,
    errorMessageState,
    nicknameValidationPassedState,
    nicknameChangeRequestedState,
} from '../../../state/mypage';
import styles from '../../../styles/UserProfile.module.css';
import defaultImg from '../../../../public/assets/myPage/Default.png';
import cancel from "../../../../public/assets/icon/ic_cancel.png";
import useAuth from '../../../hooks/useAuth';
import { GetServerSideProps } from 'next';
import { checkUserAuthentication } from '../../../utils/auth';

const DEFAULT_IMAGE_URL = '/assets/myPage/Default.png';

const UserProfile = () => {
    useAuth();
    const router = useRouter();
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [newNickname, setNewNickname] = useRecoilState(newNicknameState);
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
    const [nicknameValidationPassed, setNicknameValidationPassed] = useRecoilState(nicknameValidationPassedState);
    const [nicknameChangeRequested, setNicknameChangeRequested] = useRecoilState(nicknameChangeRequestedState);
    const refreshUserInfo = async () => {
        try {
            const response = await fetchUserInfo();
            if (response.success) {
                setUserInfo({
                    profileImage: response.data.profileImage || DEFAULT_IMAGE_URL,
                    nickname: response.data.nickname,
                    userId: response.data.userId,
                    email: response.data.email,
                });
                setNewNickname(response.data.nickname);
            } else {
                setErrorMessage('사용자 정보를 불러오는 데 실패했습니다.');
            }
        } catch (error) {
            setErrorMessage('서버 오류가 발생했습니다.');
        }
    };
    
    useEffect(() => {
        refreshUserInfo();
    }, []);
    
    const handleNickNameChange = (event: {target: {value: React.SetStateAction<string>;};}) => {
        setNewNickname(event.target.value);
        setErrorMessage('');
    };
    
    const handleSubmitChangeNickname = async () => {
        const validationResult = validateNickname(newNickname);
        if (!validationResult) {
            setErrorMessage(validationResult);
            setNicknameValidationPassed(false);
            return;
        }
        setNicknameValidationPassed(true);
        try {
            const response = await changeUserNickname(newNickname);
            if (response?.success) {
                alert(response.data.data.message);
                await refreshUserInfo();
                setNicknameChangeRequested(true);
            } else {
                setErrorMessage(response.message);
                setNicknameChangeRequested(false);
            }
        } catch (error) {
            setErrorMessage('닉네임 변경 중 서버 오류가 발생했습니다.');
        }
    };
    
    const handleDeleteProfileImage = async () => {
        try {
            await deleteUserProfileImage();
            alert('프로필 이미지가 성공적으로 삭제되었습니다.');
            setUserInfo(prev => ({ ...prev, profileImage: DEFAULT_IMAGE_URL }));
        } catch (error) {
            alert('프로필 이미지 삭제 중 오류가 발생했습니다.');
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
        router.push('/MyPage');
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
                            objectFit={"scale-down"}
                        />
                        <div className={styles.profileBroke} onClick={handleDeleteProfileImage }>
                            {userInfo.profileImage && userInfo.profileImage !== DEFAULT_IMAGE_URL ?
                                <><Image src={cancel} alt={"cancel"}/></> : ''}
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
                            onClick={handleSubmitChangeNickname}
                            disabled={!validateNickname(newNickname)}>닉네임 변경하기
                        </button>
                        {errorMessage && (
                            <div className={styles.errorMessage}>
                                {errorMessage}
                            </div>
                        )}
                        <p className={styles.hint}>닉네임은 2번 이상 바꿀 수 없고, 8글자이며 똑같은 닉네임이 없을 경우 가능합니다.</p>
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
    );
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return checkUserAuthentication(context);
};
