import React from 'react';
import Layout from "../../components/Layout";
import styles from "../../styles/Like.module.css";
import Link from 'next/link';

const Like = () => {
	// 찜한 병원 목업 데이터 예제
	const hospitals = [
		{id: 1, name: "소나무 한의원", date: "2024. 02. 15", address: "경기도 고양시 덕양구 종경로", distance: "255m"},
		{id: 2, name: "메이플 클리닉", date: "2024. 02. 16", address: "서울시 강남구 논현로", distance: "300m"},
	];
	
	return (
		<Layout>
			<div className={styles.like_text}><b>직짱인 님</b>의 <b>찜한</b> 병원 리스트</div>
			<div className={styles.like_container}>
				{hospitals.length > 0 ?
					<>
						{hospitals.map(hospital => (
							<div key={hospital.id} className={styles.like_item_container}>
								<div className={styles.title}>
									{hospital.name}
								</div>
								<div className={styles.date}>{hospital.date} 찜</div>
								<div className={styles.title}>
									<span className={styles.place}>{hospital.address}</span>
									{" "}|{" "}
									<span className={styles.district}>{hospital.distance} 떨어져 있습니다.</span>
								</div>
								
								<div className={styles.delete}>삭제</div>
							</div>
						))}
					</>
					:
					<div className={styles.no_hospitals}>
						<div className={styles.no_like}>찜한 병원이 없네요!</div>
						<div className={styles.no_like_text}><b>건강 설문</b>을 통해 <b>병원을 추천</b>받아볼까요?</div>
						<Link href={"/"}>
							<div className={styles.click_survey}>건강 설문하러 가기</div>
						</Link>
					
					</div>
				}
			
			
			</div>
		</Layout>
	);
};

export default Like;
