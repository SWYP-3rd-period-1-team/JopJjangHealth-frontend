import React, { useState } from 'react';
import styles from '../../styles/UserProfile.module.css';
import Image from 'next/image';
import {changeUserProfileImage, uploadProfileImage} from '../../api/mypage';

const imageSources = [
    '/assets/character_one.png',
    '/assets/character_two.png',
    '/assets/character_three.png',
    '/assets/character_four.png',
];

const ChangeBasicImage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    
    const handleSelectImage = (index: number) => {
        setSelectedIndex(index);
    };
    
    const handleSubmit = async () => {
        if (selectedIndex === null) {
            alert('기본 이미지를 선택해주세요.');
            return;
        }
        
        const selectedImagePath = imageSources[selectedIndex];
        try {
            const response = await fetch(selectedImagePath);
            const blob = await response.blob();
            console.log(blob,"blob: ")
            const file = new File([blob], `selectedImage-${selectedIndex}.png`, { type: 'image/png' });
            console.log(file,"file: ")
            const isDefaultImage = localStorage.getItem('isDefaultImage') === 'true';
            if (isDefaultImage) {
                await uploadProfileImage(file);
                console.log(file,"file: ")
            } else {
                await changeUserProfileImage(file);
                console.log(file,"file:")
            }
            alert('이미지 업로드에 성공했습니다.');
            localStorage.clear();
            window.close();
        } catch (error) {
            alert('이미지 업로드에 실패했습니다.');
            console.error('Upload Error:', error);
        }
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
                        <Image src={src} alt={`기본사진 ${index + 1}`} width={150} height={150} />
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
