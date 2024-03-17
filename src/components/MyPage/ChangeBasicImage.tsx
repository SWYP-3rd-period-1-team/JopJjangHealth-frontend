import React from 'react';
import styles from '../../styles/UserProfile.module.css';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import {changeBasicImageSelectedIndex} from '../../state/mypage';
import {useChangeUserProfileImage, useUploadProfileImage} from '../../hooks/react-query/useProfileImage';

const imageSources = [
    '/assets/myPage/character_one.png',
    '/assets/myPage/character_two.png',
    '/assets/myPage/character_three.png',
    '/assets/myPage/character_four.png',
];

const ChangeBasicImage: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useRecoilState(changeBasicImageSelectedIndex);
    const { mutate: uploadImage } = useUploadProfileImage();
    const { mutate: changeImage } = useChangeUserProfileImage();
    
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
            const file = new File([blob], `selectedImage-${selectedIndex}.png`, { type: 'image/png' });
            const isDefaultImage = localStorage.getItem('isDefaultImage') === 'true';
            if (isDefaultImage) {
                uploadImage(file);
            } else {
                changeImage(file);
            }
        } catch (error) {
            alert('이미지 업로드에 실패했습니다. 잠시 후 시도 해주세요.');
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
                        <Image src={src} alt={`기본사진 ${index + 1}`} width={150} height={150} priority/>
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
