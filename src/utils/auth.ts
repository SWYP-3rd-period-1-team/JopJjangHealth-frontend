import axios from 'axios';

interface VerificationResult {
	success: boolean;
	message?: string;
}

interface LogoutResult {
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
		await axios.post('/api/sendVerification', { email });
		return { success: true };
	} catch (error) {
		console.error(`Error sending verification code: ${error}`);
		return { success: false, message: 'Failed to send verification code.' };
	}
};

export const verifyEmailCode = async (email: string, code: string): Promise<VerificationResult> => {
	try {
		await axios.post('/api/verifyCode', { email, code });
		return { success: true };
	} catch (error) {
		console.error(`Error verifying email code: ${error}`);
		return { success: false, message: 'Failed to verify email code.' };
	}
};

export const logout = async (): Promise<LogoutResult> => {
	try {
		const refreshToken = localStorage.getItem('refreshToken');
		
		if (!refreshToken) {
			console.error('No refresh token found');
			return { success: false, message: 'No refresh token found.' };
		}
		
		// HTTP 요청 헤더에 'Authorization' 대신 'RefreshToken' 사용 (서버 구현에 따라 다를 수 있음)
		await axios.post('/api/members/logout', {}, {
			headers: {
				'Authorization': `Bearer ${refreshToken}`
			}
		});
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		return { success: true };
	} catch (error) {
		console.error(`Error logging out: ${error}`);
		return { success: false, message: 'Failed to log out.' };
	}
};


