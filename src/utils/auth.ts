import axios from 'axios';
import qs from "qs";

interface VerificationResult {
	success: boolean;
	message?: string;
}

export const signUp = async (nickname: string, userId: string, email: string, password: string): Promise<void> => {
	try {
		await axios.post('/api/members/join', { nickname, userId, email, password }, {
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Accept': 'application/json'
			}
		});
	} catch (error) {
		console.error('회원가입 실패:', error);
	}
}

export const sendEmailVerification = async (email: string): Promise<VerificationResult> => {
	try {
		await axios.post(`/api/emails/verification-requests?email=${email}`, { });
		return { success: true };
	} catch (error) {
		console.error(`Error sending verification code: ${error}`);
		return { success: false, message: 'Failed to send verification code.' };
	}
};

export const verifyEmailCode = async (email: string, code: string): Promise<VerificationResult> => {
	try {
		await axios.get(`/api/emails/verifications?email=${email}&code=${code}`);
		return { success: true };
	} catch (error) {
		console.error(`Error verifying email code: ${error}`);
		return { success: false, message: 'Failed to verify email code.' };
	}
};



export const login = async (username:string, password:string) => {
	try {
		const data = qs.stringify({
			username: username,
			password: password,
		});
		
		const url = 'http://3.36.251.109:8080/login';
		
		await axios.post(url, data, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		});
		console.log('로그인 성공');
	} catch (error) {
		console.error('로그인 실패:', error);
	}
};

