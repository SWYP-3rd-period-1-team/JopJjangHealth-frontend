import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {findId} from '../../api/find';
import styles from '../../styles/Find.module.css';

interface FormData {
    email: string;
}

const FindId: () => JSX.Element = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>();
    
    const [idMessage, setIdMessage] = useState<string | null>(null);
    
    const onSubmit = async (data: FormData) => {
        const id = await findId(data.email);
        if (id) {
            setIdMessage(`회원님의 아이디는 ${id} 입니다.`);
        } else {
            setIdMessage('해당 이메일로 등록된 아이디가 없습니다.');
        }
    };
    
    return (
        <div>
            <div className={styles.findId}>
                회원가입 시 등록하신 이메일로 아이디를 확인 하실 수 있습니다.
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
                    확인
                </button>
                {idMessage && (
                    <div className={styles.idMessage}>
                        {idMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default FindId;
