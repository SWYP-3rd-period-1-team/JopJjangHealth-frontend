import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from './Header';
import styles from '../../styles/Layout.module.css';
import Image from 'next/image';
import LogoImage from '../../../public/assets/Logo.png';
import LogoText from '../../../public/assets/LogoText.png';
import {LayoutProps} from '../../types/Layout';

const Layout: React.FC<LayoutProps> = ({ children, title = "직짱건강" }) => {
	
	return (
		<div className={styles.main}>
			<Head>
				<title>{title}</title>
			</Head>
			<li className={styles.header}>
				<Link href={"/Home"}>
					<a className={styles.logo_link}>
						<Image src={LogoImage} alt="로고" width={100} height={100}/>
						<Image src={LogoText} alt="로고텍스트" width={122} height={32}/>
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
