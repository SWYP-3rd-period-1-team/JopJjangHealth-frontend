import axios from 'axios';
import qs from 'qs';
import axiosInstance from '../api/axiosInstance';

interface VerificationResult {
    success: boolean;
    message?: string;
}

interface LogoutResult {
    success: boolean;
    message?: string;
}

export const signUp = async (
    nickname: string,
    userId: string,
    email: string,
    password: string,
): Promise<void> => {
    try {
        await axios.post(
            '/api/members/join',
            {nickname, userId, email, password},
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    Accept: 'application/json',
                },
            },
        );
    } catch (error) {
        console.error('회원가입 실패:', error);
    }
};

export const sendEmailVerification = async (
    email: string,
): Promise<VerificationResult> => {
    try {
        await axios.post(
            `/api/emails/verification-requests?email=${email}`,
            {},
        );
        return {success: true};
    } catch (error) {
        console.error(`Error sending verification code: ${error}`);
        return {success: false, message: 'Failed to send verification code.'};
    }
};

export const verifyEmailCode = async (
    email: string,
    code: string,
): Promise<VerificationResult> => {
    try {
        await axios.get(
            `/api/emails/verifications?email=${email}&code=${code}`,
        );
        return {success: true};
    } catch (error) {
        console.error(`Error verifying email code: ${error}`);
        return {success: false, message: 'Failed to verify email code.'};
    }
};

export const login = async (username: string, password: string) => {
    try {
        const data = qs.stringify({
            username: username,
            password: password,
        });

        const url = 'login';

        const response = await axiosInstance.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response;
        console.log('로그인 성공');
    } catch (error) {
        console.error('로그인 실패:', error);
    }
};

export const logout = async (): Promise<LogoutResult> => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            console.error('No refresh token found');
            return {success: false, message: 'No refresh token found.'};
        }

        await axios.post(
            '/api/members/logout',
            {},
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            },
        );
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return {success: true};
    } catch (error) {
        console.error(`Error logging out: ${error}`);
        return {success: false, message: 'Failed to log out.'};
    }
};

// todo : 아직 하지 않은 부분 1
export async function findPassword(email: string): Promise<boolean> {
    try {
        const response = await axios.post('/api/findPassword', {email});
        return response.data.exists;
    } catch (error) {
        console.error('비밀번호 찾기 실패:', error);
        return false;
    }
}

// todo : 아직 하지 않은 부분 2
export async function findId(email: string): Promise<string | null> {
    try {
        const response = await axios.post('/api/findId', {email});
        return response.data.id;
    } catch (error) {
        console.error('ID 찾기 실패:', error);
        return null;
    }
}
