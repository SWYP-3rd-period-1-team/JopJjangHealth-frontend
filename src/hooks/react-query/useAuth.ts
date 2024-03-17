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
        onSuccess: (data) => {
            if (data.success) {
                logoutDeleteToken();
                localStorage.clear();
                router.push('/Home');
            } else {
                alert(data.message || '로그아웃에 실패하였습니다. 잠시 후 시도 해주세요.');
            }
        },
        onError: (error) => {
            alert('로그아웃에 실패하였습니다. 잠시 후 시도 해주세요.');
            console.error('로그아웃 failed:', error);
        },
    });
    return {mutate};
};

export const useLogin = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const {mutate: saveHealthSurvey} = useSaveHealthSurvey();
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
    const {loginSaveToken} = useToken();
    
    const {mutate} = useMutation({
        mutationFn: (data: LoginFormData) => login(data.username, data.password),
        onSuccess: (response) => {
            if (response.success) {
                loginSaveToken({
                    access_token: response.data.accessToken,
                    refresh_token: response.data.refreshToken,
                });
                queryClient.invalidateQueries();
                
                const surveyOption = localStorage.getItem('surveyOption');
                if (surveyOption) {
                    const parsedOption = JSON.parse(surveyOption);
                    saveHealthSurvey(parsedOption, {
                        onSuccess: (response) => {
                            if (response.success) {
                                router.push({
                                    pathname: '/Map',
                                    query: {
                                        disease: parsedOption.disease.join(','),
                                        department: parsedOption.department.join(','),
                                    },
                                });
                            } else {
                                alert('건강 설문 불러오기를 실패하였습니다. 잠시 후 시도 해주세요.');
                            }
                        },
                        onError: (error) => {
                            console.error('건강 설문 불러오기를 실패:', error);
                            alert('건강 설문 불러오기를 실패하였습니다. 잠시 후 시도 해주세요.');
                        },
                    });
                    localStorage.removeItem('surveyOption');
                    router.push(`/Map?disease=${parsedOption.disease}&department=${parsedOption.department}`);
                } else {
                    router.push('/');
                }
            }
            else {
                // @ts-ignore
                setErrorMessage(response.message)
            }
        },
        onError: () => {
            setErrorMessage('로그인에 실패했거나 JWT 토큰이 없습니다. 다시 로그인을 시도해주세요.');
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
                router.push(response.data?.data?.surveyUrl);
            } else {
                // @ts-ignore
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
            if (response?.success) {
                alert(response?.data?.data?.message);
                setIsVerificationSent(true);
            } else {
                alert(response?.message?.message);
            }
        },
        onError: () => {
            alert('이메일 요청이 정상적으로 되지 않았습니다. 잠시 후 시도 해주세요.');
        },
    });
    
    return {mutate};
};

export const useVerifyEmailCode = () => {
    const [, setIsVerificationSent] = useRecoilState(isVerificationSentState);
    const [, setIsVerificationComplete] = useRecoilState(isVerificationCompleteState);
    
    const {mutate} = useMutation({
        mutationFn: (formData: VerifyEmailFormData) => verifyEmailCode(formData.email, formData.emailVerificationCode),
        onSuccess: (response) => {
            if (response?.data?.data?.message) {
                setIsVerificationComplete(true);
                setIsVerificationSent(false);
            } else {
                alert(response?.message?.message);
            }
        },
        onError: () => {
            alert('이메일 확인 요청이 정상적으로 되지 않았습니다. 잠시 후 시도 해주세요.');
        },
    });
    
    return {mutate};
};
