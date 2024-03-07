import React, { useState } from 'react';
import styles from '../../styles/UserProfile.module.css';
import Image from 'next/image';
import { uploadProfileImage } from '../../api/mypage';
import defaultProfileImage from '../../../public/assets/myPage/Default.png';

const ChangeProfileImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(defaultProfileImage);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file: File = event.target.files[0];
            // todo : file의 타입을 지정 해줘
            setSelectedFile(file as any);
            
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                // todo : result의 타입을 지정 해줘
                setPreviewUrl(result as any);
            };
            reader.readAsDataURL(file);
        }
    };
    
    
    const handleSubmit = async () => {
        if (!selectedFile) {
            alert('파일을 선택해주세요.');
            return;
        }
        
        try {
            await uploadProfileImage(selectedFile);
            alert('파일 업로드 성공!');
        } catch (error) {
            console.error('업로드 실패:', error);
            alert('파일 업로드 실패.');
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
