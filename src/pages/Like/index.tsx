import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Like.module.css';
import Link from 'next/link';
import noLikeImage from '../../../public/favicon4.png';
import Image from 'next/image';
import {fetchHospitalInfo} from '../../api/like';
import {checkUserAuthentication} from '../../utils/auth';
import {GetServerSideProps} from 'next';
import useAuth from '../../hooks/useAuth';

const Like = () => {
    useAuth();
    const [hospitalInfo, setHospitalInfo] = useState(
        [{id: '', name: '', date: '', address: '', distance: ''},
        ]);
    
    useEffect(() => {
        const initializeHospitalInfo = async () => {
            try {
                const response = await fetchHospitalInfo();
                setHospitalInfo(response?.data);
            } catch (error) {
                // Handle error appropriately
                console.error('Failed to fetch disease list:', error);
            }
        };
        initializeHospitalInfo();
    }, []);
    
    return (
        <Layout>
            <div className={styles.like_text}><b>직짱인 님</b>의 <b>찜한</b> 병원 리스트</div>
            <div className={styles.like_container}>
                {hospitalInfo?.length > 0 ?
                    <>
                        {hospitalInfo.map(hospital => (
                            <div key={hospital.id} className={styles.like_item_container}>
                                <div className={styles.title}>
                                    {hospital.name}
                                </div>
                                <div className={styles.date}>{hospital.date} 찜</div>
                                <div className={styles.title}>
                                    <span className={styles.place}>{hospital.address}</span>
                                    {' '}|{' '}
                                    <span className={styles.district}>{hospital.distance} 떨어져 있습니다.</span>
                                </div>
                                
                                <div className={styles.delete}>삭제</div>
                            </div>
                        ))}
                    </>
                    :
                    <div className={styles.no_hospitals}>
                        <div className={styles.no_like}>찜한 병원이 없네요!</div>
                        <div className={styles.no_like_text}><b>건강 설문</b>을 통해 <b>병원을 추천</b>받아볼까요?</div>
                        <Link href={'/'}>
                            <button className={styles.click_survey}>건강 설문하러 가기</button>
                        </Link>
                        <div className={styles.imageContainer}> {/* 이미지를 오른쪽으로 정렬하기 위한 새로운 div */}
                            <Image src={noLikeImage} alt="no_like" width={223} height={156} />
                        </div>
                    </div>
                }
            
            
            </div>
        </Layout>
    );
};

export default Like;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return checkUserAuthentication(context);
};
