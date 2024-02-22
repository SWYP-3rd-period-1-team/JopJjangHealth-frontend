export const validateEmail = (email: string): string | true => {
	const regex = /^\S+@\S+\.\S+$/;
	if (!regex.test(email)) {
		return '유효한 이메일 형식이 아닙니다.';
	}
	return true;
};

export const validatePassword = (password: string): string | true => {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	if (!regex.test(password)) {
	return '대소문자, 숫자, 특수 문자를 모두 포함해야 합니다.';
	}
	if (password.length < 8) {
   return '비밀번호는 최소 8자 이상이어야 합니다.';
	}
	return true;
};

export const validateUserId = (userId: string): string | true => {
	const regex = /^[A-Za-z가-힣]+$/;
	if (!regex.test(userId)) {
		return '이름은 영어와 한글만 포함해야 합니다.';
	}
	return true;
};

export const validateNickname = (nickname: string): string | true => {
	const regex = /^[A-Za-z가-힣]+$/;
	if (!regex.test(nickname)) {
		return '이름은 영어와 한글만 포함해야 합니다.';
	}
	return true;
};

