import React, { useState } from 'react';
import styles from '../../styles/UserProfile.module.css';
import Image from 'next/image';
import {uploadProfileImage} from '../../api/mypage';

const ChangePathImage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = async () => {
        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }
        
        try {
            const response = await uploadProfileImage(selectedFile);
            console.log(response.data);
            alert('File upload successful!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('File upload failed.');
        }
    };
    
    return (
        <>
            <div className={styles.images_container_second}>
                <input
                    className={styles.fileInput}
                    type="file"
                    onChange={handleFileChange}
                    accept=".png,.jpg,.jpeg,.gif"
                />
                {selectedFile && <div className={styles.fileName}>{selectedFile.name}</div>}
                {previewUrl && (
                    <Image src={previewUrl} alt="Preview" width={500} height={500} className={styles.imagePreview} />
                )}
            </div>
            <button type="button" className={styles.checkButton} onClick={handleSubmit}>
                확인
            </button>
        </>
    );
};

export default ChangePathImage;
