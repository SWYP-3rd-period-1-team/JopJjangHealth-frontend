import {useMutation} from '@tanstack/react-query';
import {changeUserProfileImage, uploadProfileImage} from '../../api/MyPage';

export const useUploadProfileImage = () => {
    const { mutate } = useMutation({
        mutationFn: async (file: File) => {
            try {
                const response = await uploadProfileImage(file);
                console.log(response,"response")
                if (!response.success) {
                    throw new Error('Server responded with an error');
                }
                return response;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            alert('이미지 업로드에 성공했습니다.');
            localStorage.clear();
            window.close();
        },
        onError: (error) => {
            console.error('Error uploading image:', error);
            alert('이미지 업로드에 실패했습니다.');
        }
    });
    
    return { mutate };
};

export const useChangeUserProfileImage = () => {
    const { mutate } = useMutation({
        mutationFn: async (file: File) => {
            try {
                const response = await changeUserProfileImage(file);
                if (!response.success) {
                    throw new Error('Server responded with an error');
                }
                return response;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            alert('이미지 업로드에 성공했습니다.');
            localStorage.clear();
            window.close();
        },
        onError: (error) => {
            console.error('Error uploading image:', error);
            alert('이미지 업로드에 실패했습니다.');
        }
    });
    
    return { mutate };
};

