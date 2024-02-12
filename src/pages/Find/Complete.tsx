import React from 'react';
import styles from '../../styles/Find.module.css';

const Complete: () => JSX.Element = () => {

	return (
			<div className={styles.findContainer}>
				<div className={styles.find_complete}>회원님의 임시 비밀번호는 ${"0000000"} 입니다.</div>
				<div className={styles.find_complete}>로그인 후에 꼭 비밀번호를 변경해주세요</div>
				<button className={styles.findButton}>로그인 하기</button>
			</div>
	);
};

export default Complete;
