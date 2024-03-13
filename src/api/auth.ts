import qs from 'qs';
import axiosInstance from './axiosInstance';
import {GetServerSideProps, GetServerSidePropsContext} from 'next';
import {loginUrl, logoutUrl, sendEmailVerificationUrl, signUpUrl, verifyEmailCodeUrl} from './Urls';

export const signUp = async (nickname: string, userId: string, email: string, password: string) => {
    try {
        const response = await axiosInstance.post(signUpUrl, {nickname, userId, email, password}, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            },
        });
        return {success: true, data: response.data};
    } catch (error: any) {
        return {success: false, message: error.response?.data?.message || error.message};
    }
};
export const login = async (username: string, password: string) => {
    try {
        const data = qs.stringify({username, password});
        const response = await axiosInstance.post(loginUrl, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return {success: true, data: response.data};
    } catch (error: any) {
        return {success: false, message: error.response?.data?.message || error.message};
    }
};

export const sendEmailVerification = async (email: string) => {
    try {
        const response = await axiosInstance.post(sendEmailVerificationUrl(email), {});
        return {success: true, data: response.data};
    } catch (error: any) {
        return {success: false, message: error.response?.data?.message || error.message};
    }
};

export const verifyEmailCode = async (email: string, code: string) => {
    try {
        const response = await axiosInstance.get(verifyEmailCodeUrl(email,code));
        return {success: true, data: response.data};
    } catch (error: any) {
        return {success: false, message: error.response?.data?.message || error.message};
    }
};


export const logout = async (refreshToken: string | undefined): Promise<any> => {
    try {
        const response = await axiosInstance.patch(logoutUrl, {}, {
            headers: {
                'RefreshToken': `Bearer ${refreshToken}`,
            },
        });
        return {success: true, data: response.data};
    } catch (error) {
        return {success: false, message: '로그아웃이 정상적으로 되지 않았습니다. 다시 시도해주세요.'};
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
;
