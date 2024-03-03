import axiosInstance from './axiosInstance';

export const ChangePassword = async(password: string, confirmPassword:string) => {
    try {
       await axiosInstance.patch('/api/members/change-password',
            {
                newPassword: password,
                confirmPassword: confirmPassword
            });
        console.log('비밀번호가 성공적으로 변경되었습니다.', password);
    } catch (error) {
        return { success: false, message: '비밀번호 변경 중 에러가 발생했습니다'};
    }
}

export const fetchDiseaseList = async () => {
    try {
        const response = await axiosInstance.get('/api/path/to/disease/list');
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: '질병 리스트 호출 중 에러가 발생했습니다'};
    }
};

export const changeUserProfileImage = async (imagePath:string) => {
    try {
        const response = await axiosInstance.post('/api/members/change-profile-image', { imageFile: imagePath });
        console.log(response.data);
        alert('이미지 설정 성공!');
        return response.data;
    } catch (error) {
        console.error('이미지 설정 실패:', error);
        alert('이미지 설정에 실패했습니다.');
    }
};

export const uploadProfileImage = async (file:File) => {
    // todo : 1. string이 맞나요?
    // todo : 2. 위 파일과 합칠 수 없나요?
    const formData = new FormData();
    formData.append('imageFile', file);
    
    return axiosInstance.post('/api/members/change-profile-image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const fetchUserInfo = async () => {
    try {
        const response = await axiosInstance.get('/api/members/my-page');
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: '회원정보 호출 중 에러가 발생했습니다'};
    }
};

export const changeUserNickname = async (newNickname:string) => {
    try {
        await axiosInstance.patch('/api/members/change-nickname', { newNickname });
        console.log('닉네임이 성공적으로 변경되었습니다.', newNickname);
    } catch (error) {
        return { success: false, message: '회원정보 호출 중 에러가 발생했습니다'};
    }
};


