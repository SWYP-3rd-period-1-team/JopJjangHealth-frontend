import React from 'react';
import Image from 'next/image';
import LinkBtn from "../../../public/assets/share/ico-share-link.svg";
import styles from "../../styles/ShareButton.module.css"
const CopyToClipboardButton = ({text}) => {
	const copyToClipboard = () => {
		navigator.clipboard.writeText(text).then(() => {
			alert('클립보드에 복사되었습니다!');
		});
	};
	
	return (
		<span className={styles.choice_share_clip}>
			<Image src={LinkBtn} alt="Link" width={100} height={100} onClick={copyToClipboard}/>
		  <p>클립보드</p>
		</span>
	
	);
	
};

export default CopyToClipboardButton;
