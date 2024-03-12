import React from 'react';
import styles from "../../styles/MySurveyList.module.css";
import Link from 'next/link';
import Image from 'next/image';
import LargeImage from "../../../public/assets/no/ask.png"
import SmallImage from "../../../public/assets/no/wow.png"
const NoSurveyList = () => {
    
    return (
        <>
            <div className={styles.mySurvey_container}>
                <div className={styles.no_hospitals}>
                    <div className={styles.image}>
                        <Image src={LargeImage} alt="largeImage" />
                        <Image src={SmallImage} alt="smallImage" />
                    </div>
                    <div className={styles.no_mySurvey}>앗! 아직 질병 리스트가 없네요!</div>
                    <div className={styles.no_mySurvey_text}>간단한 건강 설문을 해볼까요?</div>
                    <Link href={"/"}>
                        <button className={styles.click_survey}>간단 설문하러 가기</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NoSurveyList;
