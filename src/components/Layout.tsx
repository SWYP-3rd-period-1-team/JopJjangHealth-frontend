import React from 'react';
import Head from 'next/head';
import Header from './Header';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import LogoImage from '../../public/assets/Logo.png';

const Layout = ({children, title = "직짱건강"}) => {
	return (
		<div className={styles.main}>
			<Head>
				<title>{title} | Home</title>
			</Head>
			<div className={styles.header}>
				<Image src={LogoImage} alt="로고" width={100} height={100}/>
				<div>직<strong>짱</strong>건강</div>
				<Header/>
			</div>
			<div className={styles.section}>
				<div className={styles.content}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
