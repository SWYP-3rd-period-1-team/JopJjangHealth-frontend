import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {signUp, sendEmailVerification, verifyEmailCode} from '../../utils/auth';
import {validateNickname, validateUserId, validatePassword, validateEmail} from '../../utils/validation';
import styles from '../../styles/Join.module.css';
import Layout from '../../components/Layout';
import {useRecoilState} from 'recoil';
import {
    customDomainState,
    emailDomainState,
    emailUsernameState,
    isAgreedState, isVerificationCompleteState,
    isVerificationSentState,
} from '../../state/join';
import {useQueryClient} from '@tanstack/react-query';

interface FormData {
    nickname: string;
    userId: string;
    password: string;
    confirmPassword: string;
    email: string;
    emailVerificationCode: string;
}

const emailDomains = ['gmail.com', 'naver.com', 'daum.net', 'nate.com', 'other'];

const Join = () => {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: {errors, isValid},
    } = useForm<FormData>({
        mode: 'onChange',
    });
    
    const [emailUsername, setEmailUsername] = useRecoilState(emailUsernameState);
    const [emailDomain, setEmailDomain] = useRecoilState(emailDomainState);
    const [customDomain, setCustomDomain] = useRecoilState(customDomainState);
    const [isVerificationSent, setIsVerificationSent] = useRecoilState(isVerificationSentState);
    const [isVerificationComplete, setIsVerificationComplete] = useRecoilState(isVerificationCompleteState);
    const [isAgreed, setIsAgreed] = useRecoilState(isAgreedState);
    
    useEffect(() => {
        const fullEmail = `${emailUsername}@${emailDomain === 'other' ? customDomain : emailDomain}`;
        setValue('email', fullEmail);
    }, [emailUsername, emailDomain, customDomain, setValue]);
    
    const onSubmit = async (data: FormData) => {
        await signUp(data.nickname, data.userId, data.email, data.password);
    };
    
    const handleEmailVerificationRequest = async () => {
        const email = `${emailUsername}@${emailDomain === 'other' ? customDomain : emailDomain}`;
        const result = await sendEmailVerification(email);
        if (result.success) {
            setIsVerificationSent(true);
            alert('인증 코드가 발송되었습니다. 이메일을 확인해주세요.');
        } else {
            alert('이메일 발송에 실패했습니다. 다시 시도해주세요.');
        }
    };
    
    const handleEmailVerification = async () => {
        const formData = getValues();
        const verificationResult = await verifyEmailCode(formData.email, formData.emailVerificationCode);
        if (verificationResult.success) {
            alert('이메일이 성공적으로 인증되었습니다.');
            setIsVerificationComplete(true);
            setIsVerificationSent(false);
        } else {
            alert('잘못된 인증 코드입니다. 다시 확인해주세요.');
        }
    };
    
    const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setEmailDomain(value);
        if (value === 'other') {
            setCustomDomain('');
        }
    };
    
    const isOtherDomain = emailDomain === 'other';
    
    const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAgreed(e.target.checked);
    };
    
    return (
        <Layout>
            <div className={styles.joinContainer}>
                <h3 className={styles.joinTitle}>JOIN</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="닉네임 (8글자까지 가능)"
                            {...register('nickname', {
                                required: '닉네임을 입력해주세요.',
                                validate: validateNickname,
                            })}
                            className={errors.nickname ? styles.inputError : styles.input}
                        />
                        {errors.nickname && <p className={styles.errorText}>{errors.nickname.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="아이디 (영문 소문자 또는 영문 소문자, 숫자 조합 6 ~ 12자리)"
                            {...register('userId', {
                                required: '아이디을 입력해주세요.',
                                validate: validateUserId,
                            })}
                            className={errors.userId ? styles.inputError : styles.input}
                        />
                        {errors.userId && <p className={styles.errorText}>{errors.userId.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="비밀번호 (영문, 숫자 조합 8 ~ 15자리)"
                            {...register('password', {
                                required: '비밀번호를 입력해주세요.',
                                validate: validatePassword,
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
                                    value === watch('password') || '비밀번호가 일치하지 않습니다.'
                            })}
                            className={errors.confirmPassword ? styles.inputError : styles.input}
                        />
                        {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="Email ID"
                            value={emailUsername}
                            onChange={(e) => setEmailUsername(e.target.value)}
                            className={errors.email ? styles.inputError : styles.input_email}
                        />&nbsp;@&nbsp;
                        <select
                            value={isOtherDomain ? 'other' : emailDomain}
                            onChange={handleDomainChange}
                            className={styles.selectDomain}
                        >
                            {emailDomains.map((domain, index) => (
                                <option key={index} value={domain}>
                                    {domain === 'other' ? '직접 입력' : domain}
                                </option>
                            ))}
                        </select>
                        {isOtherDomain && (
                            <input
                                placeholder="이메일 도메인 직접 입력"
                                value={customDomain}
                                onChange={(e) => setCustomDomain(e.target.value)}
                                className={styles.input}
                            />
                        )}
                    </div>
                    {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="이메일 인증"
                            {...register('email', {
                                required: '비밀번호를 입력해주세요.',
                                validate: validateEmail,
                            })}
                            className={errors.email ? styles.inputError : styles.input}
                        />
                        {errors.email && (
                            <p className={styles.errorText}>{errors.email.message}</p>
                        )}
                        <button type="button" onClick={handleEmailVerificationRequest} className={styles.verifyButton}
                                disabled={isVerificationSent}>
                            인증 하기
                        </button>
                    </div>
                    {isVerificationSent && !isVerificationComplete && (
                        <div className={styles.inputGroup}>
                            <input
                                placeholder="인증 코드 입력"
                                {...register('emailVerificationCode', {
                                    required: '인증 코드를 입력해주세요.',
                                })}
                                className={errors.emailVerificationCode ? styles.inputError : styles.input}
                            />
                            {errors.emailVerificationCode && (
                                <p className={styles.errorText}>{errors.emailVerificationCode.message}</p>
                            )}
                            <button type="button" onClick={handleEmailVerification} className={styles.verifyButton}>
                                인증 확인
                            </button>
                        </div>
                    )}
                    {!isVerificationSent && isVerificationComplete && (
                        <div className={styles.inputGroup}>
                            <p className={styles.verifiedText}>이메일이 인증되었습니다.</p>
                        </div>
                    )}
                    <div className={styles.inputGroup}>
                        <label>
                            <input
                                type="checkbox"
                                checked={isAgreed}
                                onChange={handleAgreementChange}
                            />
                            개인정보 수집 및 이용 동의
                        </label>
                    </div>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={!isValid || !isAgreed || !isVerificationComplete}
                    >
                        회원가입하기
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Join;
