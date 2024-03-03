import axiosInstance from './axiosInstance';

interface APIResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
}

export async function findPassword(userId: string, email: string): Promise<APIResponse> {
    try {
        const response = await axiosInstance.post('/api/members/find-password', { userId, email });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: '패스워드를 찾을 수 없습니다.' };
    }
}

export async function findId(email: string): Promise<APIResponse> {
    try {
        const response = await axiosInstance.post('/api/members/find-id', { email });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: '아이디 찾기에 실패하였습니다.' };
    }
}
