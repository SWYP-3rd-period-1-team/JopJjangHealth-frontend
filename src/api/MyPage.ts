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
        await axiosInstance.patch(changePasswordUrl,
            {
                newPassword: password,
                confirmPassword: confirmPassword,
            });
        alert('비밀번호가 성공적으로 변경되었습니다.');
        window.location.href = '/MyPage';
    } catch (error) {
        return {success: false, message: '비밀번호 변경 중 에러가 발생했습니다'};
    }
};

export const fetchDiseaseList = async () => {
    try {
        const response = await axiosInstance.get(fetchDiseaseListUrl);
        return {success: true, data: response.data};
    } catch (error) {
        return {success: false, message: '질병 리스트 호출 중 에러가 발생했습니다'};
    }
};

export const fetchDiseaseListDelete = async (surveyId: number) => {
    try {
        const response = await axiosInstance.delete(fetchDiseaseListDeleteUrl(surveyId));
        return {success: true, data: response.data};
    } catch (error) {
        return {success: false, message: '질병 리스트 삭제 중 에러가 발생했습니다'};
    }
};

export const changeUserProfileImage = async (file: File) => {
    const formData = new FormData();
    formData.append('profileImage', file);
    
    return axiosInstance.put(changeUserProfileImageUrl, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const uploadProfileImage = async (file: File) => {
    const formData = new FormData();
    formData.append('profileImage', file);
    
    const response = await axiosInstance.post(uploadProfileImageUrl, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteUserProfileImage = async () => {
    return axiosInstance.delete(deleteUserProfileImageUrl, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const fetchUserInfo = async () => {
    try {
        const response = await axiosInstance.get('/api/members/my-page');
        return {success: true, data: response.data};
    } catch (error) {
        return {success: false, message: '회원정보 호출 중 에러가 발생했습니다'};
    }
};

export const changeUserNickname = async (newNickname: string) => {
    try {
        const response = await axiosInstance.patch(changeUserNicknameUrl, {newNickname});
        return {success: true, data: response.data};
    } catch (error:any) {
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const sendEmailVerificationForMyPage = async (email: string) => {
    try {
        const response = await axiosInstance.post(sendEmailVerificationForMyPageUrl, {email: email});
        alert(response.data.data);
        return {success: true, data: response.data};
    } catch (error) {
        return {success: false, message: '이메일 요청 실패'};
    }
};

