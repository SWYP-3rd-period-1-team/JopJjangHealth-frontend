import {useRouter} from 'next/router';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import styles from '../../../styles/Survey.module.css';
import React, {useEffect, useState} from "react";

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
	// 1단계 옵션: 주요 부위
	{id: 1, stage: 1, bodyPart: "생식기", image: "/assets/survey/생식기.png"},
	{id: 2, stage: 1, bodyPart: "눈", image: "/assets/survey/눈.png"},
	{id: 3, stage: 1, bodyPart: "코, 귀, 목", image: "/assets/survey/코,귀,목.png"},
	{id: 4, stage: 1, bodyPart: "피부", image: "/assets/survey/피부.png"},
	{id: 5, stage: 1, bodyPart: "배, 가슴", image: "/assets/survey/배,가슴.png"},
	{id: 6, stage: 1, bodyPart: "팔, 다리, 어깨", image: "/assets/survey/팔,다리,어깨.png"},
	
	//  2단계 옵션: 세부 분류 예시
	{id: 1, stage: 2, bodyPart: "생식기", gender: "여자", image: "/assets/survey/여자.png"},
	{id: 2, stage: 2, bodyPart: "생식기", gender: "남자", image: "/assets/survey/남자.png"},
	{id: 3, stage: 2, bodyPart: "생식기", gender: "항문, 대변", image: "/assets/survey/항문,대변.png"},
	{id: 4, stage: 2, bodyPart: "생식기", gender: "소변", image: "/assets/survey/소변.png"},
	{id: 5, stage: 2, bodyPart: "눈", gender: "백내장", image: "/assets/survey/백내장.png"},
	{id: 6, stage: 2, bodyPart: "눈", gender: "녹내장", image: "/assets/survey/녹내장.png"},
	{id: 7, stage: 2, bodyPart: "눈", gender: "안질환", image: "/assets/survey/안질환.png"},
	{id: 8, stage: 2, bodyPart: "눈", gender: "단순한 시력 저하", image: "/assets/survey/단순한시력저하.png"},
	{id: 9, stage: 2, bodyPart: "눈", gender: "각막염, 안구 건조증", image: "/assets/survey/각막염,안구 건조증.png"},
	{id: 10, stage: 2, bodyPart: "눈", gender: "결막염", image: "/assets/survey/결막염.png"},
	{id: 11, stage: 2, bodyPart: "눈", gender: "안검하수", image: "/assets/survey/안검하수.png"},
	{id: 12, stage: 2, bodyPart: "눈", gender: "익상편", image: "/assets/survey/익상편.png"},
	{id: 13, stage: 2, bodyPart: "눈", gender: "눈물관 폐쇄", image: "/assets/survey/눈물관폐쇄.png"},
	{id: 14, stage: 2, bodyPart: "눈", gender: "안구 건조증", image: "/assets/survey/안구건조증.png"},
	{id: 15, stage: 2, bodyPart: "눈", gender: "눈물샘 염", image: "/assets/survey/눈물샘염.png"},
	{id: 16, stage: 2, bodyPart: "코", gender: "비강염", image: "/assets/survey/비강염.png"},
	{id: 17, stage: 2, bodyPart: "코", gender: "부비동염", image: "/assets/survey/부비동염.png"},
	{id: 18, stage: 2, bodyPart: "코", gender: "알레르기성 비염", image: "/assets/survey/알레르기성 비염.png"},
	{id: 19, stage: 2, bodyPart: "코", gender: "수면무호흡증후군", image: "/assets/survey/수면무호흡증후군.png"},
	{id: 20, stage: 2, bodyPart: "코", gender: "골절, 감염", image: "/assets/survey/코골절.png"},
	{id: 21, stage: 2, bodyPart: "귀", gender: "중이염", image: "/assets/survey/중이염.png"},
	{id: 22, stage: 2, bodyPart: "귀", gender: "중이염", image: "/assets/survey/중이염.png"},
	{id: 23, stage: 2, bodyPart: "귀", gender: "외이염", image: "/assets/survey/외이염.png"},
	{id: 24, stage: 2, bodyPart: "귀", gender: "이명", image: "/assets/survey/이명.png"},
	{id: 25, stage: 2, bodyPart: "귀", gender: "난청", image: "/assets/survey/난청.png"},
	{id: 26, stage: 2, bodyPart: "목", gender: "인후염", image: "/assets/survey/인후염.png"},
	{id: 27, stage: 2, bodyPart: "목", gender: "편도선염, 후두염", image: "/assets/survey/편도선염.png"},
	{id: 28, stage: 2, bodyPart: "목", gender: "기관지염, 기관지 천식, 폐렴", image: "/assets/survey/기관지염.png"},
	{id: 29, stage: 2, bodyPart: "목", gender: "기관지염", image: "/assets/survey/기관지염.png"},
	{id: 30, stage: 2, bodyPart: "목", gender: "림프종, 암", image: "/assets/survey/목암.png"},
	{id: 31, stage: 2, bodyPart: "팔", gender: "골절", image: "/assets/survey/골절.png"},
	{id: 32, stage: 2, bodyPart: "피부", gender: "습진", image: "/assets/survey/습진.png"},
	{id: 33, stage: 2, bodyPart: "피부", gender: "아토피 피부염", image: "/assets/survey/아토피피부염.png"},
	{id: 34, stage: 2, bodyPart: "피부", gender: "피부염", image: "/assets/survey/피부염.png"},
	{id: 35, stage: 2, bodyPart: "피부", gender: "동양질환", image: "/assets/survey/동양질환.png"},
	{id: 36, stage: 2, bodyPart: "피부", gender: "수포성 피부질환", image: "/assets/survey/수포성피부질환.png"},
	{id: 37, stage: 2, bodyPart: "배, 가슴", gender: "유방암, 양성종양", image: "/assets/survey/유방암.png"},
	{id: 38, stage: 2, bodyPart: "배, 가슴", gender: "심장질환(심근경색, 협심증)", image: "/assets/survey/심장질환.png"},
	{id: 39, stage: 2, bodyPart: "배, 가슴", gender: "소화기 질환(식도염, 소화성 궤양)", image: "/assets/survey/소화기질환.png"},
	{id: 40, stage: 2, bodyPart: "다리", gender: "정맥류", image: "/assets/survey/정맥류.png"},
	{id: 41, stage: 2, bodyPart: "어깨", gender: "회전근개 파열", image: "/assets/survey/회전근개파열.png"},
	
	// 3단계 옵션: 질병 및 상세 증상 예시
	{id: 1, stage: 3, bodyPart: "눈", gender: "백내장", disease: "뿌옇게 보임", image: ""},
	{id: 2, stage: 3, bodyPart: "눈", gender: "녹내장", disease: "시야가 좁아짐", image: ""},
	{id: 3, stage: 3, bodyPart: "눈", gender: "백내장, 녹내장", disease: "빛에 민감", image: ""},
	{id: 4, stage: 3, bodyPart: "눈", gender: "안질환", disease: "번쩍이거나 반짝이는 빛을 보는 느낌", image: ""},
	{id: 5, stage: 3, bodyPart: "눈", gender: "단순한 시력 저하", disease: "글자가 흐릿하게 보이거나 멀리 있는 물체의 선명도가 떨어짐", image: ""},
	{id: 6, stage: 3, bodyPart: "눈", gender: "각막염, 안구 건조증", disease: "눈물이 나거나 건조함", image: ""},
	{id: 7, stage: 3, bodyPart: "눈", gender: "결막염", disease: "가려움", image: ""},
	{id: 8, stage: 3, bodyPart: "눈", gender: "녹내장", disease: "시력감소", image: ""},
	{id: 9, stage: 3, bodyPart: "눈", gender: "녹내장", disease: "어두운 곳에서의 시력이 나빠짐", image: ""},
	{id: 10, stage: 3, bodyPart: "눈", gender: "안구 건조증", disease: "피로감", image: ""},
	{id: 11, stage: 3, bodyPart: "눈", gender: "익상편", disease: "이물감이 느껴짐", image: ""},
	{id: 12, stage: 3, bodyPart: "눈", gender: "눈물관 폐쇄", disease: "눈 주위의 발적", image: ""},
	{id: 13, stage: 3, bodyPart: "눈", gender: "눈물샘 염", disease: "눈 주의 붓기, 발적", image: ""},
	{id: 14, stage: 3, bodyPart: "눈", gender: "안구 건조증", disease: "눈의 건조", image: ""},
	{id: 15, stage: 3, bodyPart: "눈", gender: "익상편", disease: "이물감이 느껴짐", image: ""},
	{id: 16, stage: 3, bodyPart: "눈", gender: "안검하수", disease: "졸려보인다는 말을 많이 들음", image: ""},
	{id: 17, stage: 3, bodyPart: "눈", gender: "안검하수", disease: "이마로 눈을 뜸", image: ""},
	{id: 18, stage: 3, bodyPart: "코", gender: "비강염", disease: "콧물, 코막힘", image: ""},
	{id: 19, stage: 3, bodyPart: "코", gender: "부비동염", disease: "얼굴 통증, 콧물", image: ""},
	{id: 20, stage: 3, bodyPart: "코", gender: "알레르기성 비염", disease: "재채기, 가려움", image: ""},
	{id: 21, stage: 3, bodyPart: "코", gender: "수면무호흡증후군", disease: "무호흡증으로 인한 피곤", image: ""},
	{id: 22, stage: 3, bodyPart: "코", gender: "골절, 감염", disease: "코의 붓기", image: ""},
	{id: 23, stage: 3, bodyPart: "귀", gender: "중이염", disease: "중이의 통증", image: ""},
	{id: 24, stage: 3, bodyPart: "귀", gender: "외이염", disease: "외이의 통증, 붓기, 가려움", image: ""},
	{id: 25, stage: 3, bodyPart: "귀", gender: "이명", disease: "귀에서 실제 외부 소음 없이 소리가 들림", image: ""},
	{id: 26, stage: 3, bodyPart: "귀", gender: "난청", disease: "청력 저하로 정상적인 대화가 어려움", image: ""},
	{id: 27, stage: 3, bodyPart: "목", gender: "인후염", disease: "인후 통증, 목감기 증상", image: ""},
	{id: 28, stage: 3, bodyPart: "목", gender: "편도선염, 후두염", disease: "목소리 변화, 열, 피로감", image: ""},
	{id: 29, stage: 3, bodyPart: "목", gender: "기관지염, 기관지 천식, 폐렴", disease: "호흡곤란", image: ""},
	{id: 30, stage: 3, bodyPart: "목", gender: "기관지염", disease: "기침, 가래", image: ""},
	{id: 31, stage: 3, bodyPart: "목", gender: "림프종, 암", disease: "덩어리가 만져짐", image: ""},
	{id: 33, stage: 3, bodyPart: "생식기", gender: "여자", disease: "생리불규칙", image: ""},
	{id: 34, stage: 3, bodyPart: "생식기", gender: "여자", disease: "냉의 불쾌한 냄새, 양의 변화", image: ""},
	{id: 35, stage: 3, bodyPart: "생식기", gender: "여자", disease: "생리 전 감정 변화", image: ""},
	{id: 36, stage: 3, bodyPart: "생식기", gender: "여자", disease: "생리 때 심한 통증", image: ""},
	{id: 37, stage: 3, bodyPart: "생식기", gender: "여자", disease: "간지러움", image: ""},
	{id: 38, stage: 3, bodyPart: "생식기", gender: "남자", disease: "성기능장애", image: ""},
	{id: 39, stage: 3, bodyPart: "생식기", gender: "남자", disease: "고환의 통증 또는 붓기", image: ""},
	{id: 40, stage: 3, bodyPart: "생식기", gender: "남자", disease: "음경의 통증 또는 붓기", image: ""},
	{id: 41, stage: 3, bodyPart: "생식기", gender: "항문, 대변", disease: "항문에 뭔가 만져짐", image: ""},
	{id: 42, stage: 3, bodyPart: "생식기", gender: "항문, 대변", disease: "변비 또는 설사", image: ""},
	{id: 43, stage: 3, bodyPart: "생식기", gender: "항문, 대변", disease: "대변에 빨간 피 또는 색의 변화", image: ""},
	{id: 44, stage: 3, bodyPart: "생식기", gender: "항문, 대변", disease: "대변의 불쾌한 냄새", image: ""},
	{id: 45, stage: 3, bodyPart: "생식기", gender: "소변", disease: "계속 마려운 느낌", image: ""},
	{id: 46, stage: 3, bodyPart: "생식기", gender: "소변", disease: "피가 섞여 나옴", image: ""},
	{id: 47, stage: 3, bodyPart: "생식기", gender: "소변", disease: "소변이 콜라색이고 거품이 섞여나옴", image: ""},
	{id: 48, stage: 3, bodyPart: "생식기", gender: "소변", disease: "작열감", image: ""},
	{id: 49, stage: 3, bodyPart: "생식기", gender: "소변", disease: "잘 안나옴", image: ""},
	{id: 50, stage: 3, bodyPart: "생식기", gender: "소변", disease: "속옷에 샘", image: ""},
	{id: 51, stage: 3, bodyPart: "피부", gender: "습진", disease: "피부 가려움증, 건조한 피부", image: ""},
	{id: 52, stage: 3, bodyPart: "피부", gender: "아토피 피부염", disease: "발진, 발적, 다양한 부위", image: ""},
	{id: 53, stage: 3, bodyPart: "피부", gender: "피부염", disease: "붉은 반점", image: ""},
	{id: 54, stage: 3, bodyPart: "피부", gender: "동양질환", disease: "은색 크고 두꺼운 비늘로 덮인 피부 반점", image: ""},
	{id: 55, stage: 3, bodyPart: "피부", gender: "수포성 피부질환", disease: "수포, 물집", image: ""},
	{id: 56, stage: 3, bodyPart: "배, 가슴", gender: "유방암, 양성종양", disease: "덩어리가 만져지거나, 염증이 생김", image: ""},
	{id: 57, stage: 3, bodyPart: "배, 가슴", gender: "심장질환(심근경색, 협심증)", disease: "흉통", image: ""},
	{id: 58, stage: 3, bodyPart: "배, 가슴", gender: "소화기 질환(식도염, 소화성 궤양)", disease: "압박감, 불편함", image: ""},
	{id: 59, stage: 3, bodyPart: "팔", gender: "골절", disease: "심한 통증과 붓기", image: ""},
	{id: 60, stage: 3, bodyPart: "다리", gender: "정맥류", disease: "다리에 불편함과 통증", image: ""},
	{id: 61, stage: 3, bodyPart: "어깨", gender: "회전근개 파열", disease: "어깨의 심한 통증 및 움직임 제한", image: ""},
];

