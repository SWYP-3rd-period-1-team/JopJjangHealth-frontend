import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {validatePassword, validateUserId} from '../../utils/validation';
import styles from '../../styles/Login.module.css';
import Layout from '../../components/common/Layout';
import {useRouter} from 'next/router';
import eye from "../../../public/assets/icon/ic_eye.png";
import eyeSlash from '../../../public/assets/icon/ic_eye_slash.png';
import Image from 'next/image';
import {LoginFormData} from "../../types/server/formData";
import { useRecoilState } from 'recoil';
import { passwordVisibilityState } from '../../state';
import useSaveLocalContent from '../../hooks/useSaveLocalContent';
import {useLogin} from '../../hooks/react-query/useAuth';

const Login: React.FC = () => {
    const router = useRouter();
    const {getDecryptedCookie} = useSaveLocalContent();
    const accessToken = getDecryptedCookie('zzgg_at');
    const [passwordType, setPasswordType] = useRecoilState(passwordVisibilityState);
    
    const { mutate: login, errorMessage } = useLogin();
    
    useEffect(() => {
        const checkLoginAndRedirect = async () => {
            if (accessToken) {
                try {
                    await router.push('/');
                } catch (error) {
                    console.error('로그인 후 로그인 페이지로 진입시 리다이렉트 중 오류 발생:', error);
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
        login(data);
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
