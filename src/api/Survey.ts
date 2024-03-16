import axiosInstance from './axiosInstance';
import {saveHealthSurveyUrl} from './Urls';
export const saveHealthSurvey = async (surveyOption: object) => {
    try {
        const response = await axiosInstance.post(saveHealthSurveyUrl, surveyOption);
        return { success: true, data: response.data };
    } catch (error: any) {
        if (error.response) {
            const errData = error.response.data;
            return {
                success: false,
                message: errData.message || "설문조사 저장 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
                errorCode: errData.errorCode
            };
        } else if (error.request) {
            return { success: false, message: "서버로부터 응답이 없습니다. 네트워크 연결을 확인해주세요." };
        } else {
            return { success: false, message: "네트워크 문제로 인해 설문조사를 저장할 수 없습니다. 연결 상태를 확인하고 다시 시도해주세요." };
        }
    }
};
