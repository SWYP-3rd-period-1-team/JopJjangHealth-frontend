import {useMutation} from '@tanstack/react-query';
import {uploadProfileImage} from '../../api/MyPage';

export const useUploadProfileImage = () => {
    const { mutate } = useMutation({
        mutationFn: (file: File) => uploadProfileImage(file),
        onSuccess: () => {
            alert('이미지 업로드에 성공했습니다.')
            localStorage.clear();
            window.close();
        },
        onError: () => {
            alert('이미지 업로드에 실패했습니다.');
        }
    });
    
    return { mutate };
};

export const useChangeUserProfileImage = () => {
    const { mutate } = useMutation({
        mutationFn: (file: File) => uploadProfileImage(file),
        onSuccess: () => {
            alert('이미지 업로드에 성공했습니다.')
            localStorage.clear();
            window.close();
        },
        onError: () => {
            alert('이미지 업로드에 실패했습니다.');
        }
    });
    
    return { mutate };
};
