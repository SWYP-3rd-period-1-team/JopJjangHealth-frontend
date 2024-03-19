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
        if (error.response) {
            const errData = error.response.data;
            return {
                success: false,
                message: errData.message || "회원가입 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
                errorCode: errData.errorCode
            };
        } else if (error.request) {
            return { success: false, message: "서버로부터 응답이 없습니다." };
        } else {
            return { success: false, message: error.message };
        }
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
        if (error.response) {
            return {
                success: false,
                message: error.response.data || "로그인 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
                errorCode: error.response.status
            };
        } else if (error.request) {
            return { success: false, message: "서버로부터 응답이 없습니다." };
        } else {
            return { success: false, message: error.message };
        }
    }
};

export const sendEmailVerification = async (email: string) => {
    try {
        const response = await axiosInstance.post(sendEmailVerificationUrl(email), {});
        return { success: true, data: response.data };
    } catch (error: any) {
        if (error.response) {
            const errData = error.response.data;
            return {
                success: false,
                message: errData.message || "이메일 인증 요청 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
                errorCode: error.response.status
            };
        } else if (error.request) {
            return { success: false, message: "서버로부터 응답이 없습니다." };
        } else {
            return { success: false, message: error.message };
        }
    }
};

export const
    verifyEmailCode = async (email: string, code: string) => {
    try {
        const response = await axiosInstance.get(verifyEmailCodeUrl(email, code));
        return { success: true, data: response.data };
    } catch (error: any) {
        if (error.response) {
            const errData = error.response.data;
            return {
                success: false,
                message: errData.message || "이메일 코드 검증 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
                errorCode: errData.errorCode
            };
        } else if (error.request) {
            return { success: false, message: "서버로부터 응답이 없습니다." };
        } else {
            return { success: false, message: error.message };
        }
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
        if (error.response) {
            const errData = error.response.data;
            return {
                success: false,
                message: errData.message || "로그아웃 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
                errorCode: errData.errorCode
            };
        } else if (error.request) {
            return { success: false, message: "서버로부터 응답이 없습니다." };
        } else {
            return { success: false, message: error.message };
        }
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
