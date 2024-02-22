import {useRouter} from 'next/router';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import styles from '../../../styles/Survey.module.css';
import React, {useEffect} from "react";
import {useRecoilState} from 'recoil';
import {
	selectedBodyPartState,
	selectedTargetBodyPartState,
	selectedPresentedSymptomState
} from "../../../state/surveyState"
import Vector from "../../../../public/assets/Vector.svg";
import beforeVector from "../../../../public/assets/beforeVector.svg";
import hospitalVector from "../../../../public/assets/hospitalVector.svg";
import {options} from "../../../../mock/SurveyMock";
import ShareButton from "../../../components/Share/ShareButton";
import {IOption} from "../../../types";
import styled from "styled-components";

const OptionDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 84px;
`

const Index = () => {
	const router = useRouter();
	const {id, targetBodyPart, diagnosisPart, presentedSymptom} = router.query;
	
	const [selectedBodyPart, setSelectedBodyPart] = useRecoilState(selectedBodyPartState);
	const [selectedTargetBodyPart, setSelectedTargetBodyPart] = useRecoilState(selectedTargetBodyPartState);
	const [selectedPresentedSymptom, setSelectedPresentedSymptom] = useRecoilState(selectedPresentedSymptomState);
	
	const currentStage = parseInt(id as string, 10);
	
	let currentOptions = options.filter(option => option.stage === currentStage);
	
	if (currentStage === 2 && selectedBodyPart) {
		currentOptions = currentOptions.filter(option => option.targetBodyPart === selectedBodyPart);
	} else if (currentStage === 3 && selectedBodyPart && selectedTargetBodyPart) {
		currentOptions = currentOptions.filter(option =>
			option.targetBodyPart === selectedBodyPart &&
			option.diagnosisPart === selectedTargetBodyPart);
	} else if (currentStage === 4 && selectedBodyPart && selectedTargetBodyPart && selectedPresentedSymptom) {
		currentOptions = currentOptions.filter(option =>
			option.targetBodyPart === selectedBodyPart &&
			option.diagnosisPart === selectedTargetBodyPart &&
			option.presentedSymptom === selectedPresentedSymptom
		);
	}
	
	useEffect(() => {
		if (targetBodyPart !== undefined) {
			// @ts-ignore
			setSelectedBodyPart(targetBodyPart);
		}
		if (diagnosisPart !== undefined) {
			// @ts-ignore
			setSelectedTargetBodyPart(diagnosisPart);
		}
		if (presentedSymptom !== undefined) {
			// @ts-ignore
			setSelectedPresentedSymptom(presentedSymptom);
		}
	}, [router.query, setSelectedBodyPart, setSelectedTargetBodyPart, setSelectedPresentedSymptom]);
	
	const SurveyAskText = () => {
		switch (currentStage) {
			case 1:
				return <>직짱인 님이 <b>체크하고 싶은 부위</b>는 어디인가요?</>;
			case 2:
				return <><b>{"'"}{targetBodyPart}{"'"}</b> 중에서 <b>어떤 부분의 진단</b>이 필요하세요?</>;
			case 3:
				return <> 해당하는 <b>증상</b>을 선택하세요!</>;
			case 4:
				return (
					<>
						<>직짱인 님, <b>이런 증상이 의심</b> 돼요!</>
						<br/>
						<>결과를 토대로 <b>병원을 추천</b> 드릴게요.</>
					</>
				);
			default:
				return <>잘못된 접근입니다. 유효한 설문 페이지를 선택해 주세요.</>;
		}
	};
	
	const SurveyAnswerText = (currentStage: number, option: IOption) => {
		switch (currentStage) {
			case 1:
				return option.targetBodyPart;
			case 2:
				return option.diagnosisPart;
			case 3:
				return option.presentedSymptom;
			case 4:
				return option.disease || option.department;
			default:
				return '';
		}
	}
	
	const goToNextPage = (selectedOption: IOption) => {
		const nextId = currentStage + 1;
		if (nextId <= 4) {
			let query = `/Survey/${nextId}?targetBodyPart=${selectedOption.targetBodyPart}&diagnosisPart=${selectedOption.diagnosisPart}&presentedSymptom=${selectedOption.presentedSymptom}`;
			router.push(query);
		}
	};
	
	const homeButton = () => {
		alert("건강설문 데이터가 없어집니다!")
		router.push("/")
	}
	
	const choiceHospitalButton = (currentOptions: any[]) => {
		const diseases = currentOptions
			.filter((option: { disease?: string }) => option.disease)
			.map((option: { disease: string }) => option.disease);
		const departments = currentOptions
			.filter((option: { department?: string }) => option.department)
			.map((option: { department: string }) => option.department);
		
		if (diseases.length > 0 && departments.length > 0) {
			router.push({
				pathname: "/Search",
				query: {
					disease: diseases.join(','),
					department: departments.join(',')
				}
			});
		}
	};
	
	return (
		<Layout>
			<div className={styles.quizContainer}>
				<div
					className={currentStage < 4 ? styles.question_num : styles.question_complete}>{currentStage < 4 ? currentStage : <>설문
					완료!</>}</div>
				<div className={currentStage < 4 ? styles.question : styles.question_complete_title}>
					<SurveyAskText/>
				</div>
				<div className={currentOptions.length > 10 ? styles.max_options: styles.options}>
					{currentOptions && currentOptions.map(option => (
						<div key={option.id} onClick={() => currentStage < 4 ? goToNextPage(option) : ""}>
							<Image src={option.image} alt="survey-option" className={styles.option} width={100} height={100}/>
							<br/>
							<div className={styles.survey_text}>
								{SurveyAnswerText(currentStage, option)}
							</div>
						</div>
					))}
				</div>
			</div>
			{currentStage > 1 && (
				<>
					<button className={styles.before_button} onClick={() => router.back()}>
						<Image src={beforeVector} alt="BeforeVector" width={10} height={10}/> 전 단계로 돌아가기
					</button>
					{currentStage < 4 && (
						<button className={styles.share_button} onClick={homeButton}>
							<Image src={Vector} alt="Vector" width={10} height={10}/> 직<b>짱</b>건강
						</button>
					)}
				</>
			)}
			{currentStage === 4 && (
				<>
					<button className={styles.share_button} onClick={() => choiceHospitalButton(currentOptions)}>
						추천병원 <Image src={hospitalVector} alt="HospitalVector" width={16} height={16}/>
					</button>
					<ShareButton/>
				</>
			)}
		
		</Layout>
	);
}

export async function getServerSideProps(context: { query: { targetBodyPart: IOption; diagnosisPart: IOption; presentedSymptom: IOption; }; }) {
	const {targetBodyPart, diagnosisPart, presentedSymptom} = context.query;
	
	return {
		props: {
			initialBodyPart: targetBodyPart || null,
			initialTargetBodyPart: diagnosisPart || null,
			initialPresentedSymptom: presentedSymptom || null,
		},
	};
}


export default Index;
