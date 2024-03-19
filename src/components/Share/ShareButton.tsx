import React, { useState } from "react";
import Image from 'next/image';
import KakaoShareButton from './KakaoShareButton';
import CopyToClipboardButton from './CopyToClipboardButton';
import styles from "../../styles/Survey.module.css";
import share from "../../../public/assets/icon/ic_share.png";
import Modal from "./Modal";
import { useRouter } from "next/router";

const SharePage: React.FC = () => {
	const router = useRouter();
	const [showModal, setShowModal] = useState<boolean>(false);
	
	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);
	
	const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${router.asPath}` : '';
	
	return (
		<div>
			<button className={styles.share_button} onClick={openModal}>
				<span className={styles.text}>공유하기</span>
				<Image src={share} alt="share" width={16} height={16} priority/>
			</button>
			<Modal show={showModal} onClose={closeModal}>
				공유하기<br/>
				<div className={styles.choice_share}>
					<KakaoShareButton text={shareUrl}/>
					<CopyToClipboardButton text={shareUrl} />
				</div>
			</Modal>
		</div>
	);
};

export default SharePage;
