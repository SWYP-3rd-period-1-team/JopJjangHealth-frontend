// todo : 질병 캘린더 자동 부분 잠시 주석 : 사유 (아직 진행 안함)
import React, {useEffect, useState} from 'react';
import Layout from '../../../components/common/Layout';
import NoSurveyList from '../../../components/MyPage/NoSurveyList';
import styles from '../../../styles/MySurveyList.module.css';
// import Image from 'next/image';
//import calendarIcon from '../../../../public/assets/icon/ic_calendar.png';
import {fetchDiseaseList, fetchDiseaseListDelete} from '../../../api/MyPage';
import {checkUserAuthentication} from '../../../api/auth';
import {GetServerSideProps} from 'next';
import useAuth from '../../../hooks/useAuth';
import LoadingView from '../../../components/common/LoadingView';
import { useRecoilState } from 'recoil';
import {
    selectedDiseasesState,
    isSelectionModeState,
    activeDiseaseIdState,
    diseaseListState
} from '../../../state/surveyList';
import {DeleteDiseaseResponse, DiseaseItem, DiseaseListResponse, SurveyIdType} from '../../../types/server/surveyList';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

// const CalendarPopup = ({onClose}: {onClose: () => void}) => (
//     <div className={styles.popupContainer} onClick={onClose}>
//         <span className={styles.popupText}>질병 캘린더에 연동 되었습니다.</span>
//         <span
//             className={styles.popupClick}
//             onClick={() => alert('질병 캘린더로 이동합니다.')}
//         >
//             질병 캘린더로 이동하기
//         </span>
//     </div>
// );

const SurveyList = () => {
    useAuth();
    const queryClient = useQueryClient();
    const [diseaseList, setDiseaseList] = useRecoilState(diseaseListState);
    const [selectedDiseases, setSelectedDiseases] = useRecoilState(selectedDiseasesState);
    const [isSelectionMode, setIsSelectionMode] = useRecoilState(isSelectionModeState);
    const [activeDiseaseId, setActiveDiseaseId] = useRecoilState(activeDiseaseIdState);
    // const [showPopup, setShowPopup] = useState(false);
    
    // @ts-ignore
    const { data: queriedDiseaseList, isLoading, isError, error } = useQuery<DiseaseListResponse, Error>({
        queryKey: ['diseaseList'],
        queryFn: fetchDiseaseList,
        select: (response): DiseaseItem[] => response.data.data.map(item => ({
            ...item,
            dateTime: item.dateTime.split('T')[0],
        })),
    });
    
    useEffect(() => {
        if (queriedDiseaseList) {
            // @ts-ignore
            setDiseaseList(queriedDiseaseList);
        }
    }, [queriedDiseaseList, setDiseaseList]);
    
    const deleteDiseaseMutation = useMutation<DeleteDiseaseResponse, Error, SurveyIdType>({
        mutationFn: fetchDiseaseListDelete,
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(['diseaseList']);
            setSelectedDiseases([]);
            setIsSelectionMode(false);
        },
    });
    
    const handleListClick = () => {
        setIsSelectionMode(!isSelectionMode);
    };
    
    const handleDeleteSelected = async () => {
        await Promise.all(selectedDiseases.map((surveyId) => deleteDiseaseMutation.mutateAsync(Number(surveyId))));
    };
    
    // const toggleCalendarLink = (diseaseId: string) => {
    //     setDiseaseList(diseaseList.map(disease => disease?.surveyId === diseaseId ? {
    //         ...disease,
    //         isLinked: !disease.isLinked,
    //     } : disease));
    //     const disease = diseaseList.find(disease => disease?.surveyId === diseaseId);
    //     if (disease && !disease.isLinked) {
    //         setActiveDiseaseId(diseaseId);
    //         setShowPopup(true);
    //     }
    // };
    
    const handleCheckboxChange = (diseaseId: string) => {
        setSelectedDiseases(prevSelected => prevSelected.includes(diseaseId) ? prevSelected.filter(id => id !== diseaseId) : [...prevSelected, diseaseId]);
    };
    
    const handleItemClick = (diseaseId: string) => {
        // toggleCalendarLink(diseaseId);
        setActiveDiseaseId(diseaseId);
    };
    
    // const closePopup = () => {
    //     setShowPopup(false);
    //     setActiveDiseaseId(null);
    // };
    
    // useEffect(() => {
    //     if (showPopup) {
    //         const timer = setTimeout(() => {
    //             setShowPopup(false);
    //             setActiveDiseaseId(null);
    //         }, 3000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [showPopup]);
    
    return (
        <Layout>
            <div className={styles.mySurvey_text}>나의 질병 리스트</div>
            <div onClick={handleListClick} className={styles.mySurvey_check_text}>
                <input
                    type="checkbox"
                    className={styles.mySurvey_check_img}
                    onClick={handleListClick}
                    readOnly
                />
                질병 리스트 선택
            </div>
            {isLoading ? <LoadingView />
                :
                <>
                    {diseaseList.length > 0 ? (
                        <>
                            <div className={styles.mySurvey_container}>
                                {diseaseList.map(disease => (
                                    <div key={disease?.surveyId} className={styles.mySurvey_item_wrapper}>
                                        {isSelectionMode && (
                                            <input
                                                type="checkbox"
                                                className={styles.check_survey}
                                                checked={selectedDiseases.includes(disease?.surveyId)}
                                                onChange={() => handleCheckboxChange(disease?.surveyId)}
                                            />
                                        )}
                                        <div
                                            onClick={() => handleItemClick(disease?.surveyId)}
                                            className={`${isSelectionMode ? styles.mySurvey_item_container_delete : styles.mySurvey_item_container} ${activeDiseaseId === disease?.surveyId ? styles.clickedItem : ''}`}
                                        >
                                            <div
                                                className={`${styles.title} ${activeDiseaseId === disease?.surveyId ? styles.clickedItem : ''}`}>
                                                {disease?.nickname}님이 {disease?.dateTime}에 한 건강 설문입니다.
                                            </div>
                                            {/*<div*/}
                                            {/*    className={`${styles.date} ${activeDiseaseId === disease?.surveyId ? styles.clickedItem : ''}`}>*/}
                                            {/*    <Image src={calendarIcon} alt={'calendar'} />*/}
                                            {/*    {disease?.isLinked ? '질병 캘린더에 연동됨' : '질병 캘린더 연동중'}*/}
                                            {/*</div>*/}
                                            <div
                                                className={`${styles.title} ${activeDiseaseId === disease?.surveyId ? styles.clickedItem : ''}`}>
                                        <span
                                            className={`${styles.place} ${activeDiseaseId === disease?.surveyId ? styles.clickedItem : ''}`}>
                                            {disease?.targetBody}{' > '}
                                            {disease?.diagnosisPart}{' > '}
                                            {disease?.presentedSymptom}{' > '}
                                            {disease?.disease}{' > '}
                                            {disease?.department}
                                        </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {
                                    isSelectionMode && (
                                        <button className={styles.chice_delete} onClick={handleDeleteSelected}>
                                            선택한 질병 리스트 삭제
                                        </button>
                                    )
                                }
                            </div>
                            {/*{showPopup && <CalendarPopup onClose={closePopup} />}*/}
                        </>
                    ) : (
                        <NoSurveyList />
                    )}
                </>
            }
        
        </Layout>
    );
};

export default SurveyList;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return checkUserAuthentication(context);
};
