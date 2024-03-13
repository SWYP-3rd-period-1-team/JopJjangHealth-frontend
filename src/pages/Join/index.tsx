import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {signUp, sendEmailVerification, verifyEmailCode} from '../../api/auth';
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
    isVerificationSentState,
    passwordVisibilityState
} from '../../state/join';
import {useRouter} from 'next/router';
import eye from "../../../public/assets/icon/ic_eye.png";
import eyeSlash from '../../../public/assets/icon/ic_eye_slash.png';
import Image from 'next/image';
import { JoinFormData } from '../../types/server/formData';
import {errorMessageState} from '../../state';

const emailDomains = ['gmail.com', 'naver.com', 'daum.net', 'nate.com', 'other'];

const Join = () => {
    const router = useRouter();
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
    
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
    const [passwordType, setPasswordType] = useRecoilState(passwordVisibilityState);
    
    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };
    
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
    
    const onSubmit = async (data: JoinFormData) => {
        const response = await signUp(data.nickname, data.userId, data.email, data.password);
        if (response?.success) {
            alert(response?.data?.data?.message);
            await router.push(response.data?.data?.surveyUrl)
        } else {
            setErrorMessage(response.message);
        }
    };
    
    const handleEmailVerificationRequest = async () => {
        const email = `${emailUsername}@${emailDomain === 'other' ? customDomain : emailDomain}`;
        const response = await sendEmailVerification(email);
        if (response?.data?.data?.message) {
            alert(response?.data?.data?.message);
            setIsVerificationSent(true);
        } else {
            alert(response?.message.includes('이미 존재하는 이메일 입니다.') ? response.message : '이메일을 확인 해주세요.');
        }
    };
    
    const handleEmailVerification = async () => {
        const formData = getValues();
        const response = await verifyEmailCode(formData.email, formData.emailVerificationCode);
        if (response?.data?.data?.message) {
            setIsVerificationComplete(true);
            setIsVerificationSent(false);
        } else {
          alert(response?.message);
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
                            type={passwordType}
                            placeholder="비밀번호 (영문, 숫자 조합 8 ~ 15자리)"
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
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="Email ID"
                            value={emailUsername}
                            onChange={(e) => setEmailUsername(e.target.value)}
                            className={errors.email ? styles.inputError : styles.input_email}
                        />&nbsp;@&nbsp;
                        <select
                            value={isOtherDomain ? 'other' : emailDomain}
                            className={styles.selectDomain}
                            disabled={true}
                        >
                            {emailDomains.map((domain, index) => (
                                <option key={index} value={domain}>
                                    {domain === 'other' ? '직접 입력' : domain}
                                </option>
                            ))}
                        </select>
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
                                style={{width: '120px'}}
                            />
                        )}
                        <button type="button" onClick={handleEmailVerificationRequest} className={styles.verifyButton}
                                disabled={isVerificationSent}>
                            인증 하기
                        </button>
                    </div>
                    {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
                    
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="이메일 인증"
                            {...register('email', {
                                required: '이메일 인증을 입력해주세요.',
                                validate: validateEmail,
                            })}
                            className={errors.email ? styles.inputError : styles.input}
                        />
                        {errors.email && (
                            <p className={styles.errorText}>{errors.email.message || errorMessage.includes('email')}</p>
                        )}
                    </div>
                    {isVerificationSent && !isVerificationComplete && (
                        <div className={styles.inputGroup}>
                            <input
                                placeholder="인증 코드 입력"
                                {...register('emailVerificationCode', {
                                    required: '인증 코드를 입력해주세요.',
                                })}
                                className={errors.emailVerificationCode ? styles.inputError : styles.inputVerification}
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
