import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {validateNickname, validateUserId, validatePassword, validateEmail} from '../../utils/validation';
import styles from '../../styles/Join.module.css';
import Layout from '../../components/common/Layout';
import {useRecoilState} from 'recoil';
import {
    customDomainState,
    emailDomainState,
    emailUsernameState,
    isAgreedState,
    isVerificationCompleteState,
    isVerificationSentState
} from '../../state/join';
import eye from "../../../public/assets/icon/ic_eye.png";
import eyeSlash from '../../../public/assets/icon/ic_eye_slash.png';
import Image from 'next/image';
import { JoinFormData } from '../../types/server/formData';
import {useSendEmailVerification, useSignUp, useVerifyEmailCode} from '../../hooks/react-query/useAuth';
import {errorMessageState, passwordVisibilityState} from '../../state';

const emailDomains = [
    '',
    'gmail.com',
    'naver.com',
    'daum.net',
    'nate.com',
    'hotmail.com',
    'yahoo.com',
    'outlook.com',
    'icloud.com',
];

const Join = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: {errors, isValid},
    } = useForm<JoinFormData>({
        mode: 'onChange',
    });
    const { mutate: signUp, errorMessage } = useSignUp();
    const { mutate: sendEmailVerification } = useSendEmailVerification();
    const { mutate: verifyEmailCode } = useVerifyEmailCode();
    
    const [passwordType, setPasswordType] = useRecoilState(passwordVisibilityState);
    
    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };
    
    const [emailUsername, setEmailUsername] = useRecoilState(emailUsernameState);
    const [emailDomain, setEmailDomain] = useRecoilState(emailDomainState);
    const [customDomain, setCustomDomain] = useRecoilState(customDomainState);
    const [isVerificationSent, ] = useRecoilState(isVerificationSentState);
    const [isVerificationComplete, ] = useRecoilState(isVerificationCompleteState);
    const [isAgreed, setIsAgreed] = useRecoilState(isAgreedState);
    const [, setErrorMessage] = useRecoilState(errorMessageState);
    
    useEffect(() => {
        setErrorMessage('');
    }, [setErrorMessage]);
    
    useEffect(() => {
        const fullEmail = emailDomain === '' ? `${emailUsername}${emailUsername? "@" : " "}${customDomain}` : `${emailUsername}@${emailDomain || customDomain}`;
        setValue('email', fullEmail);
    }, [emailUsername, emailDomain, customDomain, setValue]);
    
    const onSubmit = async (data: JoinFormData) => {
        signUp(data);
    };
    
    const handleEmailVerificationRequest = async () => {
        const email = `${emailUsername}@${emailDomain === '' ? customDomain : emailDomain}`;
        sendEmailVerification(email);
    };
    
    const handleEmailVerification = async () => {
        const formData = getValues();
        verifyEmailCode(formData);
    };
    
    const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setEmailDomain(value);
        if (value === '') {
            setCustomDomain('');
        }
    };
    
    const isOtherDomain = emailDomain === '';
    
    const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAgreed(e.target.checked);
    };
    
    return (
        <Layout>
            <div className={styles.joinContainer}>
                <div className={styles.joinTitle}>JOIN</div>
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
                            placeholder="아이디 (영문 대/소문자 , 숫자 조합 6 ~ 12자리)"
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
                            type={passwordType}
                            placeholder="비밀번호 (영문 대/소문자, 숫자 조합 8 ~ 15자리)"
                            {...register('password', {
                                required: '비밀번호를 입력해주세요.',
                                validate: validatePassword,
                            })}
                            className={errors.password ? styles.inputError : styles.input}
                        />
                        <div className={styles.visibilityToggle} onClick={togglePasswordVisibility}>
                            {passwordType === 'password' ?
                                <>
                                    <Image src={eyeSlash} alt={'eye-slash'} priority/>
                                </> :
                                <>
                                    <Image src={eye} alt={'eye'} priority/>
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
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="이메일"
                            value={emailUsername}
                            onChange={(e) => setEmailUsername(e.target.value)}
                            style={{width:"180px"}}
                            className={errors.email ? styles.inputError : styles.input_email}
                        />
                        {" "}@{" "}
                        <input
                            placeholder="직접 입력"
                            value={isOtherDomain ? customDomain : emailDomain}
                            onChange={(e) => setCustomDomain(e.target.value)}
                            className={styles.input}
                            style={{width: "180px"}}
                        />
                        <select
                            value={isOtherDomain ? '' : emailDomain}
                            onChange={handleDomainChange}
                            className={styles.selectDomain}
                        >
                            {emailDomains.map((domain, index) => (
                                <option key={index} value={domain}>
                                    {domain === '' ? '선택' : domain}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="이메일 인증"
                            {...register('email', {
                                required: '이메일 인증을 입력해주세요.',
                                validate: validateEmail,
                            })}
                            style={{width: '390px'}}
                            className={errors.email ? styles.inputError : styles.input_email_text}
                        />
                        <button type="button" onClick={handleEmailVerificationRequest} className={styles.verifyButton}
                                disabled={isVerificationSent}>
                            인증하기
                        </button>
                        {errors.email && (
                            <p className={styles.errorText}>{errors.email.message || errorMessage.includes('email')}</p>
                        )}
                    </div>
                    {isVerificationSent && !isVerificationComplete && (
                        <div className={`${styles.inputGroup} ${styles.emailInputGroup}`}>
                            <input
                                placeholder="인증 코드 입력"
                                {...register('emailVerificationCode', {
                                    required: '인증 코드를 입력해주세요.',
                                })}
                                className={errors.emailVerificationCode ? styles.inputError : styles.inputVerification}
                            />
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
                    {errorMessage && (
                        <div className={styles.errorText}>{errorMessage}</div>
                    )}
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
