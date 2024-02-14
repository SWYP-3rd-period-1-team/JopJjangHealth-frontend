import React from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header: () => JSX.Element = () => {
	return (
		<>
			<ul className={styles.header_menu}>
				<li className={styles.header_link}>
					<Link href="/Survey/1">
						<a className={styles.header_link_a}>간단 설문</a>
					</Link>
				</li>
				<li className={styles.header_link}>
					<Link href="/Search">
						<a className={styles.header_link_a}>병원 / 약국 찾기</a>
					</Link>
				</li>
				<li className={styles.header_link}>
					<Link href="/Calendar">
						<a className={styles.header_link_a}>질병 캘린더</a>
					</Link>
				</li>
			</ul>
			<ul className={styles.header_menu}>
				<li className={styles.header_link}>
					<Link href="/Login">
						<a className={styles.header_link_login}>로그인</a>
					</Link>
				</li>
			</ul>
		</>
	);
};

export default Header;
