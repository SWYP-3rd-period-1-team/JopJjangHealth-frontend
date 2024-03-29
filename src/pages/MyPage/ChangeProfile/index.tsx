import React, {SyntheticEvent, useEffect, useState} from 'react';
import Image from 'next/image';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import Layout from '../../../components/common/Layout';
import { validateNickname } from '../../../utils/validation';
import { changeUserNickname, deleteUserProfileImage, fetchUserInfo } from '../../../api/MyPage';
import {
    userInfoState,
    newNicknameState,
    nicknameValidationPassedState,
    nicknameChangeRequestedState,
} from '../../../state/mypage';
import styles from '../../../styles/UserProfile.module.css';
import defaultImg from '../../../../public/assets/myPage/Default.png';
import cancel from "../../../../public/assets/icon/ic_cancel.png";
import useAuthRedirect from '../../../hooks/useAuthRedirect';
import { GetServerSideProps } from 'next';
import { checkUserAuthentication } from '../../../api/auth';
import {errorMessageState} from '../../../state';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const DEFAULT_IMAGE_URL = '/assets/myPage/Default.png';

interface AlertInfo {
    open: boolean;
    message: string;
    severity: 'error' | 'warning' | 'info' | 'success';
}

const UserProfile = () => {
    useAuthRedirect();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [newNickname, setNewNickname] = useRecoilState(newNicknameState);
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
    const [nicknameValidationPassed, setNicknameValidationPassed] = useRecoilState(nicknameValidationPassedState);
    const [nicknameChangeRequested, setNicknameChangeRequested] = useRecoilState(nicknameChangeRequestedState);
    
    useEffect(() => {
        setErrorMessage('');
    }, [setErrorMessage]);
    
    const [alertInfo, setAlertInfo] = useState<AlertInfo>({
        open: false,
        message: '',
        severity: 'info',
    });
    
    const showAlert = (message:any, severity:any) => {
        setAlertInfo({
            open: true,
            message,
            severity:'info',
        });
    };
    
    const handleCloseAlert = (event: Event | SyntheticEvent<Element, Event>, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertInfo({ ...alertInfo, open: false });
    };
    
    const handleNickNameChange = (event: {target: {value: React.SetStateAction<string>;};}) => {
        setNewNickname(event.target.value);
        setErrorMessage('');
        setNicknameChangeRequested(false);
    };
    
    const { data } = useQuery({
        queryKey: ['user_Info'],
        queryFn: fetchUserInfo,
    });
    
    useEffect(() => {
        if (data) {
            setUserInfo(data.data);
            setNewNickname(data.data.nickname);
        }
    }, [data]);
    
    const changeNicknameMutation = useMutation({
        mutationFn: (nickname:string) => changeUserNickname( nickname ),
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(['userInfo']);
            setNicknameChangeRequested(true);
        },
        onError: (error) => {
            setErrorMessage("닉네임 변경 중 오류가 발생했습니다.");
            setNicknameChangeRequested(false);
        },
    });
    
    const handleSubmitChangeNickname = async () => {
        const validationResult = validateNickname(newNickname);
        if (!validationResult) {
            setErrorMessage(validationResult);
            setNicknameValidationPassed(false);
            return;
        }
        setNicknameValidationPassed(true);
        changeNicknameMutation.mutate(newNickname);
        try {
            const response = await changeUserNickname(newNickname);
            if (response?.success) {
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
    
    const deleteUserImageMutation = useMutation({
        mutationFn: deleteUserProfileImage,
        onSuccess: (response) => {
            if(!response.success) {
                throw new Error('Server responded with an error');
            } else {
                showAlert("프로필 이미지가 성공적으로 삭제되었습니다.", 'success');
                setUserInfo(prevUserInfo => ({
                    ...prevUserInfo,
                    profileImage: DEFAULT_IMAGE_URL,
                }));
            }
           
        },
        onError: () => {
            showAlert("프로필 이미지 삭제 중 오류가 발생했습니다.", 'error');
        },
    });
    
    const handleDeleteProfileImage = () => {
        deleteUserImageMutation.mutate();
    };
    
    const refreshUserInfo = async () => {
        const userInfo = await fetchUserInfo();
        if (userInfo) {
            setUserInfo({
                profileImage: userInfo.data.profileImage || defaultImg,
                nickname: userInfo.data.nickname || '',
                userId: userInfo.data.userId || '',
                email: userInfo.data.email || '',
            });
        }
    };
    
    const openPopup = (url: string, text: string): void => {
        const isDefaultImage = userInfo.profileImage === null;
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
        showAlert('회원정보가 저장 되었습니다.', 'success');
        await router.push('/MyPage');
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
                            objectFit={'scale-down'}
                            priority
                        />
                        <div className={styles.profileBroke} onClick={handleDeleteProfileImage}>
                            {userInfo.profileImage && userInfo.profileImage !== DEFAULT_IMAGE_URL ?
                                <><Image src={cancel} alt={'cancel'} /></> : ''}
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
            <Snackbar open={alertInfo.open} autoHideDuration={1500} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alertInfo.severity} sx={{ width: '100%' }}>
                    {alertInfo.message}
                </Alert>
            </Snackbar>
        </Layout>
    );
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return checkUserAuthentication(context);
};
