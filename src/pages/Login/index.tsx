import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {login} from '../../utils/auth';
import {validatePassword, validateUserId} from '../../utils/validation';
import styles from '../../styles/Login.module.css';
import Layout from '../../components/Layout';
import {useRouter} from 'next/router';
import useToken from '../../hooks/useToken';
import {saveHealthSurvey} from '../../api/survey';

interface FormData {
    username: string;
    password: string;
}

const Login:React.FC = () => {
    const router = useRouter();
    const {loginSaveToken, getTokenValue} = useToken();
    useEffect(() => {
        const accessToken = getTokenValue('zzgg_at');
        if (accessToken) {
            router.push('/');
        }
    }, []);
    
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<FormData>({
        mode: 'onChange',
    });
    
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const openPopup = (url: string, text: string) => {
        localStorage.setItem('activeTab', text);
        window.open(url, 'popup', 'width=600,height=600');
    };
    
    const onSubmit = async (data: FormData) => {
        try {
            const result = await login(data.username, data.password);
            if (result?.data) {
                loginSaveToken({
                    access_token: result.data.accessToken,
                    refresh_token: result.data.refreshToken,
                });
                const accessToken = getTokenValue('zzgg_at');
                const surveyOption = localStorage.getItem('surveyOption');
                if (accessToken && surveyOption) {
                    const parsedOption = JSON.parse(surveyOption);
                    await saveHealthSurvey(parsedOption);
                        localStorage.removeItem("surveyOption")
                        await router.push('/Map', {
                            query: {disease: parsedOption.disease, department: parsedOption.department},
                        });
                } else {
                    await router.push('/');
                }
            }
        } catch (error) {
            console.error('로그인 처리 중 오류:', error);
            setErrorMessage('로그인에 실패했거나 JWT 토큰이 없습니다.');
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
                            type="password"
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
