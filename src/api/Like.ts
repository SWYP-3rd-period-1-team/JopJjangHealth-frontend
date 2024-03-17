import axiosInstance from './axiosInstance';
import {fetchHospitalDeleteInfoUrl, fetchHospitalInfoUrl} from './Urls';

export const fetchHospitalInfo = async () => {
    try {
        const response = await axiosInstance.get(fetchHospitalInfoUrl);
        if (response.data.success === "true") {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: "예상치 못한 응답 형식입니다." };
        }
    } catch (error: any) {
        if (error.response) {
            const errData = error.response.data;
            alert(errData.message || '찜한 병원 정보를 가져오는 중 에러가 발생했습니다. 다시 시도 해주세요.');
            return {
                success: false,
                message: errData.message || '찜한 병원 정보를 가져오는 중 에러가 발생했습니다. 다시 시도 해주세요.',
                errorCode: errData.errorCode
            };
        } else if (error.request) {
            return { success: false, message: "서버로부터 응답이 없습니다." };
        } else {
            return { success: false, message: error.message };
        }
    }
}

export const fetchHospitalDeleteInfo = async (hospitalId: string) => {
    try {
        const response = await axiosInstance.post(fetchHospitalDeleteInfoUrl(hospitalId), {
            bookmark: false
        });
        if (response.data.success === "true") {
            return { success: true, data: response.data.data };
        } else {
            return { success: false, message: "찜한 병원을 삭제하지 못하였습니다." };
        }
    } catch (error: any) {
        if (error.response) {
            const errData = error.response.data;
            alert(errData.message || '찜한 병원을 삭제하지 못하였습니다. 다시 시도 해주세요.');
            return {
                success: false,
                message: errData.message || '찜한 병원을 삭제하지 못하였습니다. 다시 시도 해주세요.',
                errorCode: errData.errorCode
            };
        } else if (error.request) {
            return { success: false, message: "서버로부터 응답이 없습니다." };
        } else {
            return { success: false, message: error.message };
        }
    }
};
