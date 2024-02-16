import {useRouter} from 'next/router';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import styles from '../../../styles/Survey.module.css';
import React, {useEffect, useState} from "react";
import Vector from "../../../../public/assets/Vector.svg";
import BeforeVector from "../../../../public/assets/BeforeVector.svg";

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

// 목업 데이터: 각 단계의 옵션
const options: IOption[] = [
	// 1단계 옵션: 주요 부위
	{id: 1, stage: 1, targetBodyPart: "생식기", image: "/assets/survey/생식기.png"},
	{id: 2, stage: 1, targetBodyPart: "눈", image: "/assets/survey/눈.png"},
	{id: 3, stage: 1, targetBodyPart: "코, 귀, 목", image: "/assets/survey/코, 귀, 목.png"},
	{id: 4, stage: 1, targetBodyPart: "피부", image: "/assets/survey/피부.png"},
	{id: 5, stage: 1, targetBodyPart: "배, 가슴", image: "/assets/survey/배, 가슴.png"},
	
	//  2단계 옵션: 세부 분류 예시
	{id: 1, stage: 2, targetBodyPart: "생식기", diagnosisPart: "여성 건강", image: "/assets/survey/여성건강.png"},
	{id: 2, stage: 2, targetBodyPart: "생식기", diagnosisPart: "남성 건강", image: "/assets/survey/남성건강.png"},
	{id: 3, stage: 2, targetBodyPart: "생식기", diagnosisPart: "항문, 대변", image: "/assets/survey/엉덩이,골반,항문.png"},
	{id: 4, stage: 2, targetBodyPart: "생식기", diagnosisPart: "소변", image: "/assets/survey/소변.png"},
	{id: 5, stage: 2, targetBodyPart: "눈", diagnosisPart: "시력 저하", image: "/assets/survey/시력 저하.png"},
	{id: 6, stage: 2, targetBodyPart: "눈", diagnosisPart: "눈 통증", image: "/assets/survey/눈의통증.png"},
	{id: 7, stage: 2, targetBodyPart: "눈", diagnosisPart: "눈물 (과부화/없음)", image: "/assets/survey/눈물.png"},
	{id: 8, stage: 2, targetBodyPart: "눈", diagnosisPart: "눈꺼풀이 처짐", image: "/assets/survey/눈꺼풀이처짐.png"},
	{id: 9, stage: 2, targetBodyPart: "코, 귀, 목", diagnosisPart: "코", image: "/assets/survey/코.png"},
	{id: 10, stage: 2, targetBodyPart: "코, 귀, 목", diagnosisPart: "귀", image: "/assets/survey/귀.png"},
	{id: 11, stage: 2, targetBodyPart: "코, 귀, 목", diagnosisPart: "목", image: "/assets/survey/목.png"},
	{id: 12, stage: 2, targetBodyPart: "피부", diagnosisPart: "가려움증", image: "/assets/survey/피부 가려움증.png"},
	{id: 13, stage: 2, targetBodyPart: "피부", diagnosisPart: "피부 통증", image: "/assets/survey/통증.png"},
	{id: 14, stage: 2, targetBodyPart: "피부", diagnosisPart: "피부 두드러기", image: "/assets/survey/피부 두드러기.png"},
	{id: 15, stage: 2, targetBodyPart: "피부", diagnosisPart: "피부 지성 또는 건조", image: "/assets/survey/피부 건조.png"},
	{id: 16, stage: 2, targetBodyPart: "배, 가슴", diagnosisPart: "가슴", image: "/assets/survey/가슴.png"},
	{id: 17, stage: 2, targetBodyPart: "배, 가슴", diagnosisPart: "복부 통증", image: "/assets/survey/복부 통증.png"},
	{id: 18, stage: 2, targetBodyPart: "배, 가슴", diagnosisPart: "소화 불량", image: "/assets/survey/소화불량.png"},
	
	// 3단계 옵션: 질병 및 상세 증상 예시
	{id: 1, stage: 3, targetBodyPart: "생식기", diagnosisPart: "여성 건강", presentedSymptom: "생리불규칙", image: "/assets/survey/생리불규칙.png"},
	{id: 2, stage: 3, targetBodyPart: "생식기", diagnosisPart: "여성 건강", presentedSymptom: "냉의 불쾌한 냄새, 양의 변화", image: "/assets/survey/냉의 불쾌한 냄새, 양의 변화.png"},
	{id: 3, stage: 3, targetBodyPart: "생식기", diagnosisPart: "여성 건강", presentedSymptom: "생리 전 감정 변화", image: "/assets/survey/생리 전 감정 변화.png"},
	{id: 4, stage: 3, targetBodyPart: "생식기", diagnosisPart: "여성 건강", presentedSymptom: "생리 때 심한 통증", image: "/assets/survey/생리 때 심한 통증.png"},
	{id: 5, stage: 3, targetBodyPart: "생식기", diagnosisPart: "여성 건강", presentedSymptom: "간지러움", image: "/assets/survey/간지러움.png"},
	{id: 6, stage: 3, targetBodyPart: "생식기", diagnosisPart: "남성 건강", presentedSymptom: "성 기능 장애", image: "/assets/survey/성 기능 장애.png"},
	{id: 7, stage: 3, targetBodyPart: "생식기", diagnosisPart: "남성 건강", presentedSymptom: "고환의 통증 또는 붓기", image: "/assets/survey/고환의 통증 또는 붓기.png"},
	{id: 8, stage: 3, targetBodyPart: "생식기", diagnosisPart: "남성 건강", presentedSymptom: "음경의 통증 또는 붓기", image: "/assets/survey/음경의 통증 또는 붓기.png"},
	{id: 9, stage: 3, targetBodyPart: "생식기", diagnosisPart: "항문, 대변", presentedSymptom: "항문에 뭔가 만져짐", image: "/assets/survey/항문에 뭔가 만져짐.png"},
	{id: 10, stage: 3, targetBodyPart: "생식기", diagnosisPart: "항문, 대변", presentedSymptom: "변비 또는 설사", image: "/assets/survey/변비 또는 설사.png"},
	{id: 11, stage: 3, targetBodyPart: "생식기", diagnosisPart: "항문, 대변", presentedSymptom: "대변에 빨간 피 또는 색의 변화", image: "/assets/survey/대변에 빨간 피 또는 색의 변화.png"},
	{id: 12, stage: 3, targetBodyPart: "생식기", diagnosisPart: "항문, 대변", presentedSymptom: "대변의 불쾌한 냄새", image: "/assets/survey/대변의 불쾌한 냄새.png"},
	{id: 13, stage: 3, targetBodyPart: "생식기", diagnosisPart: "소변", presentedSymptom: "계속 마려운 느낌", image: "/assets/survey/계속 마려운 느낌.png"},
	{id: 14, stage: 3, targetBodyPart: "생식기", diagnosisPart: "소변", presentedSymptom: "피가 섞여 나옴", image: "/assets/survey/피가 섞여 나옴.png"},
	{id: 15, stage: 3, targetBodyPart: "생식기", diagnosisPart: "소변", presentedSymptom: "콜라색이고 거품이 섞여나옴", image: "/assets/survey/콜라색이고 거품이 섞여나옴.png"},
	{id: 16, stage: 3, targetBodyPart: "생식기", diagnosisPart: "소변", presentedSymptom: "작열감", image: "/assets/survey/작열감.png"},
	{id: 17, stage: 3, targetBodyPart: "생식기", diagnosisPart: "소변", presentedSymptom: "잘 안나옴", image: "/assets/survey/잘 안나옴.png"},
	{id: 18, stage: 3, targetBodyPart: "생식기", diagnosisPart: "소변", presentedSymptom: "속옷에 샘", image: "/assets/survey/속옷에 샘.png"},
	{id: 19, stage: 3, targetBodyPart: "눈", diagnosisPart: "눈 통증", presentedSymptom: "눈물이 남, 건조함", image: "/assets/survey/눈물이 남, 건조함.png"},
	{id: 20, stage: 3, targetBodyPart: "눈", diagnosisPart: "눈 통증", presentedSymptom: "가려움", image: "/assets/survey/가려움.png"},
	{id: 21, stage: 3, targetBodyPart: "눈", diagnosisPart: "눈 통증", presentedSymptom: "시력 감소", image: "/assets/survey/시력 감소.png"},
	{id: 22, stage: 3, targetBodyPart: "눈", diagnosisPart: "눈 통증", presentedSymptom: "어두운 곳에서의 시력이 나빠짐", image: "/assets/survey/어두운 곳에서 시력이 나빠짐.png"},
	{id: 23, stage: 3, targetBodyPart: "눈", diagnosisPart: "눈 통증", presentedSymptom: "피로감", image: "/assets/survey/피로감.png"},
	{id: 24, stage: 3, targetBodyPart: "눈", diagnosisPart: "눈 통증", presentedSymptom: "이물감이 느껴짐", image: "/assets/survey/이물감이 느껴짐.png"},
	{id: 25, stage: 3, targetBodyPart: "눈", diagnosisPart: "시력 저하", presentedSymptom: "뿌옇게 보임", image: "/assets/survey/뿌옇게 보임.png"},
	{id: 26, stage: 3, targetBodyPart: "눈", diagnosisPart: "시력 저하", presentedSymptom: "시야 좁아짐", image: "/assets/survey/시야 좁아짐.png"},
	{id: 27, stage: 3, targetBodyPart: "눈", diagnosisPart: "시력 저하", presentedSymptom: "빛에 민감", image: "/assets/survey/빛에 민감.png"},
	{id: 28, stage: 3, targetBodyPart: "눈", diagnosisPart: "시력 저하", presentedSymptom: "번쩍이거나 반짝이는 빛을 보는 느낌", image: "/assets/survey/번쩍이거나 반짝이는 빛을 보는 느낌.png"},
	{id: 29, stage: 3, targetBodyPart: "눈", diagnosisPart: "시력 저하", presentedSymptom: "없음", image: "/assets/survey/없음.png"},
	{id: 30, stage: 3, targetBodyPart: "눈", diagnosisPart: "눈물 (과부화/없음)", presentedSymptom: "눈 주위 발적", image: "/assets/survey/눈 주위 발적.png"},
	{id: 31, stage: 3, targetBodyPart: "눈", diagnosisPart: "눈물 (과부화/없음)", presentedSymptom: "눈 주위 붓기", image: "/assets/survey/눈 주위 붓기.png"},
	{id: 32, stage: 3, targetBodyPart: "눈", diagnosisPart: "눈물 (과부화/없음)", presentedSymptom: "눈의 건조", image: "/assets/survey/눈의 건조.png"},
	{id: 33, stage: 3, targetBodyPart: "눈", diagnosisPart: "눈물 (과부화/없음)", presentedSymptom: "이물감이 느껴낌", image: "/assets/survey/이물감이 느껴짐.png"},
	{id: 34, stage: 3, targetBodyPart: "눈", diagnosisPart: "눈꺼풀이 처짐", presentedSymptom: "졸려보인다는 말을 많이 들음", image: "/assets/survey/졸려보인다는 말을 많이 들음.png"},
	{id: 35, stage: 3, targetBodyPart: "눈", diagnosisPart: "눈꺼풀이 처짐", presentedSymptom: "이마로 눈을 뜸", image: "/assets/survey/이마로 눈을 뜸.png"},
	{id: 36, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "코", presentedSymptom: "코막힘", image: "/assets/survey/코 막힘.png"},
	{id: 37, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "코", presentedSymptom: "코 통증, 콧물", image: "/assets/survey/콧물.png"},
	{id: 38, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "코", presentedSymptom: "재채기, 가려움", image: "/assets/survey/재채기.png"},
	{id: 39, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "코", presentedSymptom: "무호흡증으로 인한 피곤", image: "/assets/survey/무호흡.png"},
	{id: 40, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "코", presentedSymptom: "코의 붓기", image: "/assets/survey/코 붓기.png"},
	{id: 41, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "귀", presentedSymptom: "중이의 통증", image: "/assets/survey/중이의 통증.png"},
	{id: 42, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "귀", presentedSymptom: "외이의 통증, 붓기, 가려움", image: "/assets/survey/외이의 통증, 붓기, 가려움.png"},
	{id: 43, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "귀", presentedSymptom: "청력 저하", image: "/assets/survey/청력 저하.png"},
	{id: 44, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "귀", presentedSymptom: "귀에서 실제 외부 소음 없이 소리가 들림", image: "/assets/survey/귀에서 실제 외부 소음 없이 소리가 들림.png"},
	{id: 45, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "귀", presentedSymptom: "청력 저하로 정상적인 대화가 어려움", image: "/assets/survey/청력 저하로 정상적인 대화가 어려움.png"},
	{id: 46, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "목", presentedSymptom: "인후 통증, 목감기 증상", image: "/assets/survey/인후 통증, 목감기 증상.png"},
	{id: 47, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "목", presentedSymptom: "목소리 변화, 열, 피로감", image: "/assets/survey/목소리 변화, 열, 피로감.png"},
	{id: 48, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "목", presentedSymptom: "호흡 곤란", image: "/assets/survey/호흡 곤란.png"},
	{id: 49, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "목", presentedSymptom: "기침, 가래", image: "/assets/survey/기침, 가래.png"},
	{id: 50, stage: 3, targetBodyPart: "코, 귀, 목", diagnosisPart: "목", presentedSymptom: "목 덩어리가 만져짐", image: "/assets/survey/목 덩어리가 만져짐.png"},
	{id: 51, stage: 3, targetBodyPart: "피부", diagnosisPart: "가려움증", presentedSymptom: "건조한 피부", image: "/assets/survey/건조한 피부.png"},
	{id: 52, stage: 3, targetBodyPart: "피부", diagnosisPart: "피부 가려움증", presentedSymptom: "발진,발적, 다양한 부위", image: "/assets/survey/발진,발적, 다양한 부위.png"},
	{id: 53, stage: 3, targetBodyPart: "피부", diagnosisPart: "피부 가려움증", presentedSymptom: "붉은 반점", image: "/assets/survey/붉은 반점.png"},
	{id: 54, stage: 3, targetBodyPart: "피부", diagnosisPart: "피부 가려움증", presentedSymptom: "은색 크고 두꺼운 비늘로 덮인 반점", image: "/assets/survey/은색 크고 두꺼운 비늘로 덮인 반점.png"},
	{id: 55, stage: 3, targetBodyPart: "피부", diagnosisPart: "피부 가려움증", presentedSymptom: "수포, 물집", image: "/assets/survey/수포, 물집.png"},
	{id: 56, stage: 3, targetBodyPart: "피부", diagnosisPart: "피부 통증", presentedSymptom: "크고 딱딱한 혹", image: "/assets/survey/크고 딱딱한 혹.png"},
	{id: 57, stage: 3, targetBodyPart: "피부", diagnosisPart: "피부 통증", presentedSymptom: "덩어리나 점의 형성", image: "/assets/survey/덩어리나 점의 형성.png"},
	{id: 58, stage: 3, targetBodyPart: "피부", diagnosisPart: "피부 지성 또는 건조", presentedSymptom: "여드름", image: "/assets/survey/여드름.png"},
	{id: 59, stage: 3, targetBodyPart: "피부", diagnosisPart: "피부 지성 또는 건조", presentedSymptom: "염증이 없는 여드름", image: "/assets/survey/염증이 없는 여드름.png"},
	{id: 60, stage: 3, targetBodyPart: "피부", diagnosisPart: "피부 두드러기", presentedSymptom: "특정 음식이나 물질 접촉시 악화", image: "/assets/survey/특정 음식이나 물질 접촉시 악화.png"},
	{id: 61, stage: 3, targetBodyPart: "피부", diagnosisPart: "피부 두드러기", presentedSymptom: "특정 부위에서만 발생", image: "/assets/survey/특정 부위에서만 발생.png"},
	{id: 62, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "가슴", presentedSymptom: "가슴 덩어리가 만져짐, 혹은 염증이 생김", image: "/assets/survey/가슴 덩어리가 만져짐, 혹은 염증이 생김.png"},
	{id: 63, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "가슴", presentedSymptom: "가슴 통증", image: "/assets/survey/가슴 통증.png"},
	{id: 64, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "가슴", presentedSymptom: "가슴이 너무 커서 불편함", image: "/assets/survey/가슴이 너무 커서 불편함.png"},
	{id: 65, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "가슴", presentedSymptom: "가슴이 너무 작음 (여성)", image: "/assets/survey/가슴이 너무 작음 (여성).png"},
	{id: 66, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "가슴", presentedSymptom: "두근거림, 빠른 심박동", image: "/assets/survey/두근거림, 빠른 심박동.png"},
	{id: 67, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "가슴", presentedSymptom: "압박감, 불편함", image: "/assets/survey/압박감, 불편함.png"},
	{id: 68, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "가슴", presentedSymptom: "소리가 남", image: "/assets/survey/소리가 남.png"},
	{id: 69, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "복부 통증", presentedSymptom: "우상복부", image: "/assets/survey/우상복부.png"},
	{id: 70, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "복부 통증", presentedSymptom: "복부", image: "/assets/survey/복부.png"},
	{id: 71, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "복부 통증", presentedSymptom: "상복부", image: "/assets/survey/상복부.png"},
	{id: 72, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "복부 통증", presentedSymptom: "우하복부", image: "/assets/survey/우하복부.png"},
	{id: 73, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "복부 통증", presentedSymptom: "옆구리", image: "/assets/survey/옆구리.png"},
	{id: 74, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "소화 불량", presentedSymptom: "구토, 메스꺼움", image: "/assets/survey/구토, 메스꺼움.png"},
	{id: 75, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "소화 불량", presentedSymptom: "갈색, 노란색 피부 또는 눈의 변색", image: "/assets/survey/갈색, 노란색 피부 또는 눈의 변색.png"},
	{id: 76, stage: 3, targetBodyPart: "배, 가슴", diagnosisPart: "소화 불량", presentedSymptom: "복부팽만", image: "/assets/survey/복부팽만.png"},

	// 최종 단계
	{id: 1, stage: 4, targetBodyPart: "생식기", diagnosisPart: "여성 건강", presentedSymptom: "생리불규칙", disease: "다낭성 증후군", image: "/assets/survey/다낭성 증후군.png"},
	{id: 2, stage: 4, targetBodyPart: "생식기", diagnosisPart: "여성 건강", presentedSymptom: "생리불규칙", department: "산부인과", image:"/assets/survey/산부인과.png"},
	{id: 3, stage: 4, targetBodyPart:"생식기", diagnosisPart:"여성 건강", presentedSymptom:"냉의 불쾌한 냄새, 양의 변화", disease: "질염", image:"/assets/survey/질염.png" },
	{id: 4, stage: 4, targetBodyPart:"생식기", diagnosisPart:"여성 건강", presentedSymptom:"냉의 불쾌한 냄새, 양의 변화", disease: "성병", image:"/assets/survey/성병.png" },
	{id: 5, stage: 4, targetBodyPart:"생식기", diagnosisPart:"여성 건강", presentedSymptom:"간지러움", disease: "질염", image:"/assets/survey/질염.png" },
	{id: 6, stage: 4, targetBodyPart:"생식기", diagnosisPart:"여성 건강", presentedSymptom:"간지러움", disease: "성병", image:"/assets/survey/성병.png" },
	{id: 7, stage: 4, targetBodyPart:"생식기", diagnosisPart:"여성 건강", presentedSymptom:"냉의 불쾌한 냄새, 양의 변화", department: "산부인과", image:"/assets/survey/산부인과.png"},
	{id: 8, stage: 4, targetBodyPart:"생식기", diagnosisPart:"여성 건강", presentedSymptom:"간지러움", department: "산부인과", image:"/assets/survey/산부인과.png"},
	{id: 9, stage: 4, targetBodyPart:"생식기", diagnosisPart:"여성 건강", presentedSymptom:"생리 전 감정 변화", disease: "PMS", image:"/assets/survey/PMS.png"},
	{id: 10, stage: 4, targetBodyPart:"생식기", diagnosisPart:"여성 건강", presentedSymptom:"생리 전 감정 변화", department: "산부인과", image:"/assets/survey/산부인과.png"},
	{id: 11, stage: 4, targetBodyPart:"생식기", diagnosisPart:"여성 건강", presentedSymptom:"생리 때 심한 통증", disease: "자궁근종", image:"/assets/survey/자궁근종.png"},
	{id: 12, stage: 4, targetBodyPart:"생식기", diagnosisPart:"여성 건강", presentedSymptom:"생리 때 심한 통증", department: "자궁내막", image:"/assets/survey/자궁내막.png"},
	{id: 13, stage: 4, targetBodyPart:"생식기", diagnosisPart:"여성 건강", presentedSymptom:"생리 때 심한 통증", disease: "다낭성 난소 증후군", image:"/assets/survey/다낭성 난소 증후군.png"},
	{id: 14, stage: 4, targetBodyPart:"생식기", diagnosisPart:"여성 건강", presentedSymptom:"생리 때 심한 통증", department: "산부인과", image:"/assets/survey/산부인과.png"},
	{id: 15, stage: 4, targetBodyPart:"생식기", diagnosisPart:"남성 건강", presentedSymptom:"성 기능 장애", disease: "지루", image:"/assets/survey/지루.png"},
	{id: 16, stage: 4, targetBodyPart:"생식기", diagnosisPart:"남성 건강", presentedSymptom:"성 기능 장애", disease: "조루", image:"/assets/survey/조루.png"},
	{id: 17, stage: 4, targetBodyPart:"생식기", diagnosisPart:"남성 건강", presentedSymptom:"성 기능 장애", department: "비뇨기과", image:"/assets/survey/비뇨기과.png"},
	{id: 18, stage: 4, targetBodyPart:"생식기", diagnosisPart:"남성 건강", presentedSymptom:"고환의 통증 또는 붓기", disease: "고환염", image:"/assets/survey/고환염.png"},
	{id: 19, stage: 4, targetBodyPart:"생식기", diagnosisPart:"남성 건강", presentedSymptom:"고환의 통증 또는 붓기", disease: "고환염전", image:"/assets/survey/고환염전.png"},
	{id: 20, stage: 4, targetBodyPart:"생식기", diagnosisPart:"남성 건강", presentedSymptom:"고환의 통증 또는 붓기", department: "비뇨기과", image:"/assets/survey/비뇨기과.png"},
	{id: 21, stage: 4, targetBodyPart:"생식기", diagnosisPart:"남성 건강", presentedSymptom:"음경의 통증 또는 붓기", disease: "성병", image:"/assets/survey/성병.png"},
	{id: 22, stage: 4, targetBodyPart:"생식기", diagnosisPart:"남성 건강", presentedSymptom:"음경의 통증 또는 붓기", disease: "요도염", image:"/assets/survey/요도염.png"},
	{id: 23, stage: 4, targetBodyPart:"생식기", diagnosisPart:"남성 건강", presentedSymptom:"음경의 통증 또는 붓기", disease: "전립선염", image:"/assets/survey/전립선염.png"},
	{id: 24, stage: 4, targetBodyPart:"생식기", diagnosisPart:"남성 건강", presentedSymptom:"음경의 통증 또는 붓기", department: "비뇨기과", image:"/assets/survey/비뇨기과.png"},
	{id: 25, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"항문에 뭔가 만져짐", disease: "치질", image:"/assets/survey/치질.png"},
	{id: 26, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"항문에 뭔가 만져짐", disease: "지루", image:"/assets/survey/지루.png"},
	{id: 27, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"항문에 뭔가 만져짐", department: "외과", image:"/assets/survey/외과.png"},
	{id: 28, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"항문에 뭔가 만져짐", department: "대장항문외과", image:"/assets/survey/대장항문외과.png"},
	{id: 29, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"변비 또는 설사", disease: "장염", image:"/assets/survey/장염.png"},
	{id: 30, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"변비 또는 설사", department: "소화기내과", image:"/assets/survey/소화기내과.png"},
	{id: 31, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"대변에 빨간 피 또는 색의 변화", disease: "치질", image:"/assets/survey/치질.png"},
	{id: 32, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"대변에 빨간 피 또는 색의 변화", disease: "치루", image:"/assets/survey/치루.png"},
	{id: 33, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"대변에 빨간 피 또는 색의 변화", disease: "대장염", image:"/assets/survey/대장염.png"},
	{id: 34, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"대변에 빨간 피 또는 색의 변화", department: "외과", image:"/assets/survey/외과.png"},
	{id: 35, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"대변에 빨간 피 또는 색의 변화", department: "대장항문외과", image:"/assets/survey/대장항문외과.png"},
	{id: 36, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"대변의 불쾌한 냄새", disease: "대장염", image:"/assets/survey/대장염.png"},
	{id: 37, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"대변의 불쾌한 냄새", department: "소화기내과", image:"/assets/survey/소화기내과.png"},
	{id: 38, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"대변의 불쾌한 냄새", department: "외과", image:"/assets/survey/외과.png"},
	{id: 39, stage: 4, targetBodyPart:"생식기", diagnosisPart:"항문, 대변", presentedSymptom:"대변의 불쾌한 냄새", department: "대장항문외과", image:"/assets/survey/대장항문외과.png"},
	{id: 40, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"계속 마려운 느낌", disease: "방광염", image:"/assets/survey/방광염.png"},
	{id: 41, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"계속 마려운 느낌", department: "비뇨기과", image:"/assets/survey/비뇨기과.png"},
	{id: 42, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"계속 마려운 느낌", department: "산부인과", image:"/assets/survey/산부인과.png"},
	{id: 50, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"작열감", disease: "방광염", image:"/assets/survey/방광염.png"},
	{id: 51, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"작열감", department: "비뇨기과", image:"/assets/survey/비뇨기과.png"},
	{id: 52, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"작열감", department: "산부인과", image:"/assets/survey/산부인과.png"},
	{id: 40, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"피가 섞여 나옴", disease: "방광염", image:"/assets/survey/방광염.png"},
	{id: 41, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"피가 섞여 나옴", department: "비뇨기과", image:"/assets/survey/비뇨기과.png"},
	{id: 42, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"피가 섞여 나옴", department: "산부인과", image:"/assets/survey/산부인과.png"},
	{id: 43, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"콜라색이고 거품이 섞여나옴", disease: "신우신염", image:"/assets/survey/신우신염.png"},
	{id: 44, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"콜라색이고 거품이 섞여나옴", department: "비뇨기과", image:"/assets/survey/비뇨기과.png"},
	{id: 45, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"잘 안나옴", disease: "전립선 비대증", image:"/assets/survey/외과.png"},
	{id: 46, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"잘 안나옴", department: "비뇨기과", image:"/assets/survey/대장항문외과.png"},
	{id: 47, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"속옷에 샘", disease: "전립선 비대증", image:"/assets/survey/전립선 비대증.png"},
	{id: 48, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"속옷에 샘", department: "비뇨기과", image:"/assets/survey/비뇨기과.png"},
	{id: 49, stage: 4, targetBodyPart:"생식기", diagnosisPart:"소변", presentedSymptom:"속옷에 샘", department: "산부인과", image:"/assets/survey/산부인과.png"},
	{id: 50, stage: 4, targetBodyPart:"눈", diagnosisPart:"시력 저하", presentedSymptom:"뿌옇게 보임", disease: "백내장", image:"/assets/survey/백내장.png"},
	{id: 51, stage: 4, targetBodyPart:"눈", diagnosisPart:"시력 저하", presentedSymptom:"뿌옇게 보임", department: "안과", image:"/assets/survey/안과.png"},
	{id: 52, stage: 4, targetBodyPart:"눈", diagnosisPart:"시력 저하", presentedSymptom:"시야 좁아짐", disease: "녹내장", image:"/assets/survey/백내장.png"},
	{id: 53, stage: 4, targetBodyPart:"눈", diagnosisPart:"시력 저하", presentedSymptom:"시야 좁아짐", department: "안과", image:"/assets/survey/안과.png"},
	{id: 54, stage: 4, targetBodyPart:"눈", diagnosisPart:"시력 저하", presentedSymptom:"시야 좁아짐", disease: "백내장", image:"/assets/survey/백내장.png"},
	{id: 55, stage: 4, targetBodyPart:"눈", diagnosisPart:"시력 저하", presentedSymptom:"빛에 민감", disease: "녹내장", image:"/assets/survey/녹내장.png"},
	{id: 56, stage: 4, targetBodyPart:"눈", diagnosisPart:"시력 저하", presentedSymptom:"빛에 민감", department: "안과", image:"/assets/survey/안과.png"},
	{id: 57, stage: 4, targetBodyPart:"눈", diagnosisPart:"시력 저하", presentedSymptom:"번쩍이거나 반짝이는 빛을 보는 느낌", disease: "안질환", image:"/assets/survey/안질환.png"},
	{id: 58, stage: 4, targetBodyPart:"눈", diagnosisPart:"시력 저하", presentedSymptom:"번쩍이거나 반짝이는 빛을 보는 느낌", department: "안과", image:"/assets/survey/안과.png"},
	{id: 59, stage: 4, targetBodyPart:"눈", diagnosisPart:"시력 저하", presentedSymptom:"없음", department: "시력 저하", image:"/assets/survey/시력 저하.png"},
	{id: 60, stage: 4, targetBodyPart:"눈", diagnosisPart:"시력 저하", presentedSymptom:"없음", disease: "안경점", image:"/assets/survey/안경점.png"},
	{id: 61, stage: 4, targetBodyPart:"눈", diagnosisPart:"시력 저하", presentedSymptom:"없음", department: "안과", image:"/assets/survey/안과.png"},
];


