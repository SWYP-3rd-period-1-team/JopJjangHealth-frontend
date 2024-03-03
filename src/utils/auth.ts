import qs from "qs";
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';

export const signUp = async (nickname: string, userId: string, email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/api/members/join', { nickname, userId, email, password }, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });
        alert(response.data?.data?.message);
        window.location.href = response.data?.data?.surveyUrl;
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: '회원가입 실패' };
    }
};

export const login = async (username: string, password: string) => {
    try {
        const data = qs.stringify({ username, password });
        const response = await axiosInstance.post('/login', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: '로그인 실패'};
    }
};

export const sendEmailVerification = async (email: string) => {
    try {
        const response = await axios.post(`/api/emails/verification-requests?email=${email}`, {});
        alert(response.data.data.message);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: '이메일 요청 실패' };
    }
};

export const verifyEmailCode = async (email: string, code: string) => {
    try {
        const response = await axios.get(`/api/emails/verifications?email=${email}&code=${code}`);
        alert(response.data.data.message);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: '이메일 요청 확인 실패' };
    }
};

export const logout = async () => {
    try {
        const response = await axiosInstance.patch('/api/members/logout');
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: '로그아웃 실패' };
    }
};
