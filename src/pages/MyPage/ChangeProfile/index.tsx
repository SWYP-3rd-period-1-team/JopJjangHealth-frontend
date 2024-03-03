import React, {useState, useEffect} from 'react';
import styles from '../../../styles/UserProfile.module.css';
import Layout from '../../../components/Layout';
import {validateNickname} from '../../../utils/validation';
import {useRouter} from 'next/router';
import {changeUserNickname, fetchUserInfo} from '../../../api/mypage';
// import Image from 'next/image';

const UserProfile = () => {
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
    const [errorMessage, setErrorMessage] = useState('');
    const [nicknameValidationPassed, setNicknameValidationPassed] = useState(true);
    const [nicknameChangeRequested, setNicknameChangeRequested] = useState(true);
    
    useEffect(() => {
        const loadUserInfo = async () => {
            const userInfo = await fetchUserInfo();
            if (userInfo) {
                setUserInfo({
                    profileImage: userInfo.data.profileImage || '',
                    nickname: userInfo.data.nickname || '',
                    userId: userInfo.data.userId || '',
                    email: userInfo.data.email || '',
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
        try {
            const success = await changeUserNickname(newNickname);
            if (success) {
                console.log('닉네임이 성공적으로 변경되었습니다.');
                setUserInfo({...userInfo, nickname: newNickname});
                setNicknameChangeRequested(true);
            }
        } catch (error) {
            console.error('닉네임 변경 중 오류 발생:', error);
            setErrorMessage('닉네임 변경에 실패했습니다.');
            setNicknameChangeRequested(false);
        }
    };
    
    const openPopup = (url: string, text: string) => {
        localStorage.setItem('activeTab', text);
        window.open(url, 'popup', 'width=600,height=400');
    };
    
    const onSubmit = async () => {
        alert('회원정보가 저장 되었습니다.');
        router.push('/Mypage');
    };
    
    return (
        <Layout>
            <div className={styles.profileContainer}>
                <div>
                    <img
                        className={styles.profileImage}
                        src={userInfo?.profileImage ?? '/default.png'}
                        alt={'User Profile'}
                    />
                    <div className={styles.profileEdit}
                         onClick={() => openPopup('/MyPage/ChangeProfileImage', 'ChangeBasicImage')}>편집하기
                    </div>
                </div>
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
                        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
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
