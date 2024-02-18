import {useRouter} from 'next/router';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import styles from '../../../styles/Survey.module.css';
import React, {useEffect, useState} from "react";
import Vector from "../../../../public/assets/Vector.svg";
import BeforeVector from "../../../../public/assets/BeforeVector.svg";
import shareVector from "../../../../public/assets/shareVector.svg";
import {options} from "../../../../mock/SurveyMock";

interface IOption {
	id: number;
	stage: number;
	targetBodyPart?: string;
	diagnosisPart?: string;
	presentedSymptom?: string;
	disease?:string;
	department?:string;
	image:string;
}

const SurveyDetail = () => {
	const router = useRouter();
	const {id, targetBodyPart, diagnosisPart, presentedSymptom} = router.query;
	
	const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(targetBodyPart as string);
	const [selectedTargetBodyPart, setSelectedTargetBodyPart] = useState<string | null>(diagnosisPart as string);
	const [selectedPresentedSymptom, setSelectedPresentedSymptom] =  useState<string | null>(presentedSymptom as string);
	const currentStage = parseInt(id as string,10);
	
	useEffect(() => {
		if (!router.isReady) return;
		
		switch(currentStage) {
			case 2:
				setSelectedBodyPart(targetBodyPart ? decodeURIComponent(targetBodyPart as string) : null);
				break;
			case 3:
				setSelectedBodyPart(targetBodyPart ? decodeURIComponent(targetBodyPart as string) : null);
				setSelectedTargetBodyPart(diagnosisPart ? decodeURIComponent(diagnosisPart as string) : null);
				break;
			case 4:
				setSelectedBodyPart(targetBodyPart ? decodeURIComponent(targetBodyPart as string) : null);
				setSelectedTargetBodyPart(diagnosisPart ? decodeURIComponent(diagnosisPart as string) : null);
				setSelectedPresentedSymptom(presentedSymptom ? decodeURIComponent(presentedSymptom as string) : null);
				break;
		}
	}, [currentStage]);
	
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
			option.presentedSymptom === selectedPresentedSymptom);
	}
	
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
						<>직짱인 님, <b>이런 증상이 의심</b> 돼요!</><br/>
						<>결과를 토대로 <b>병원을 추천</b> 드릴게요.</>
					</>
				);
			default:
				return <>잘못된 접근입니다. 유효한 설문 페이지를 선택해 주세요.</>;
		}
	};
	
	const goToNextPage = (selectedOption: IOption) => {
		const nextId = currentStage + 1;
		if (nextId <= 4) {
			let query = `/Survey/${nextId}?`;
			if (currentStage === 1 && selectedOption.targetBodyPart) {
				query += `targetBodyPart=${selectedOption.targetBodyPart}`;
			} else if (currentStage === 2 && selectedOption.diagnosisPart) {
				query += `targetBodyPart=${selectedBodyPart}&diagnosisPart=${selectedOption.diagnosisPart}`;
			} else if (currentStage === 3 && selectedOption.presentedSymptom) {
				query += `targetBodyPart=${selectedBodyPart}&diagnosisPart=${selectedOption.diagnosisPart}&presentedSymptom=${selectedOption.presentedSymptom}`;
			}
			router.push(query);
		}
	};
	
	const homeButton = () => {
		alert("건강설문 데이터가 없어집니다!")
		router.push("/")
	}
	
	return (
		<Layout>
			<div className={styles.quizContainer}>
				<div className={currentStage < 4 ? styles.question_num: styles.question_complete}>{currentStage < 4 ? currentStage : <>설문 완료!</> }</div>
				<div className={styles.question}>
					<SurveyAskText/>
				</div>
				<div className={styles.options}>
					{currentOptions.map(option => (
						<div key={option.id} onClick={() => goToNextPage(option)}>
							<Image src={option.image} alt="survey-option" className={styles.option} width={100} height={100} />
							<br/>
							<div className={styles.survey_text}>
								{(() => {
									switch (currentStage) {
										case 1:
											return option.targetBodyPart;
										case 2:
											return option.diagnosisPart;
										case 3:
											return option.presentedSymptom;
										case 4 :
											return option.disease||option.department;
									}
								})()}
							</div>

						</div>
					))}
				</div>
			</div>
			{currentStage > 1 && currentStage < 4 &&
					<>
              <button className={styles.before_button} onClick={() => router.back()}><Image src={BeforeVector} alt="BeforeVector" width={10} height={10}/> 전 단계로 돌아가기</button>
              <button className={styles.home_button} onClick={homeButton}><Image src={Vector} alt="Vector" width={10} height={10}/> 직<b>짱</b>건강</button>
					
					</>
			}
			{currentStage === 4 &&
          <>
              <button className={styles.before_button} onClick={() => router.back()}><Image src={BeforeVector} alt="BeforeVector" width={16} height={16}/> 전 단계로 돌아가기</button>
		          <button className={styles.share_button}><Image src={shareVector} alt="Vector" width={16} height={16}/> 공유하기</button>
		          <button className={styles.home_button} onClick={homeButton}><Image src={Vector} alt="Vector" width={16} height={16}/> 직<b>짱</b>건강</button>
          </>
			}
		</Layout>
		);
	}
	
export async function getServerSideProps(context: { query: { targetBodyPart: null, diagnosisPart: null, presentedSymptom:null }}) {
	const initialBodyPart = context.query.targetBodyPart || null;
	const initialTargetBodyPart = context.query.diagnosisPart || null;
	const initialDiagnosisPart = context.query.presentedSymptom || null;
	
	return {
		props: {
			initialBodyPart: initialBodyPart,
			initialTargetBodyPart: initialTargetBodyPart,
			initialDiagnosisPart: initialDiagnosisPart
		},
	};
}

export default SurveyDetail;
