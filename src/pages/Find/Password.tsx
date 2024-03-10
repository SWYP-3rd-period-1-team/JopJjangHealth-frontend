import React from 'react';
import { useForm } from 'react-hook-form';
import {findPassword} from '../../api/find';
import styles from '../../styles/Find.module.css';
import {useRouter} from 'next/router';

interface FormData {
    email: string;
    userId:string;
}

const FindPassword: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const router = useRouter();
    
    const onSubmit = async (data: FormData) => {
        const response = await findPassword(data.userId, data.email);
        if (response.success) {
            router.push({
                pathname: '/Find/Complete'
            });
        }
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
                </div>
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
