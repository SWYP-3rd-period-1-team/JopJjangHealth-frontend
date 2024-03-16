import styles from '../../styles/Home.module.css';
import React from 'react';
import Layout from "../../components/common/Layout";
import {useRouter} from 'next/router';
import Image from 'next/image';
import late_work from "../../../public/assets/home/late_work.png";
import calendar from "../../../public/assets/home/calendar.png";

const Index: React.FC = () => {
	const router = useRouter();
	
	return (
		<Layout>
			<div className={styles.home_container}>
				<div className={styles.input_group}>
					<input type="text" className={styles.input_field} placeholder="찾고자 하는 병원/약국을 주변에서 검색해보세요!" />
					<button className={styles.search_button}>검색</button>
				</div>
				<div>
					<div className={styles.home} onClick={() => {router.push("/Survey")}}>
						<Image src={late_work} priority alt="late_work" className={styles.homeImage}/>
						<div className={styles.home_text}>오래 앉아 있고 야근이 잦은 나</div>
						<div className={styles.home_detail}>내 건강 상태는 괜찮을까?</div>
						<div className={styles.home_title}>간단설문</div>
					</div>
					<div className={styles.home_right} onClick={() => {router.push("/Calendar")}}>
						<Image src={calendar} priority alt="calendar" className={styles.homeImage}/>
						<div className={styles.home_text}>건강 관리를 한눈에, 간편하게!</div>
						<div className={styles.home_title}>질병 캘린더</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Index;
