import axiosInstance from './axiosInstance';

export const saveHealthSurvey = async (surveyOption:object) => {
    try {
        const response = await axiosInstance.post('/api/survey/save', surveyOption);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: '설문조사 저장 중 에러가 발생했습니다'};
    }
};

