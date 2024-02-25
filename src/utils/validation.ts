export const validateEmail = (email: string): string | true => {
	const regex = /^\S+@\S+\.\S+$/;
	if (!regex.test(email)) {
		return '유효한 이메일 형식이 아닙니다.';
	}
	return true;
};

export const validatePassword = (password: string): string | true => {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/;
	if (!regex.test(password)) {
		return '비밀번호는 대소문자, 숫자를 모두 포함하고, 8자 이상 15자 이하이어야 합니다.';
	}
	return true;
};

export const validateUserId = (userId: string): string | true => {
	const regex = /^[a-z\d]{6,12}$/;
	if (!regex.test(userId)) {
		return '아이디는 영문 소문자, 숫자를 조합한 6자 이상 12자 이하이어야 합니다.';
	}
	return true;
};

export const validateNickname = (nickname: string): string | true => {
	const regex = /^[A-Za-z가-힣]{1,8}$/;
	if (!regex.test(nickname)) {
		return '닉네임은 영어와 한글을 포함하여 8자 이하이어야 합니다.';
	}
	return true;
};
