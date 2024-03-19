import React, {useState} from 'react';
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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Like = () => {
    useAuthRedirect();
    const { hospitalInfo, setHospitalInfo, isLoading, isHospitalDetailsLoaded, isHospitalInfoLoaded } = useHospitalInfo();
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    
    const showSnackbar = (message:string) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };
    
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    
    
    const handleDeleteHospital = async (hospitalId: string) => {
        const response = await fetchHospitalDeleteInfo(hospitalId);
        if (response.success) {
            const updatedHospitalInfo = hospitalInfo.filter(hospital => hospital.id !== hospitalId);
            setHospitalInfo(updatedHospitalInfo);
            showSnackbar('병원이 성공적으로 삭제되었습니다.');
        } else {
            showSnackbar(response.message);
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
            <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Layout>
    );
};

export default Like;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return checkUserAuthentication(context);
};
