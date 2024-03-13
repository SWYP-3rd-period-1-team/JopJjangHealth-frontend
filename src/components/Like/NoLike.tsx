import React from 'react';
import styles from '../../styles/Like.module.css';
import Link from 'next/link';

const NoLike = () => {
    return (
        <div className={styles.no_hospitals}>
            <div className={styles.no_like}>찜한 병원이 없네요!</div>
            <div className={styles.no_like_text}><b>건강 설문</b>을 통해 <b>병원을 추천</b>받아볼까요?</div>
            <Link href={'/'}>
                <button className={styles.click_survey}>건강 설문하러 가기</button>
            </Link>
        </div>
    );
};

export default NoLike;
