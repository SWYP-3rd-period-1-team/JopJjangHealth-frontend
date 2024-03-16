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
            let message = "찜한 병원 정보를 가져오는 중 에러가 발생했습니다.";
            switch (error.response.status) {
                case 400:
                    message = "잘못된 요청입니다.";
                    break;
                case 401:
                    message = "인증에 실패했습니다.";
                    break;
                case 404:
                    message = "찾을 수 없는 정보입니다.";
                    break;
            }
            alert(message);
            return {
                success: false,
                message: errData.message || message,
                errorCode: errData.errCode
            };
        } else if (error.request) {
            return { success: false, message: "서버로부터 응답이 없습니다." };
        } else {
            return { success: false, message: "네트워크 연결을 확인해주세요." };
        }
    }
};

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
            let message = "찜한 병원 삭제 중 에러가 발생했습니다.";
            switch (error.response.status) {
                case 400:
                    message = "잘못된 요청입니다. 병원 ID를 확인해주세요.";
                    break;
                case 401:
                    message = "로그인이 필요합니다.";
                    break;
                case 403:
                    message = "접근 권한이 없습니다.";
                    break;
                case 404:
                    message = "삭제하려는 병원 정보를 찾을 수 없습니다.";
                    break;
            }
            return {
                success: false,
                message: errData.message || message,
                errorCode: errData.errCode
            };
        } else if (error.request) {
            return { success: false, message: "서버로부터 응답이 없습니다." };
        } else {
            return { success: false, message: "네트워크 연결을 확인해주세요." };
        }
    }
};
