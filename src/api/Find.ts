import axiosInstance from './axiosInstance';
import {APIResponse} from '../types';
import {findIdUrl, findPasswordUrl} from './Urls';

export async function findPassword(userId: string, email: string): Promise<APIResponse> {
    try {
        const response = await axiosInstance.post(findPasswordUrl, { userId, email });
        return { success: true, data: response.data, message: "임시 비밀번호가 이메일로 전송되었습니다." };
    } catch (error: any) {
        if (error.response) {
            const errData = error.response.data;
            alert(errData.message);
            return {
                success: false,
                message: errData.message || "비밀번호 찾기 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
                errorCode: errData.errorCode
            };
        } else if (error.request) {
            return { success: false, message: "서버로부터 응답이 없습니다." };
        } else {
            return { success: false, message: error.message };
        }
    }
}

export async function findId(email: string): Promise<APIResponse> {
    try {
        const response = await axiosInstance.post(findIdUrl, { email });
        return { success: true, data: response.data, message: "회원님의 아이디는 다음과 같습니다." };
    } catch (error: any) {
        if (error.response) {
            const errData = error.response.data;
            alert(errData.message);
            return {
                success: false,
                message: errData.message || "아이디 찾기 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
                errorCode: errData.errorCode
            };
        } else if (error.request) {
            return { success: false, message: "서버로부터 응답이 없습니다." };
        } else {
            return { success: false, message: error.message };
        }
    }
}
