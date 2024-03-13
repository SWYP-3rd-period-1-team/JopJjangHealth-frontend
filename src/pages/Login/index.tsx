import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {login} from '../../api/auth';
import {validatePassword, validateUserId} from '../../utils/validation';
import styles from '../../styles/Login.module.css';
import Layout from '../../components/common/Layout';
import {useRouter} from 'next/router';
import useToken from '../../hooks/useToken';
import {saveHealthSurvey} from '../../api/Survey';
import eye from "../../../public/assets/icon/ic_eye.png";
import eyeSlash from '../../../public/assets/icon/ic_eye_slash.png';
import Image from 'next/image';
import {LoginFormData} from "../../types/server/formData";
import { useRecoilState } from 'recoil';
import { passwordVisibilityState } from '../../state/login';
import {errorMessageState} from '../../state';
import useSaveLocalContent from '../../hooks/useSaveLocalContent';

const Login: React.FC = () => {
    const router = useRouter();
    const {loginSaveToken} = useToken();
    const {getDecryptedCookie} = useSaveLocalContent();
    const accessToken = getDecryptedCookie('zzgg_at');
    const [passwordType, setPasswordType] = useRecoilState(passwordVisibilityState);
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
    
    useEffect(() => {
        const checkLoginAndRedirect = async () => {
            if (accessToken) {
                try {
                    await router.push('/');
                } catch (error) {
                    console.error('Redirect error:', error);
                }
            }
        };
        checkLoginAndRedirect();
    }, [accessToken, router]);
    
    
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        watch,
    } = useForm<LoginFormData>({
        mode: 'onChange',
    });
    
    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };
    
    const openPopup = (url: string, text: string) => {
        localStorage.setItem('activeTab', text);
        window.open(url, 'popup', 'width=580,height=700');
    };
    
    const onSubmit = async (data: LoginFormData) => {
        const response = await login(data.username, data.password);
        if (response?.data) {
            loginSaveToken({
                access_token: response.data.accessToken,
                refresh_token: response.data.refreshToken,
            });
            const surveyOption = localStorage.getItem('surveyOption');
            if (surveyOption) {
                const parsedOption = JSON.parse(surveyOption);
                await saveHealthSurvey(parsedOption);
                localStorage.removeItem('surveyOption');
                await router.push(`/Map?disease=${parsedOption.disease}&department=${parsedOption.department}`);
            } else {
                await router.push('/');
            }
        } else {
            setErrorMessage(response.message.includes('406') ? '아이디나 비밀번호가 일치하지 않습니다.' : '\'로그인에 실패했거나 JWT 토큰이 없습니다.\'');
        }
    };
    
    return (
        <Layout>
            <div className={styles.loginContainer}>
                <div className={styles.loginTitle}>LOGIN</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="아이디"
                            {...register('username', {
                                required: '아이디을 입력해주세요.',
                                validate: validateUserId,
                            })}
                            className={
                                errors.username
                                    ? styles.inputError
                                    : styles.input
                            }
                        />
                        {errors.username && (
                            <p className={styles.errorText}>
                                {errors.username.message}
                            </p>
                        )}
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <input
                            type={passwordType}
                            placeholder="비밀번호"
                            {...register('password', {
                                required: '비밀번호를 입력해주세요.',
                                validate: validatePassword,
                            })}
                            className={
                                errors.password
                                    ? styles.inputError
                                    : styles.input
                            }
                        />
                        <div className={styles.visibilityToggle} onClick={togglePasswordVisibility}>
                            {passwordType === 'password' ?
                                <>
                                    <Image src={eyeSlash} alt={"eye-slash"}/>
                                </> :
                                <>
                                    <Image src={eye} alt={"eye"}/>
                                </>}
                        </div>
                        {errors.password && (
                            <p className={styles.errorText}>
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={!isValid}
                    >
                        로그인하기
                    </button>
                    {errorMessage && (
                        <div className={styles.errorMessage}>
                            {errorMessage}
                        </div>
                    )}
                </form>
            </div>
            <hr className={styles.hr} />
            <div className={styles.linkContainer}>
                <div
                    className={styles.join}
                    onClick={() => router.push('/Join')}
                >
                    회원가입
                </div>
                <div>
                    <span
                        className={styles.findId}
                        onClick={() => openPopup('/Find', 'FindId')}
                    >
                        아이디 찾기
                    </span>
                    <span
                        className={styles.findPassword}
                        onClick={() => openPopup('/Find', 'FindPassword')}
                    >
                        비밀번호 찾기
                    </span>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
