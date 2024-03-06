import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import {useRouter} from "next/router";
import useToken from '../hooks/useToken';

const Header: React.FC = () => {
	const router = useRouter();
	const { getTokenValue } = useToken();
	const [loginTrue, setLoginTrue] = useState(false);
	
	useEffect(() => {
		const checkLoginStatus = () => {
			const accessToken = getTokenValue('zzgg_at');
			setLoginTrue(!!accessToken);
		};
		
		checkLoginStatus();
		
		router.events.on('routeChangeComplete', checkLoginStatus);
		
		return () => {
			router.events.off('routeChangeComplete', checkLoginStatus);
		};
	}, [router.events, getTokenValue]);
	
	const isActive = (path: string, baseStyle: string) => {
		const isBaseActive = router.pathname === path;
		const isSubpageActive = router.pathname.startsWith(`${path}/`);
		
		return isBaseActive || isSubpageActive ? `${baseStyle} ${styles.active}` : baseStyle;
	};
	
	return (
		<>
			<ul className={styles.header_menu}>
				<li className={styles.header_link}>
					<Link href="/Survey/1">
						<a className={isActive('/Survey', styles.header_link_a)}>간단 설문</a>
					</Link>
				</li>
				<li className={styles.header_link}>
					<Link href="/Search">
						<a className={isActive('/Search', styles.header_link_a)}>병원 / 약국 찾기</a>
					</Link>
				</li>
				<li className={styles.header_link}>
					<Link href="/Calendar">
						<a className={isActive('/Calendar', styles.header_link_a )}>질병 캘린더</a>
					</Link>
				</li>
			</ul>
			<ul className={styles.header_menu}>
				{loginTrue ?
					<>
						<li className={styles.header_link}>
							<Link href="/Like">
								<a className={isActive('/Like', styles.header_link_login_second)}>찜</a>
							</Link>
						</li>
						<li className={styles.header_link}>
							<Link href="/MyPage">
								<a className={isActive('/MyPage', styles.header_link_login)}>마이페이지</a>
							</Link>
						</li>
					</>
					:
					<>
						<li className={styles.header_link}>
							<Link href="/Login">
								<a className={isActive('/Login', styles.header_link_login)}>로그인</a>
							</Link>
						</li>
					</>}
			</ul>
		</>
	);
};

export default Header;
