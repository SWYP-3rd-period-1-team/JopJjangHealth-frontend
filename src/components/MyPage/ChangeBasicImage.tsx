import React, { useState } from 'react';
import styles from '../../styles/UserProfile.module.css';
import Image from 'next/image';
import {changeUserProfileImage} from '../../api/mypage';

const imageSources = [
    '/assets/character_one.png',
    '/assets/character_two.png',
    '/assets/character_three.png',
    '/assets/character_four.png',
];

const ChangeBasicImage: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    
    const handleSelectImage = (index: number) => {
        setSelectedIndex(index);
    };
    
    const handleSubmit = async () => {
        if (selectedIndex === null) {
            alert('이미지를 선택해주세요.');
            return;
        }
        
        const selectedImagePath = imageSources[selectedIndex];
        await changeUserProfileImage(selectedImagePath);
    };
    
    return (
        <div>
            <div className={styles.images_container}>
                {imageSources.map((src, index) => (
                    <div
                        key={src}
                        className={`${styles.basic_img} ${selectedIndex === index ? styles.selected : ''}`}
                        onClick={() => handleSelectImage(index)}
                    >
                        <Image src={src} alt={`기본사진 ${index + 1}`} width={100} height={100} />
                    </div>
                ))}
            </div>
            <button type="button" className={styles.checkButton} onClick={handleSubmit}>
                확인
            </button>
        </div>
    );
};

export default ChangeBasicImage;
