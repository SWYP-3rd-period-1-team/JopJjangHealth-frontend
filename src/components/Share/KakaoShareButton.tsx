import React, { useEffect } from 'react';
import Image from "next/image";
import KakaoBtn from "../../../public/assets/share/ico-share-kakao.svg"
import styles from "../../styles/ShareButton.module.css"

interface KakaoShareButtonProps {
	text: string;
}

declare global {
	interface Window {
		Kakao: any;
	}
}

const KakaoShareButton: React.FC<KakaoShareButtonProps> = ({ text }) => {
	useEffect(() => {
		if (!window.Kakao) {
			const script = document.createElement('script');
			script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
			script.onload = () => {
				window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
			};
			document.head.appendChild(script);
		} else if (!window.Kakao.isInitialized()) {
			window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
		}
	}, []);
	
	const shareKakao = () => {
		if (!window.Kakao || !window.Kakao.isInitialized()) {
			console.error('Kakao SDK가 초기화되지 않았습니다.');
			return;
		}
		
		window.Kakao.Link.sendDefault({
			objectType: 'feed',
			content: {
				title: "직짱건강 설문 공유하기",
				description: '건강 설문을 공유하고 건강을 체크 해보세요!',
				imageUrl: 'https://jop-jjang-health-frontend.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo.dd161765.png&w=128&q=75',
				link: {
					mobileWebUrl: text,
					webUrl: text,
				},
			},
		});
	};
	
	return (
		<span className={styles.choice_share_kakao} onClick={shareKakao}>
            <Image src={KakaoBtn} alt="kakao" width={100} height={100}/>
            <p>카카오톡</p>
        </span>
	);
};

export default KakaoShareButton;
