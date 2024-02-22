import styles from "../../styles/Survey.module.css";
import React from 'react';
import Image from 'next/image';
import Layout from "../../components/Layout";

interface IOption {
	id: number;
	text: string;
	image: string;
}

const options: IOption[] = [
	{id: 1, text: '생식기', image: "/assets/survey/생식기.png"},
	{id: 2, text: '눈', image: "/assets/survey/눈.png"},
	{id: 3, text: '코, 귀, 목', image: "/assets/survey/코,귀,목.png"},
	{id: 4, text: '피부', image: "/assets/survey/피부.png"},
	{id: 5, text: '배, 가슴', image: "/assets/survey/배,가슴.png"},
];

const Survey: () => JSX.Element = () => {
	return (
		<Layout>
			<div className={styles.quizContainer}>
				<div className={styles.question_num}>1</div>
				<div className={styles.question}>직짱인 님이 <b>체크하고 싶은 부위</b>는 어디인가요?</div>
				<div className={styles.options}>
					{options.map(option => (
						<>
							<div key={option.id}>
								<Image src={option.image} className={styles.option} width={100} height={100}/>
								<br/>
								<div>{option.text}</div>
							</div>
						</>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Survey;
