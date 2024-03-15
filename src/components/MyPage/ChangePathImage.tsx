import React from 'react';
import styles from '../../styles/UserProfile.module.css';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { changeProfileImageSelectedFile, changeProfileImagePreviewUrl } from '../../state/mypage';
import { useUploadProfileImage, useChangeUserProfileImage } from '../../hooks/react-query/useProfileImage';

const ChangeProfileImage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useRecoilState(changeProfileImageSelectedFile);
    const [previewUrl, setPreviewUrl] = useRecoilState(changeProfileImagePreviewUrl);
    const { mutate: uploadImage } = useUploadProfileImage();
    const { mutate: changeImage } = useChangeUserProfileImage();
    
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
                uploadImage(selectedFile);
            } else {
                changeImage(selectedFile);
            }
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
                    <Image src={previewUrl || '/path/to/default/image'}
                           alt="미리보기"
                           width={298}
                           height={298}
                           className={styles.profileImage}
                           objectFit="scale-down"
                    />
                </div>
                <button type="button" style={{marginTop:"100px"}} className={styles.checkButton} onClick={handleSubmit}>
                    확인
                </button>
            </div>
        </div>
    );
};

export default ChangeProfileImage;
