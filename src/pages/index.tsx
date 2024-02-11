import styles from '../styles/Home.module.css';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import LogoImage from '../../public/assets/Logo.png';
import Head from 'next/head';
import Header from "../components/Header";

const LogoImageView = styled(Image)``;

const Home: () => JSX.Element = () => {
	return (
		<div className={styles.main}>
			<Head>
				<title>직짱건강 | Home</title>
			</Head>
			<div className={styles.header}E>
				<LogoImageView src={LogoImage} alt="로고" width={100} height={100}/>
				<div>직<strong>짱</strong>건강</div>
				<Header/>
			</div>
			<div className={styles.section}>
				<div className={styles.content}>
					<div className={styles.content_basic}>책상에 앉아 일을 많이 하는 당신!</div>
					<div className={styles.content_bold}>현재 건강 상태가 어떤지 체크해볼까요?</div>
					<div className={styles.image}>이미지</div>
					<button className={styles.check}>체크 하러 가기</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
