import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../../utils/Auth';
import { validatePassword, validateUserId} from '../../utils/validation';
import styles from './Login.module.css';
import Layout from '../../components/Layout';
import {useRouter} from "next/router";

interface FormData {
	userId: string;
	password: string;
}

const Login: () => JSX.Element = () => {
	const router = useRouter();
	
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormData>({
		mode: 'onChange',
	});
	
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	
	const openPopup = (url: string,text:string) => {
		localStorage.setItem('activeTab',text)
		window.open(url, 'popup', 'width=600,height=400');
	};
	
	const onSubmit = async (data: FormData) => {
		const result = await login(data.userId, data.password);
		if (result === undefined) {
			setErrorMessage('로그인에 실패했거나 JWT 토큰이 없습니다.');
		}
	};
	
	return (
		<Layout>
			<div className={styles.loginContainer}>
				<h3 className={styles.loginTitle}>LOGIN</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.inputGroup}>
						<input
							placeholder="아이디"
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
							placeholder="비밀번호"
							{...register('password', {
								required: '비밀번호를 입력해주세요.',
								validate: validatePassword,
							})}
							className={errors.password ? styles.inputError : styles.input}
						/>
						{errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
					</div>
					
					<button
						type="submit"
						className={styles.submitButton}
						disabled={!isValid}
					>
						로그인하기
					</button>
					{errorMessage && (
						<div className={styles.errorMessage}>
							{errorMessage}
						</div>
					)}
				</form>
			</div>
			<hr className={styles.hr}/>
			<div className={styles.linkContainer}>
				<div onClick={() => router.push('/Join')}>회원가입</div>
				<div onClick={() => openPopup('/Find',"FindId")}>아이디 찾기</div>
				<div onClick={() => openPopup('/Find',"FindPassword")}>비밀번호 찾기</div>
			</div>
		</Layout>
	);
};

export default Login;
