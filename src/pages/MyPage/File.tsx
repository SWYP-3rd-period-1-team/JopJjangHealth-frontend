// FileUploadButton.tsx
import React, { useState } from 'react';
import styles from './File.module.css';

const FileUploadButton = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            
            // FileReader를 사용하여 이미지 미리보기 생성
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <div>
            <input
                className={styles.fileInput}
                type="file"
                onChange={handleFileChange}
                accept=".png,.jpg,.jpeg,.gif" // PNG, JPG, GIF 파일만 허용
            />
            {selectedFile && <div className={styles.fileName}>{selectedFile.name}</div>}
            {previewUrl && <img src={previewUrl} alt="Preview" className={styles.imagePreview} />}
        </div>
    );
};

export default FileUploadButton;
