import React from 'react';
import { HospitalDetail } from '../../types/server/like';
import styles from '../../styles/Like.module.css';
import {router} from 'next/client';
import {useRouter} from 'next/router';

interface LikeListProps {
    hospitalInfo: HospitalDetail[];
    onDeleteHospital: (hospitalId: string) => Promise<void>;
}

const LikeList: React.FC<LikeListProps> = ({ hospitalInfo, onDeleteHospital }) => {
    const router = useRouter();
    return (
        <>
            {hospitalInfo?.map(hospital => (
                <div key={hospital.id} className={styles.like_item_container}
                onClick={() => {router.push(`/Map/${hospital.id}`)}}>
                    <div className={styles.title}>
                        {hospital.name}
                    </div>
                    <div className={styles.date}>{hospital.bookmarkDate} 찜</div>
                    <div className={styles.title_bottom}>
                        <span className={styles.place}>{hospital.address}</span>
                        {'  '} | {'  '}
                        <span className={styles.district}>{hospital.distance} 떨어져 있습니다.</span>
                    </div>
                    <div className={styles.delete}
                         onClick={(e) => {
                             e.stopPropagation();
                             onDeleteHospital(hospital.id);
                         }}>삭제
                    </div>
                </div>
            ))}
        </>
    );
};

export default LikeList;
