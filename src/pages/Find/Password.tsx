import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { findPassword } from '../../utils/auth';
import styles from '../../styles/Find.module.css';

interface FormData {
    email: string;
}

const FindPassword: () => JSX.Element = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    
    const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
    
    const onSubmit = async (data: FormData) => {
        const result = await findPassword(data.email);
        if (result) {
            setPasswordMessage('임시 비밀번호가 이메일로 전송되었습니다.');
        } else {
            setPasswordMessage('해당 이메일로 등록된 계정이 없습니다.');
        }
    };
    
    return (
        <div>
            <div className={styles.findPassword}>
                회원가입 시 등록하신 아이디와 이메일 확인 후 임시 비밀번호를 알려드립니다.
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputGroup}>
                    <input
                        placeholder="이메일을 입력해주세요."
                        {...register('email', {
                            required: '이메일을 입력해주세요.',
                        })}
                        className={errors.email ? styles.inputError : styles.input}
                    />
                    {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
                </div>
                
                <button
                    type="submit"
                    className={styles.findButton}
                >
                    임시 비밀번호 받기
                </button>
                {passwordMessage && (
                    <div className={styles.passwordMessage}>
                        {passwordMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default FindPassword;
