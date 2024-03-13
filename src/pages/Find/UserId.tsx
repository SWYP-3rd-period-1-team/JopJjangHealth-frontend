import React from 'react';
import {useForm} from 'react-hook-form';
import {findId} from '../../api/Find';
import styles from '../../styles/Find.module.css';
import {useRouter} from 'next/router';
import {FindFormData} from '../../types/server/formData';

const FindId:React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FindFormData>();
    const router = useRouter();
    
    const onSubmit = async (data: FindFormData) => {
        const response = await findId(data.email);
        if (response.success) {
            router.push({
                pathname: '/Find/Complete',
                query: {userId: response.data.data.userId},
            });
        }
    };
    
    return (
        <div>
            <div className={styles.findId}>
                회원가입 시 등록하신 이메일로<br />아이디를 확인 하실 수 있습니다.
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    확인
                </button>
            </form>
        </div>
    );
};

export default FindId;
