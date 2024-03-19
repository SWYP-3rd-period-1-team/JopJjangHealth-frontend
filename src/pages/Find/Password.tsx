import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../../styles/Find.module.css';
import {PasswordFormData} from '../../types/server/formData';
import {useFindPassword} from '../../hooks/react-query/useFind';

const FindPassword: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PasswordFormData>();
    const { mutate: findPassword } = useFindPassword();
    
    const onSubmit = async (data: PasswordFormData) => {
        findPassword(data);
    };
    
    return (
        <div>
            <div className={styles.findPassword}>
                회원가입 시 등록하신 아이디와 이메일<br/> 확인 후 임시 비밀번호를 알려드립니다.
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputGroup}>
                    <input
                        placeholder="아이디"
                        {...register('userId', {
                            required: '아이디를 입력해주세요.',
                        })}
                        className={errors.userId ? styles.inputError : styles.input}
                    />
                    {errors.userId && <p className={styles.errorText}>{errors.userId.message}</p>}
                </div><br/>
                <div className={styles.inputGroup}>
                    <input
                        placeholder="@ 까지 입력해 주세요."
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
            </form>
        </div>
    );
};

export default FindPassword;