const SurveyDetail = () => {
	const router = useRouter();
	const {id, targetBodyPart, diagnosisPart, presentedSymptom} = router.query;
	
	const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(targetBodyPart as string);
	const [selectedtargetBodyPart, setSelectedtargetBodyPart] = useState<string | null>(diagnosisPart as string);
	const [selectedpresentedSymptom, setSelectedpresentedSymptom] =  useState<string | null>(presentedSymptom as string);
	const currentStage = parseInt(id as string);
	
	let currentOptions = options.filter(option => option.stage === currentStage);
	if (currentStage === 2 && selectedBodyPart) {
		currentOptions = currentOptions.filter(option => option.targetBodyPart === selectedBodyPart);
	} else if (currentStage === 3 && selectedtargetBodyPart) {
		currentOptions = currentOptions.filter(option => option.diagnosisPart === selectedtargetBodyPart);
	} else if (currentStage === 4 && selectedpresentedSymptom) {
		currentOptions = currentOptions.filter(option => option.presentedSymptom === selectedpresentedSymptom);
	}
	
	useEffect(() => {
		if (!router.isReady) return;
		
		if (targetBodyPart) {
			setSelectedBodyPart(targetBodyPart as string);
		}
		if (diagnosisPart) {
			setSelectedtargetBodyPart(diagnosisPart as string);
		}
		if(presentedSymptom){
			setSelectedpresentedSymptom(presentedSymptom as string);
		}
	}, [router.query, router.isReady]);
	
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
				query += `targetBodyPart=${selectedBodyPart}&presentedSymptom=${selectedOption.presentedSymptom}`;
			}
			router.push(query);
		}
	};
	
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
			{currentStage > 1 &&
					<>
              <button className={styles.before_button}><Image src={BeforeVector} alt="BeforeVector" width={10} height={10}/> 전 단계로 돌아가기</button>
              <button className={styles.home_button}><Image src={Vector} alt="Vector" width={10} height={10}/> 직<b>짱</b>건강</button>
					
					</>
			}
		</Layout>
		);
	}
	
export async function getServerSideProps(context: { query: { targetBodyPart: null, diagnosisPart: null }}) {
	const initialBodyPart = context.query.targetBodyPart || null;
	const initialTargetBodyPart = context.query.diagnosisPart || null;
	
	return {
		props: {
			initialBodyPart: initialBodyPart,
			initialTargetBodyPart: initialTargetBodyPart,
		},
	};
}

export default SurveyDetail;
