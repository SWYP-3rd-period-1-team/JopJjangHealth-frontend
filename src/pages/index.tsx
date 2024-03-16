import styles from '../styles/OnBoarding.module.css';
import React from 'react';
import Image from 'next/image';
import OnBoarding from '../../public/assets/onBoarding/onBoarding.png';
import Layout from "../components/common/Layout";
import {useRouter} from 'next/router';

const Index: React.FC = () => {
	const router = useRouter();
	
	return (
		<Layout>
			<div className={styles.content_basic}>책상에 앉아 일을 많이 하는 당신!</div>
			<div className={styles.content_bold}>현재 건강 상태가 어떤지 체크해볼까요?</div>
			<div className={styles.image_container}>
				<Image
					src={OnBoarding}
					alt="온보딩 이미지"
					objectFit="cover"
					priority
				/>
			</div>
			<button className={styles.check} onClick={() => router.push("/Survey/1")}>체크 하러 가기</button>
		</Layout>
	);
};

export default Index;
