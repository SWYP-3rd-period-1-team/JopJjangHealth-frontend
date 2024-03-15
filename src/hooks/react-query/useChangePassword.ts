import {useMutation} from '@tanstack/react-query';
import {ChangePasswordFormData} from '../../types/server/formData';
import {changePassword, sendEmailVerificationForMyPage} from '../../api/MyPage';

export const useChangePassword = () => {
    const { mutate } = useMutation({
        mutationFn: (data: ChangePasswordFormData) => changePassword(data.password, data.confirmPassword),
    });
    
    return { mutate };
};

export const useEmailVerification = () => {
    const { mutate } = useMutation({
        mutationFn: (email:string) => sendEmailVerificationForMyPage(email),
    });
    
    return { mutate };
};
