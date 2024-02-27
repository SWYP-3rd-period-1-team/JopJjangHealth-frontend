import React, {useState} from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import {useRouter} from "next/router";

const Header: () => React.JSX.Element = () => {
	const router = useRouter();
	const [loginTrue, setLoginTrue] = useState(true);
	
	const isActive = (path: string, baseStyle: string) => {
		const isBaseActive = router.pathname === path; // 기존과 동일한 경로 확인
		const isSubpageActive = router.pathname.startsWith(`${path}/`); // '/MyPage'로 시작하는 하위 경로 확인
		
		// 기존 경로 또는 하위 경로가 활성화된 경우에 진하게 마킹
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
								<a className={isActive('/Like', styles.header_link_login)}>찜</a>
							</Link>
						</li>
						<li className={styles.header_link}>
							<Link href="/MyPage">
								<a className={isActive('/MyPage', styles.header_link_login_second)}>마이페이지</a>
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
