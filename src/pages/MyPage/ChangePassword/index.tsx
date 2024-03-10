import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {checkUserAuthentication } from '../../../utils/auth';
import {sendEmailVerificationForMyPage } from "../../../api/mypage";
import {validatePassword, validateEmail} from '../../../utils/validation';

import styles from '../../../styles/ChangePassword.module.css';
import Layout from '../../../components/Layout';
import {ChangePassword} from '../../../api/mypage';
import {GetServerSideProps} from 'next';
import useAuth from '../../../hooks/useAuth';
import eye from "../../../../public/assets/icon/ic_eye.png";
import eyeSlash from '../../../../public/assets/icon/ic_eye_slash.png';
import Image from 'next/image';

interface FormData {
    password: string;
    confirmPassword: string;
    email: string;
}

const Index: React.FC = () => {
    useAuth();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: {errors, isValid}
    } = useForm<FormData>({
        mode: 'onChange',
    });
    
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };
    
    const onSubmit = async (data: FormData) => {
        if (!isVerificationSent) {
            alert('이메일 인증을 완료해주세요.');
            return;
        }
        await ChangePassword(data.password, data.confirmPassword);
    };
    
    const handleEmailVerificationRequest = async () => {
        const formData = getValues();
        const result = await sendEmailVerificationForMyPage(formData.email);
        if (result?.success) {
            setIsVerificationSent(true);
        } else {
            alert('이메일 발송에 실패했습니다. 다시 시도해주세요.');
        }
    };
    
    return (
        <Layout>
            <div className={styles.changeContainer}>
                <h3 className={styles.changeTitle}>비밀번호 변경</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputGroup}>
                        <div className={styles.inputWithButton}>
                            <input
                                placeholder="가입한 이메일"
                                {...register('email', {
                                    required: '이메일을 입력해주세요.',
                                    validate: validateEmail
                                })}
                                disabled={isVerificationSent}
                                className={errors.email ? styles.inputError : styles.input}
                            />
                            <button
                                type="button"
                                onClick={handleEmailVerificationRequest}
                                className={styles.verifyButton}
                                disabled={isVerificationSent}
                            >
                                인증하기
                            </button>
                        </div>
                        {errors.email && (
                            <p className={styles.errorText}>{errors.email.message}</p>
                        )}
                    </div>
                    {isVerificationSent && (
                        <div className={styles.inputGroup}>
                            <p className={styles.successText}>인증 완료되었습니다.</p>
                        </div>
                    )}
                    <div className={styles.inputGroup}>
                        <input
                            type={passwordType}
                            placeholder="새 비밀번호 (영문, 숫자 조합 8 ~ 15자리)"
                            {...register('password', {
                                required: '비밀번호를 입력해주세요.',
                                validate: validatePassword,
                            })}
                            className={errors.password ? styles.inputError : styles.input}
                        />
                        <div className={styles.visibilityToggle} onClick={togglePasswordVisibility}>
                            {passwordType === 'password' ?
                                <>
                                    <Image src={eyeSlash} alt={'eye-slash'} />
                                </> :
                                <>
                                    <Image src={eye} alt={'eye'} />
                                </>}
                        </div>
                        {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type={passwordType}
                            placeholder="비밀번호 확인"
                            {...register('confirmPassword', {
                                validate: value =>
                                    value === watch('password') || '비밀번호가 일치하지 않습니다.',
                            })}
                            className={errors.confirmPassword ? styles.inputError : styles.input}
                        />
                        {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={!isValid || !isVerificationSent}
                    >
                        변경하기
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return checkUserAuthentication(context);
};
