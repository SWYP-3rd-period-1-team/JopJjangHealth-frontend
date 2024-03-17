import React from 'react';
import styles from '../../styles/Find.module.css';
import {useRouter} from 'next/router';

const Complete: React.FC = () => {
    const router = useRouter();
    const {userId} = router.query;
    
    return (
        <div className={styles.findCompleteContainer}>
            {
                userId ?
                    <>
                        <div className={styles.find_complete_Main}> 회원님의 아이디는<br/> {userId} 입니다.</div>
                    </>
                    :
                    <>
                        <div className={styles.find_complete_Main}>
                            회원가입 시 등록하신 이메일로 임시 비밀번호를 발송했습니다.
                        </div>
                        <div className={styles.find_complete_password}>로그인 후에 꼭 비밀번호를 변경해주세요</div>
                    </>
            }
            <button className={styles.findCompleteButton} onClick={() => {
                localStorage.clear();
                window.close()
            }}>로그인하기</button>
        </div>
    );
};

export default Complete;
