import React from 'react';
import Layout from '../../components/common/Layout';
import styles from '../../styles/Like.module.css';
import Image from 'next/image';
import {checkUserAuthentication} from '../../api/auth';
import {GetServerSideProps} from 'next';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import LoadingView from '../../components/common/LoadingView';
import likeLeft from '../../../public/assets/like/likeLeft.png';
import likeRight from '../../../public/assets/like/likeRight.png';
import NoLike from '../../components/Like/NoLike';
import LikeList from '../../components/Like/LikeList';
import useHospitalInfo from '../../hooks/react-query/useLikeHospitalInfo';
import { fetchHospitalDeleteInfo } from '../../api/Like';

const Like = () => {
    useAuthRedirect();
    const { hospitalInfo, setHospitalInfo, isLoading, isHospitalDetailsLoaded, isHospitalInfoLoaded } = useHospitalInfo();
    
    const handleDeleteHospital = async (hospitalId: string) => {
        const response = await fetchHospitalDeleteInfo(hospitalId);
        if (response.success) {
            const updatedHospitalInfo = hospitalInfo.filter(hospital => hospital.id !== hospitalId);
            setHospitalInfo(updatedHospitalInfo);
        } else {
            alert(response.message);
        }
    };
    const isStillLoading = isLoading || !isHospitalInfoLoaded || !isHospitalDetailsLoaded;
    
    return (
        <Layout>
            <div className={styles.like_container}>
                <div className={styles.like_text}>
                    <Image src={likeLeft} alt={'likeLeft'} />
                    <b>직짱인 님</b>의 <b>찜한</b> 병원 리스트
                    <Image src={likeRight} alt={'likeRight'} />
                </div>
                <div className={styles.like_list_template}>
                    {isStillLoading ?
                        <LoadingView />
                        : hospitalInfo?.length > 0 ?
                            <LikeList hospitalInfo={hospitalInfo} onDeleteHospital={handleDeleteHospital} />
                            : <NoLike />
                    }
                </div>
            </div>
        </Layout>
    );
};

export default Like;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return checkUserAuthentication(context);
};
