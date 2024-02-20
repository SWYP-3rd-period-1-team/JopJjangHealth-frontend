import React, { useEffect } from 'react';
import Image from "next/image";
import KakaoBtn from "../../../public/assets/ico-share-kakao.svg"
import styles from "../../styles/ShareButton.module.css"
declare global {
	interface Window {
		Kakao: any;
	}
}

const KakaoShareButton: React.FC = () => {
	
	useEffect(() => {
		const kakaoScript = document.getElementById('kakao-sdk');
		if (!kakaoScript) {
			const script = document.createElement('script');
			script.id = 'kakao-sdk';
			script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
			script.onload = () => {
				window.Kakao.init('YOUR_KAKAO_JS_KEY');
			};
			document.head.appendChild(script);
		} else if (window.Kakao && !window.Kakao.isInitialized()) {
			window.Kakao.init('YOUR_KAKAO_JS_KEY');
		}
	}, []);
	
	const shareKakao = () => {
		window.Kakao.Link.sendDefault({
			objectType: 'feed',
			content: {
				title: '공유할 제목',
				description: '공유할 설명',
				imageUrl: '공유할 이미지 URL',
				link: {
					mobileWebUrl: '',
					webUrl: '',
				},
			},
		});
	};
	
	return (
		<span className={styles.choice_share_kakao}>
			<Image src={KakaoBtn} alt="kakao" width={100} height={100} onClick={shareKakao}/>
		  <p>카카오톡</p>
		</span>
	
	);
};

export default KakaoShareButton;
