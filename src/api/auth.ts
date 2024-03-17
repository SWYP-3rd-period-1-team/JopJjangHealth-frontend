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
        let errorMessage = '';
        if (error.response) {
            errorMessage = error.response.data || errorMessage;
        } else if (error.request) {
            errorMessage = '서버로부터 응답이 없습니다.';
        }
        return { success: false, message: errorMessage };
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
        let errorMessage = '';
        if (error.response) {
            errorMessage = error.response.data || errorMessage;
        } else if (error.request) {
            errorMessage = '서버로부터 응답이 없습니다.';
        }
        return { success: false, message: errorMessage };
    }
};

export const sendEmailVerification = async (email: string) => {
    try {
        const response = await axiosInstance.post(sendEmailVerificationUrl(email), {});
        return { success: true, data: response.data };
    } catch (error: any) {
        let errorMessage = '';
        if (error.response) {
            errorMessage = error.response.data || errorMessage;
        } else if (error.request) {
            errorMessage = '서버로부터 응답이 없습니다.';
        }
        return { success: false, message: errorMessage };
    }
};

export const verifyEmailCode = async (email: string, code: string) => {
    try {
        const response = await axiosInstance.get(verifyEmailCodeUrl(email, code));
        return { success: true, data: response.data };
    } catch (error: any) {
        console.log(error,"error 지금 시간 3시 30분!!!")
        let errorMessage = '';
        if (error.response) {
            errorMessage = error.response.data || errorMessage;
        } else if (error.request) {
            errorMessage = '서버로부터 응답이 없습니다.';
        }
        return { success: false, message: errorMessage };
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
        let errorMessage = '';
        if (error.response) {
            errorMessage = error.response.data || errorMessage;
        } else if (error.request) {
            errorMessage = '서버로부터 응답이 없습니다.';
        }
        return { success: false, message: errorMessage };
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
