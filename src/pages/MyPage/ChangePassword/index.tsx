import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import {checkUserAuthentication } from '../../../api/auth';
import {validatePassword, validateEmail} from '../../../utils/validation';
import styles from '../../../styles/ChangePassword.module.css';
import Layout from '../../../components/common/Layout';
import {GetServerSideProps} from 'next';
import useAuthRedirect from '../../../hooks/useAuthRedirect';
import eye from "../../../../public/assets/icon/ic_eye.png";
import eyeSlash from '../../../../public/assets/icon/ic_eye_slash.png';
import Image from 'next/image';
import {ChangePasswordFormData} from '../../../types/server/formData';
import { useRecoilState } from 'recoil';
import { isVerificationSentForMyPageState } from '../../../state/mypage';
import {useChangePassword, useEmailVerification} from '../../../hooks/react-query/useChangePassword';
import {passwordTypeState} from '../../../state';
import {Snackbar, Alert, SnackbarCloseReason} from '@mui/material';

const Index: React.FC = () => {
    useAuthRedirect();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: {errors, isValid}
    } = useForm<ChangePasswordFormData>({
        mode: 'onChange',
    });
    
    const [isVerificationSent, setIsVerificationSent] = useRecoilState(isVerificationSentForMyPageState);
    const [passwordType, setPasswordType] = useRecoilState(passwordTypeState);
    
    const { mutate: changePassword } = useChangePassword();
    const { mutate: sendEmailVerificationForMyPage } = useEmailVerification();
    
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('success');
    
    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };
    
    const onSubmit = async (data: ChangePasswordFormData) => {
        if (!isVerificationSent) {
            setSnackbarMessage('이메일 인증을 완료해주세요.');
            setSnackbarSeverity('error');
            return;
        }
        changePassword(data);
    };
    
    const handleEmailVerificationRequest = () => {
        const email = getValues('email');
        sendEmailVerificationForMyPage(email, {
            onSuccess: (response) => {
                if (response.success) {
                    setIsVerificationSent(response.data);
                } else {
                    setOpenSnackbar(false);
                    setTimeout(() => {
                        setSnackbarMessage(response.message);
                        setSnackbarSeverity('error');
                        setOpenSnackbar(true);
                    }, 100);
                }
            },
            onError: () => {
                setOpenSnackbar(false);
                setTimeout(() => {
                    setSnackbarMessage('이메일 발송에 실패했습니다. 잠시 후 시도 해주세요.');
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                }, 100);
            }
        });
    };
    
    const email = watch('email','');
    const isEmailValid = !!email && !errors.email;
    
    const handleCloseSnackbar = (
        event: React.SyntheticEvent<any> | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    
    return (
        <Layout>
            <div className={styles.changeContainer}>
                <Snackbar open={openSnackbar} autoHideDuration={1500} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
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
                                className={errors.email ? styles.inputError : styles.input_email}
                            />
                            <button
                                type="button"
                                onClick={handleEmailVerificationRequest}
                                className={styles.verifyButton}
                                disabled={!isEmailValid || !!isVerificationSent}
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
                            <p className={styles.successText}>{isVerificationSent}</p>
                        </div>
                    )}
                    <div className={styles.inputGroup}>
                        <input
                            type={passwordType}
                            placeholder="새 비밀번호 (영문 대/소문자, 숫자 조합 8 ~ 15자리)"
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
