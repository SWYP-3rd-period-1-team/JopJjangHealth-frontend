import qs from "qs";
import axiosInstance from '../api/axiosInstance';
import {GetServerSideProps, GetServerSidePropsContext} from 'next';

export const signUp = async (nickname: string, userId: string, email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/api/members/join', { nickname, userId, email, password }, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });
        return { success: true, data: response.data };
    } catch (error:any) {
        return { success: false, message: error.response?.data?.message || error.message };
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
    } catch (error:any) {
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const sendEmailVerification = async (email: string) => {
    try {
        const response = await axiosInstance.post(`/api/emails/verification-requests?email=${email}`, {});
        return { success: true, data: response.data };
    } catch (error:any) {
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const verifyEmailCode = async (email:string, code:string) => {
    try {
        const response = await axiosInstance.get(`/api/emails/verifications?email=${email}&code=${code}`);
        return { success: true, data: response.data };
    } catch (error:any) {
        return { success: false, message: error.response?.data?.message || error.message };
    }
};



export const logout = async (accessToken:string) => {
    try {
        const response = await axiosInstance.patch('/api/members/logout', {
        }, {
            accessToken: accessToken
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: '로그아웃 실패' };
    }
};

export const checkUserAuthentication : GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const token = context.req.cookies['zzgg_rt'];
    
    if (!token) {
        return {
            redirect: {
                destination: '/Login',
                permanent: false,
            },
        };
    }
    
    return { props: {} };
};
