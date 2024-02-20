import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from './Header';
import styles from '../styles/Survey.module.css';
import Image from 'next/image';
import LogoImage from '../../public/assets/Logo.png';

interface LayoutProps {
	children: React.ReactNode;
	title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = "직짱건강" }) => {
	
	return (
		<div className={styles.main}>
			<Head>
				<title>{title} | Home</title>
			</Head>
			<li className={styles.header}>
				<Link href={"/Home"}>
					<a className={styles.logo_link}>
						<Image src={LogoImage} alt="로고" width={100} height={100}/>
						<div className={styles.logo_text}>직<strong>짱</strong>건강</div>
					</a>
				</Link>
				<Header/>
			</li>
			
			<div className={styles.section}>
				<div className={styles.content}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
