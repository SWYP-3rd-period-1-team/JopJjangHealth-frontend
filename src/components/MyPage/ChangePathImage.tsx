import React, { useState } from 'react';
import styles from '../../styles/UserProfile.module.css';
import Image from 'next/image';
import {changeUserProfileImage, uploadProfileImage} from '../../api/mypage';
import defaultProfileImage from '../../../public/assets/myPage/Default.png';

const ChangeProfileImage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [selectedFile, setSelectedFile] = useState<File|null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(defaultProfileImage.src);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file: File = event.target.files[0];
            setSelectedFile(file);
            
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setPreviewUrl(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    
    
    const handleSubmit = async () => {
        if (!selectedFile) {
            alert('이미지를 선택해주세요.');
            return;
        }
        
        const isDefaultImage = localStorage.getItem('isDefaultImage') === 'true';
        
        try {
            if (isDefaultImage) {
                await uploadProfileImage(selectedFile);
            } else {
                await changeUserProfileImage(selectedFile);
            }
            alert('이미지 업로드에 성공했습니다.')
            localStorage.clear();
            window.close();
        } catch (error) {
            alert('이미지 업로드에 실패했습니다.');
        }
    };
    
    return (
        <div>
            <div className={styles.images_container_second}>
                <input
                    className={styles.fileInput}
                    type="file"
                    onChange={handleFileChange}
                    accept=".png,.jpg,.jpeg,.gif"
                />
                <div className={styles.imagePreviewContainer}>
                    <Image src={previewUrl} alt="미리보기" width={298} height={298} className={styles.profileImage} />
                </div>
                <button type="button" style={{marginTop:"100px"}} className={styles.checkButton} onClick={handleSubmit}>
                    확인
                </button>
            </div>
        </div>
    );
};

export default ChangeProfileImage;
