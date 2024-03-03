import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import NoSurveyList from '../../../components/MyPage/NoSurveyList';
import styles from '../../../styles/MySurveyList.module.css';
import Image from 'next/image';
import calendarIcon from '../../../../public/assets/icon/ic_calendar.png';
import { fetchDiseaseList } from '../../../api/mypage';

const CalendarPopup = ({ onClose }: { onClose: () => void }) => (
    <div className={styles.popupContainer} onClick={onClose}>
        <span className={styles.popupText}>질병 캘린더에 연동 되었습니다.</span>
        <span
            className={styles.popupClick}
            onClick={() => alert('질병 캘린더로 이동합니다.')}
        >
            질병 캘린더로 이동하기
        </span>
    </div>
);

const SurveyList = () => {
    const [diseaseList, setDiseaseList] = useState([
        {
            id: '',
            userId: '',
            savedAt: '',
            department: '',
            targetBodyPart: '',
            diagnosisPart: '',
            presentedSymptom: '',
            disease: '',
            isLinked: false,
        },
    ]);
    const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [activeDiseaseId, setActiveDiseaseId] = useState<string | null>(null);
    
    useEffect(() => {
        const initFetch = async () => {
            try {
                const data = await fetchDiseaseList();
                setDiseaseList(Array.isArray(data.data) ? data.data : [data.data]);
            } catch (error) {
                console.error('Failed to fetch disease list:', error);
            }
        };
        initFetch();
    }, []);
    
    const handleListClick = () => {
        setIsSelectionMode(!isSelectionMode);
    };
    
    const handleDeleteSelected = () => {
        setDiseaseList(diseaseList.filter(disease => !selectedDiseases.includes(disease.id)));
        setSelectedDiseases([]);
        setIsSelectionMode(false);
    };
    
    const toggleCalendarLink = (diseaseId: string) => {
        setDiseaseList(diseaseList.map(disease => disease.id === diseaseId ? { ...disease, isLinked: !disease.isLinked } : disease));
        const disease = diseaseList.find(disease => disease.id === diseaseId);
        if (disease && !disease.isLinked) {
            setActiveDiseaseId(diseaseId);
            setShowPopup(true);
        }
    };
    
    const handleCheckboxChange = (diseaseId: string) => {
        setSelectedDiseases(prevSelected => prevSelected.includes(diseaseId) ? prevSelected.filter(id => id !== diseaseId) : [...prevSelected, diseaseId]);
    };
    
    const closePopup = () => {
        setShowPopup(false);
        setActiveDiseaseId(null);
    };
    
    const handleItemClick = (diseaseId: string) => {
        toggleCalendarLink(diseaseId);
        setActiveDiseaseId(diseaseId);
    };
    
    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
                setActiveDiseaseId(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showPopup]);
    
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
            {diseaseList.length > 0 ? (
                <>
                    <div className={styles.mySurvey_container}>
                        {diseaseList.map(disease => (
                            <div key={disease.id} className={styles.mySurvey_item_wrapper}>
                                {isSelectionMode && (
                                    <input
                                        type="checkbox"
                                        className={styles.check_survey}
                                        checked={selectedDiseases.includes(disease.id)}
                                        onChange={() => handleCheckboxChange(disease.id)}
                                    />
                                )}
                                <div
                                    onClick={() => handleItemClick(disease.id)}
                                    className={`${isSelectionMode ? styles.mySurvey_item_container_delete : styles.mySurvey_item_container} ${activeDiseaseId === disease.id ? styles.clickedItem : ''}`}
                                >
                                    <div className={`${styles.title} ${activeDiseaseId === disease.id ? styles.clickedItem : ''}`}>
                                        {disease.userId}님이 {disease.savedAt}에 한 건강 설문입니다.
                                    </div>
                                    <div className={`${styles.date} ${activeDiseaseId === disease.id ? styles.clickedItem : ''}`}>
                                        <Image src={calendarIcon} alt={'calendar'} />
                                        {disease.isLinked ? '질병 캘린더에 연동됨' : '질병 캘린더 연동중'}
                                    </div>
                                    <div className={`${styles.title} ${activeDiseaseId === disease.id ? styles.clickedItem : ''}`}>
                                        <span className={`${styles.place} ${activeDiseaseId === disease.id ? styles.clickedItem : ''}`}>
                                            {disease.targetBodyPart}{' > '}
                                            {disease.diagnosisPart}{' > '}
                                            {disease.presentedSymptom}{' > '}
                                            {disease.disease}{' > '}
                                            {disease.department}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isSelectionMode && (
                            <button className={styles.chice_delete} onClick={handleDeleteSelected}>
                                선택한 질병 리스트 삭제
                            </button>
                        )}
                    </div>
                    {showPopup && <CalendarPopup onClose={closePopup} />}
                </>
            ) : (
                <NoSurveyList />
            )}
        </Layout>
    );
};

export default SurveyList;
