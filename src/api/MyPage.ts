import axiosInstance from './axiosInstance';
import {
    changePasswordUrl, changeUserNicknameUrl,
    changeUserProfileImageUrl, deleteUserProfileImageUrl,
    fetchDiseaseListDeleteUrl,
    fetchDiseaseListUrl, fetchUserInfoUrl, sendEmailVerificationForMyPageUrl,
    uploadProfileImageUrl,
} from './Urls';

export const changePassword = async (password: string, confirmPassword: string) => {
    try {
        await axiosInstance.patch(changePasswordUrl, { newPassword: password, confirmPassword: confirmPassword });
        alert('비밀번호가 성공적으로 변경되었습니다.');
        window.location.href = '/MyPage';
    } catch (error: any) {
        let errorMessage = '비밀번호 변경 중 에러가 발생했습니다. 다시 시도 해주세요.';
        if (error.response) {
            errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
            errorMessage = '서버로부터 응답이 없습니다.';
        }
        alert(errorMessage);
        return { success: false, message: errorMessage };
    }
};

export const fetchDiseaseList = async () => {
    try {
        const response = await axiosInstance.get(fetchDiseaseListUrl);
        return { success: true, data: response.data };
    } catch (error: any) {
        let errorMessage = '질병 리스트 호출 중 에러가 발생했습니다.';
        if (error.response) {
            alert(errorMessage)
            errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
            errorMessage = '서버로부터 응답이 없습니다.';
        }
        return { success: false, message: errorMessage };
    }
};

export const fetchDiseaseListDelete = async (surveyId: number) => {
    try {
        const response = await axiosInstance.delete(fetchDiseaseListDeleteUrl(surveyId));
        return { success: true, data: response.data };
    } catch (error: any) {
        let errorMessage = '질병 리스트 삭제 중 에러가 발생했습니다.';
        if (error.response) {
            errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
            errorMessage = '서버로부터 응답이 없습니다.';
        }
        return { success: false, message: errorMessage };
    }
};

export const changeUserProfileImage = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('profileImage', file);
        
        const response = await axiosInstance.put(changeUserProfileImageUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "프로필 이미지 변경 중 문제가 발생했습니다." };
    }
};

export const uploadProfileImage = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('profileImage', file);
        
        const response = await axiosInstance.post(uploadProfileImageUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "프로필 이미지 업로드 중 문제가 발생했습니다." };
    }
};

export const deleteUserProfileImage = async () => {
    try {
        const response = await axiosInstance.delete(deleteUserProfileImageUrl, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "프로필 이미지 삭제 중 문제가 발생했습니다." };
    }
};

export const fetchUserInfo = async () => {
    try {
        const response = await axiosInstance.get(fetchUserInfoUrl);
        if (response.data.success === "true") {
            return { success: true, data: response.data.data };
        } else {
            return { success: false, message: "예상치 못한 응답 형식입니다." };
        }
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "회원 정보 조회 중 문제가 발생했습니다." };
    }
};

export const changeUserNickname = async (newNickname: string) => {
    try {
        const response = await axiosInstance.patch(changeUserNicknameUrl, { newNickname });
        if (response.data.success === "true") {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: "예상치 못한 응답 형식입니다." };
        }
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "닉네임 변경 중 문제가 발생했습니다." };
    }
};

export const sendEmailVerificationForMyPage = async (email: string) => {
    try {
        const response = await axiosInstance.post(sendEmailVerificationForMyPageUrl, { email: email });
        if (response.data.success === "true") {
            return { success: true, data: response.data.data };
        } else {
            return { success: false, message: "예상치 못한 응답 형식입니다." };
        }
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "이메일 인증 발송 중 문제가 발생했습니다." };
    }
};