const SurveyDetail = () => {
	const router = useRouter();
	const {id, bodyPart, gender} = router.query;
	
	const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(router.query.bodyPart as string);
	const [selectedGender, setSelectedGender] = useState<string | null>(router.query.gender as string);
	const currentStage = parseInt(id as string);
	
	let currentOptions = options.filter(option => option.stage === currentStage);
	if (currentStage === 2 && selectedBodyPart) {
		currentOptions = currentOptions.filter(option => selectedBodyPart.includes(option.bodyPart || ""));
	} else if (currentStage === 3 && selectedGender) {
		currentOptions = currentOptions.filter(option => option.gender === selectedGender);
	}
	
	useEffect(() => {
		if (router.query.bodyPart) {
			setSelectedBodyPart(router.query.bodyPart as string);
		}
		if (router.query.gender) {
			setSelectedGender(router.query.gender as string);
		}
	}, [router.query]);
	
	const SurveyAskText = () => {
		switch (currentStage) {
			case 1:
				return <>직짱인 님이 <b>체크하고 싶은 부위</b>는 어디인가요?</>;
			case 2:
				return <>선택한 부위에 대한 <b>성별을 선택</b>해주세요.</>;
			case 3:
				return <>해당하는 <b>증상</b>을 선택하세요!</>;
			default:
				return <>잘못된 접근입니다. 유효한 설문 페이지를 선택해 주세요.</>;
		}
	};
	
	const goToNextPage = (selectedOption) => {
		const nextId = currentStage + 1;
		if (nextId <= 3) {
			let query = `/Survey/${nextId}?`;
			if (currentStage === 1 && selectedOption.bodyPart) {
				query += `bodyPart=${selectedOption.bodyPart}`;
			} else if (currentStage === 2 && selectedOption.gender) {
				query += `bodyPart=${selectedBodyPart}&gender=${selectedOption.gender}`;
			}
			router.push(query);
		}
	};
	
	return (
		<Layout>
			<div className={styles.quizContainer}>
				<div className={styles.question_num}>{currentStage}</div>
				<div className={styles.question}>
					<SurveyAskText/>
				</div>
				<div className={styles.options}>
					{currentOptions.map(option => (
						<div key={option.id} onClick={() => goToNextPage(option)}>
							<Image src={option.image} alt="survey option" className={styles.option} width={100} height={100}/>
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
