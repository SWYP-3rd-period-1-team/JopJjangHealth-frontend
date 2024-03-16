import qs from 'qs';
import axiosInstance from './axiosInstance';
import {GetServerSideProps, GetServerSidePropsContext} from 'next';
import {loginUrl, logoutUrl, sendEmailVerificationUrl, signUpUrl, verifyEmailCodeUrl} from './Urls';
export const signUp = async (nickname: string, userId: string, email: string, password: string) => {
    try {
        const response = await axiosInstance.post(signUpUrl, { nickname, userId, email, password }, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            },
        });
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "회원가입 중 문제가 발생했습니다." };
    }
};

export const login = async (username: string, password: string) => {
    try {
        const data = qs.stringify({ username, password });
        const response = await axiosInstance.post(loginUrl, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "로그인 중 문제가 발생했습니다." };
    }
};

export const sendEmailVerification = async (email: string) => {
    try {
        const response = await axiosInstance.post(sendEmailVerificationUrl(email), {});
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "이메일 인증 중 문제가 발생했습니다." };
    }
};

export const verifyEmailCode = async (email: string, code: string) => {
    try {
        const response = await axiosInstance.get(verifyEmailCodeUrl(email, code));
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "이메일 코드 검증 중 문제가 발생했습니다." };
    }
};

export const logout = async (refreshToken: string | null) => {
    try {
        const response = await axiosInstance.patch(logoutUrl, {}, {
            headers: {
                'RefreshToken': `${refreshToken}`,
            },
        });
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "로그아웃 중 문제가 발생했습니다." };
    }
};

export const checkUserAuthentication: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const token = context.req.cookies['zzgg_rt'];
    
    if (!token) {
        return {
            redirect: {
                destination: '/Login',
                permanent: false,
            },
        };
    }
    
    return {props: {}};
};
