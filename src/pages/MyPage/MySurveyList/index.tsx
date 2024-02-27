import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import NoSurveyList from '../../../components/Mypage/NoSurveyList';
import MySurveyList from '../../../components/Mypage/MySurveyList';

const SurveyList = () => {
    const [diseaseList, setDiseaseList] = useState([
        { id: 1, date: '2024. 02. 21', diseasePath: '눈 > 눈의 통증 > 눈물이 나거나 건조함 > 안구건조증, 안과', isLinked: false },
        { id: 2, date: '2024. 02. 21', diseasePath: '눈 > 눈의 통증 > 눈물이 나거나 건조함 > 안구건조증, 안과', isLinked: false },
        { id: 3, date: '2024. 02. 21', diseasePath: '눈 > 눈의 통증 > 눈물이 나거나 건조함 > 안구건조증, 안과', isLinked: false },
    ]);
    
    return (
        <Layout>
            {diseaseList.length > 0 ?
                <MySurveyList /> :
                <NoSurveyList />}
        </Layout>
    );
};

export default SurveyList;
