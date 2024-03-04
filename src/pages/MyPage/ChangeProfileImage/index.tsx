import React, {useEffect, useState} from 'react';
import styles from '../../../styles/Find.module.css';
import ChangeBasicImage from '../../../components/MyPage/ChangeBasicImage';
import ChangePathImage from '../../../components/MyPage/ChangePathImage';
import {checkUserAuthentication} from '../../../utils/auth';
import {GetServerSideProps} from 'next';
import useAuth from '../../../hooks/useAuth';

const TabComponent:React.FC = () => {
    useAuth();
    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTab = localStorage.getItem('activeTab');
            setActiveTab(storedTab ?? '');
        }
    }, []);

    return (
        <div className={styles.findContainer}>
            <div className={styles.tabs}>
                <div
                    className={`${styles.tabButton} ${
                        activeTab === 'ChangeBasicImage' ? styles.activeTab : ''
                    }`}
                    onClick={() => setActiveTab('ChangeBasicImage')}
                >
                    기본 사진
                </div>
                <div
                    className={`${styles.tabButton} ${
                        activeTab === 'ChangePathImage' ? styles.activeTab : ''
                    }`}
                    onClick={() => setActiveTab('ChangePathImage')}
                >
                    갤러리에서 불러오기
                </div>
            </div>
            <div>
                {activeTab === 'ChangeBasicImage' && <ChangeBasicImage />}
                {activeTab === 'ChangePathImage' && <ChangePathImage />}
            </div>
        </div>
    );
};

export default TabComponent;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return checkUserAuthentication(context);
};
