import React, { useState } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Like.module.css';
import Image from 'next/image';
import calendarIcon from '../../../public/assets/icon/ic_calendar.png';

// 팝업 컴포넌트
const CalendarPopup = ({ onClose }) => (
    <div className={styles.popupContainer}>
        <div>질병 캘린더에 연동 되었습니다.</div>
        <button onClick={onClose}>닫기</button>
        <button onClick={() => { alert('질병 캘린더로 이동합니다.'); }}>
            질병 캘린더로 이동하기
        </button>
    </div>
);

const Like = () => {
    const [diseaseList, setDiseaseList] = useState([
        { id: 1, date: '2024. 02. 21', diseasePath: '눈 > 눈의 통증 > 눈물이 나거나 건조함 > 안구건조증, 안과', isLinked: false },
        { id: 2, date: '2024. 02. 21', diseasePath: '눈 > 눈의 통증 > 눈물이 나거나 건조함 > 안구건조증, 안과', isLinked: false },
        { id: 3, date: '2024. 02. 21', diseasePath: '눈 > 눈의 통증 > 눈물이 나거나 건조함 > 안구건조증, 안과', isLinked: false }
    ]);
    const [selectedDiseases, setSelectedDiseases] = useState([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [activeDiseaseId, setActiveDiseaseId] = useState(null);
    
    const handleCheckboxChange = (diseaseId) => {
        setSelectedDiseases(prevSelected =>
            prevSelected.includes(diseaseId)
                ? prevSelected.filter(id => id !== diseaseId)
                : [...prevSelected, diseaseId]
        );
    };
    
    const handleListClick = () => {
        setIsSelectionMode(!isSelectionMode);
    };
    
    const handleDeleteSelected = () => {
        setDiseaseList(diseaseList.filter(disease => !selectedDiseases.includes(disease.id)));
        setSelectedDiseases([]);
        setIsSelectionMode(false);
    };
    
    const toggleCalendarLink = (diseaseId) => {
        setDiseaseList(diseaseList.map(disease =>
            disease.id === diseaseId ? { ...disease, isLinked: !disease.isLinked } : disease
        ));
        
        if (!diseaseList.find(disease => disease.id === diseaseId).isLinked) {
            setActiveDiseaseId(diseaseId);
            setShowPopup(true);
        }
    };
    
    const closePopup = () => {
        setShowPopup(false);
        setActiveDiseaseId(null);
    };
    
    const [clickedId, setClickedId] = useState(null);

// 항목 클릭 핸들러 함수
    const handleItemClick = (diseaseId) => {
        // 연동 상태를 토글하고 클릭 상태를 설정
        toggleCalendarLink(diseaseId); // 기존 함수를 호출하여 연동 상태를 업데이트
        setClickedId(diseaseId); // 클릭된 항목의 id를 상태에 저장
    };
    
    return (
        <Layout>
            <div className={styles.like_text}>나의 질병 리스트</div>
            <div onClick={handleListClick} className={styles.like_text}>질병 리스트 선택</div>
            <div className={styles.like_container}>
                {diseaseList.map(disease => (
                    <div key={disease.id}
                         onClick={() => handleItemClick(disease.id)}
                         className={`${styles.like_item_container} ${clickedId === disease.id ? styles.clickedItem : ''}`}>
                        {isSelectionMode && (
                            <input
                                type="checkbox"
                                checked={selectedDiseases.includes(disease.id)}
                                onChange={() => handleCheckboxChange(disease.id)}
                            />
                        )}
                        <div className={styles.title}>
                            직짱인12345님이 {disease.date}에 한 건강 설문입니다.
                        </div>
                        <div className={styles.date}>
                            <Image src={calendarIcon} alt={'calendar'} />
                            {disease.isLinked ? '질병 캘린더에 연동됨' : '질병 캘린더 연동중'}
                        </div>
                        <div className={styles.title}>
                            <span className={styles.place}>{disease.diseasePath}</span>
                        </div>
                    </div>
                ))}
                {isSelectionMode && (
                    <button onClick={handleDeleteSelected}>선택한 질병 리스트 삭제</button>
                )}
            </div>
            {showPopup && activeDiseaseId && (
                <CalendarPopup onClose={closePopup} />
            )}
        </Layout>
    );
};

export default Like;
