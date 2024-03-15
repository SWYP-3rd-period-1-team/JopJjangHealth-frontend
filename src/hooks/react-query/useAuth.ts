import useToken from '../useToken';
import useSaveLocalContent from '../useSaveLocalContent';
import {login, logout, sendEmailVerification, signUp, verifyEmailCode} from '../../api/auth';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {JoinFormData, LoginFormData, VerifyEmailFormData} from '../../types/server/formData';
import {errorMessageState} from '../../state';
import {useRecoilState} from 'recoil';
import {useSaveHealthSurvey} from './useSurvey';
import {isVerificationCompleteState, isVerificationSentState} from '../../state/join';

export const useLogout = () => {
    const queryClient = useQueryClient();
    const {logoutDeleteToken} = useToken();
    const router = useRouter();
    const {getDecryptedCookie} = useSaveLocalContent();
    const refreshToken = getDecryptedCookie('zzgg_rt');
    
    const {mutate} = useMutation({
        mutationFn: () => logout(refreshToken),
        onSuccess: () => {
            logoutDeleteToken();
            localStorage.clear();
            queryClient.clear();
            router.push('/Home');
        },
        onError: (error) => {
            console.error('Logout failed:', error);
        },
    });
    return {mutate};
};

export const useLogin = () => {
    const router = useRouter();
    const { mutate: saveHealthSurvey } = useSaveHealthSurvey();
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
    const {loginSaveToken} = useToken();
    
    const {mutate} = useMutation({
        mutationFn: (data: LoginFormData) => login(data.username, data.password),
        onSuccess: (response) => {
            if(response.success) {
                loginSaveToken({
                    access_token: response.data.accessToken,
                    refresh_token: response.data.refreshToken,
                });
                const surveyOption = localStorage.getItem('surveyOption');
                if (surveyOption) {
                    const parsedOption = JSON.parse(surveyOption);
                    saveHealthSurvey(parsedOption);
                    localStorage.removeItem('surveyOption');
                    router.push(`/Map?disease=${parsedOption.disease}&department=${parsedOption.department}`);
                } else {
                    router.push('/');
                }
            } else {
                setErrorMessage(response.message.includes('406') ? '아이디나 비밀번호가 일치하지 않습니다.' : '로그인에 실패했거나 JWT 토큰이 없습니다.');
            }
        },
        onError: () => {
            setErrorMessage('로그인에 실패했거나 JWT 토큰이 없습니다. 다시 시도해주세요.');
        },
    });
    
    return {mutate, errorMessage};
};

export const useSignUp = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
    
    const {mutate} = useMutation({
        mutationFn: (data: JoinFormData) => signUp(data.nickname, data.userId, data.email, data.password),
        onSuccess: (response) => {
            if (response?.success) {
                alert(response?.data?.data?.message);
                router.push(response.data?.data?.surveyUrl)
            } else {
                setErrorMessage(response.message);
            }
        },
        onError: () => {
            setErrorMessage('회원가입이 정상적으로 되지 않았습니다. 추후 재시도 바랍니다.');
        },
    });
    
    return {mutate, errorMessage};
};

export const useSendEmailVerification = () => {
    const [, setIsVerificationSent] = useRecoilState(isVerificationSentState);
    const {mutate} = useMutation({
        mutationFn: (email: string) => sendEmailVerification(email),
        onSuccess: (response) => {
            if (response?.data?.data?.message) {
                alert(response?.data?.data?.message);
                setIsVerificationSent(true);
            } else {
                alert(response?.message.includes('이미 존재하는 이메일 입니다.') ? response.message : '이메일을 확인 해주세요.');
            }
        },
        onError: () => {
            alert('이메일 확인 요청이 정상적으로 되지 않았습니다. 추후 재시도 바랍니다.');
        },
    });
    
    return {mutate};
};

export const useVerifyEmailCode = () => {
    const [, setIsVerificationSent] = useRecoilState(isVerificationSentState);
    const [, setIsVerificationComplete] = useRecoilState(isVerificationCompleteState);
    
    const {mutate} = useMutation({
        mutationFn: (formData:VerifyEmailFormData) => verifyEmailCode(formData.email, formData.emailVerificationCode),
        onSuccess: (response) => {
            if (response?.data?.data?.message) {
                setIsVerificationComplete(true);
                setIsVerificationSent(false);
            } else {
                alert(response?.message);
            }
        },
        onError: () => {
            alert('이메일 요청이 확인되지 않았습니다. 추후 재시도 바랍니다.');
        },
    });
    
    return {mutate};
};
