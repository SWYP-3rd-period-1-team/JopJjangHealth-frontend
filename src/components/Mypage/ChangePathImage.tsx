import React, { useState } from 'react';
import styles from '../../styles/UserProfile.module.css';
import Image from 'next/image';

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
                {previewUrl && <Image src={previewUrl} alt="Preview" className={styles.imagePreview} />}
            </div>
            <button type="submit" className={styles.checkButton}>
                확인
            </button>
        </>
    );
};

export default ChangePathImage;
