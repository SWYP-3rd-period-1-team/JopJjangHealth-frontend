import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {sendEmailVerification, verifyEmailCode} from '../../../utils/auth';
import {validatePassword, validateEmail} from '../../../utils/validation';

import styles from '../../../styles/ChangePassword.module.css';
import Layout from '../../../components/Layout';
import {ChangePassword} from '../../../api/mypage';

interface FormData {
    password: string;
    confirmPassword: string;
    email: string;
    emailVerificationCode: string;
}

const Index: React.FC = () => {
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
    const emailValue = watch('email');
    const emailVerificationCodeValue = watch('emailVerificationCode');
    
    const [emailUsername, setEmailUsername] = useState('');
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [isVerificationComplete, setIsVerificationComplete] = useState(false);
    
    const onSubmit = async (data: FormData) => {
        if (!isVerificationComplete) {
            alert('이메일 인증을 완료해주세요.');
            return;
        }
        await ChangePassword(data.password, data.confirmPassword);
    };
    
    // todo :회원가입 때의 이메일 인증과 마이 페이지 기본 인증이 다릅니다.
    const handleEmailVerificationRequest = async () => {
        const formData = getValues();
        const result = await sendEmailVerification(formData.email);
        if (result?.success) {
            setIsVerificationSent(true);
            setEmailUsername(formData.email);
        } else {
            alert('이메일 발송에 실패했습니다. 다시 시도해주세요.');
        }
    };
    
    const handleEmailVerification = async () => {
        const formData = getValues();
        const verificationResult = await verifyEmailCode(formData.email, formData.emailVerificationCode);
        if (verificationResult?.success) {
            setIsVerificationComplete(true);
            setIsVerificationSent(false);
        } else {
            alert('잘못된 인증 코드입니다. 다시 확인해주세요.');
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
                    {isVerificationSent && !isVerificationComplete && (
                        <div className={styles.inputGroup}>
                            <div className={styles.inputWithButton}>
                                <input
                                    placeholder="인증 코드 입력"
                                    {...register('emailVerificationCode', {
                                        required: '인증 코드를 입력해주세요.'
                                    })}
                                    className={errors.emailVerificationCode ? styles.inputError : styles.input}
                                />
                                <button
                                    type="button"
                                    onClick={handleEmailVerification}
                                    className={styles.verifyButton}
                                    disabled={!emailVerificationCodeValue}
                                >
                                    인증 확인
                                </button>
                            </div>
                            {errors.emailVerificationCode && (
                                <p className={styles.errorText}>{errors.emailVerificationCode.message}</p>
                            )}
                        </div>
                    )}
                    {isVerificationComplete && (
                        <div className={styles.inputGroup}>
                            <p className={styles.successText}>인증 완료되었습니다.</p>
                        </div>
                    )}
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="새 비밀번호 (영문, 숫자 조합 8 ~ 15자리)"
                            {...register('password', {
                                required: '비밀번호를 입력해주세요.',
                                validate: validatePassword
                            })}
                            className={errors.password ? styles.inputError : styles.input}
                        />
                        {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
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
                        disabled={!isValid || !isVerificationComplete}
                    >
                        변경하기
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Index;
