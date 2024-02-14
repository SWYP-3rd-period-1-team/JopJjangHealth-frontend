import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import styles from '../../../styles/Survey.module.css';
import React from "react";

interface IOption {
	id: number;
	stage: number;
	bodyPart?: string;
	gender?: string;
	disease?: string;
	image: string;
}

// 목업 데이터: 각 단계의 옵션
const options: IOption[] = [
	// 1단계 옵션
	{ id: 1, stage: 1, bodyPart: '생식기', image: "/assets/survey/생식기.png" },
	{ id: 2, stage: 1, bodyPart: '눈', image: "/assets/survey/눈.png" },
	{ id: 3, stage: 1, bodyPart: '코, 귀, 목', image: "/assets/survey/코,귀,목.png" },
	{ id: 4, stage: 1, bodyPart: '피부', image: "/assets/survey/피부.png" },
	{ id: 5, stage: 1, bodyPart: '배, 가슴', image: "/assets/survey/배,가슴.png" },
	
	// 2단계 옵션
	{ id: 1, stage: 2, bodyPart: "생식기", gender: '여자', image: "/assets/survey/여자.png" },
	{ id: 2, stage: 2, bodyPart: "생식기", gender: '남자', image: "/assets/survey/남자.png" },
	{ id: 3, stage: 2, bodyPart: "생식기", gender: '항문,대변', image: "/assets/survey/항문,대변.png" },
	{ id: 4, stage: 2, bodyPart: "생식기", gender: '소변', image: "/assets/survey/소변.png" },
	
	// 3단계 옵션
	{ id: 1, stage: 3, bodyPart: "생식기", gender: "여자", disease: '생리불규칙', image: "" },
	{ id: 2, stage: 3, bodyPart: "생식기", gender: "여자", disease: '냉의 불쾌한 냄새', image: "" },
	{ id: 3, stage: 3, bodyPart: "생식기", gender: "여자", disease: '생리전 심경 변화', image: "" },
	{ id: 4, stage: 3, bodyPart: "생식기", gender: "여자", disease: '간지러움', image: "" },
];

const SurveyDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const currentStage = parseInt(id as string);
	
	const currentOptions = options.filter(option => option.stage === currentStage);
	
	const SurveyAskText = ({ id }) => {
		switch (id) {
			case "1":
				return <>직짱인 님이 <b>체크하고 싶은 부위</b>는 어디인가요?</>;
			case "2":
				return <>선택한 부위에 대한 <b>성별을 선택</b>해주세요.</>;
			case "3":
				return <>해당하는 <b>증상</b>을 선택하세요!</>;
			default:
				return <>잘못된 접근입니다. 유효한 설문 페이지를 선택해 주세요.</>;
		}
	};
	
	const goToNextPage = () => {
		const nextId = currentStage + 1;
		if(nextId < 4) {
			router.push(`/Survey/${nextId}`);
		}
	};
	
	return (
		<Layout>
			<div className={styles.quizContainer}>
				<div className={styles.question_num}>{id}</div>
				<div className={styles.question}>
					<SurveyAskText id={id} />
				</div>
				<div className={styles.options}>
					{currentOptions.map(option => (
						<div key={option.id} onClick={() => goToNextPage()}>
							<Image src={option.image} alt="survey option" className={styles.option} width={100} height={100} />
							<br/>
							<div>
								{(() => {
									switch (currentStage) {
										case 1:
											return option.bodyPart;
										case 2:
											return option.gender;
										case 3:
											return option.disease;
										default:
											return null;
									}
								})()}
							</div>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default SurveyDetail;
