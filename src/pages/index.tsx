import styles from '../styles/Home.module.css';
import React from 'react';
import Image from 'next/image';
import OnBoarding from '../../public/assets/Animation.gif';
import Layout from "../components/Layout";
import {router} from "next/client";

const Home: () => JSX.Element = () => {
	return (
		<Layout>
			<div className={styles.content_basic}>책상에 앉아 일을 많이 하는 당신!</div>
			<div className={styles.content_bold}>현재 건강 상태가 어떤지 체크해볼까요?</div>
			<div className={styles.image_container}> {/* CSS 모듈 클래스 적용 */}
				<Image src={OnBoarding} alt="온보딩"/>
			</div>
			<button className={styles.check} onClick={() => router.push("/Survey")}>체크 하러 가기</button>
		</Layout>
	);
};

export default Home;
