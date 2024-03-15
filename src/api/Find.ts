import axiosInstance from './axiosInstance';
import {APIResponse} from '../types';
import {findIdUrl, findPasswordUrl} from './Urls';

export async function findPassword(userId: string, email: string): Promise<APIResponse> {
    try {
        const response = await axiosInstance.post(findPasswordUrl, { userId, email });
        return { success: true, data: response.data, message : "임시 비밀번호가 이메일로 전송되었습니다." };
    } catch (error) {
        alert('해당 이메일로 패스워드를 찾을 수 없습니다.');
        return { success: false, message: '해당 이메일로 패스워드를 찾을 수 없습니다.' };
    }
}

export async function findId(email: string): Promise<APIResponse> {
    try {
        const response = await axiosInstance.post(findIdUrl, { email });
        return { success: true, data: response.data, message:"회원님의 아이디는 다음과 같습니다." };
        
    } catch (error) {
        return { success: false, message: '해당 이메일로 등록된 아이디가 없습니다.' };
    }
}
