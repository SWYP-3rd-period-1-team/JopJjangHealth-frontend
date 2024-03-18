import React from 'react';
import { HospitalDetail } from '../../types/server/like';
import styles from '../../styles/Like.module.css';

interface LikeListProps {
    hospitalInfo: HospitalDetail[];
    onDeleteHospital: (hospitalId: string) => Promise<void>;
}

const LikeList: React.FC<LikeListProps> = ({ hospitalInfo, onDeleteHospital }) => {
    return (
        <>
            {hospitalInfo?.map(hospital => (
                <div key={hospital.id} className={styles.like_item_container}>
                    <div className={styles.title}>
                        {hospital.name}
                    </div>
                    <div className={styles.date}>{hospital.bookmarkDate} 찜</div>
                    <div className={styles.title}>
                        <span className={styles.place}>{hospital.address}</span>
                        {'  '} | {'  '}
                        <span className={styles.district}>{hospital.distance} 떨어져 있습니다.</span>
                    </div>
                    <div className={styles.delete}
                         onClick={() => onDeleteHospital(hospital.id)}>삭제
                    </div>
                </div>
            ))}
        </>
    );
};

export default LikeList;
