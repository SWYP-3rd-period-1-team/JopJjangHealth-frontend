import React, {useEffect, useState} from 'react';
import styles from '../../styles/MySurveyList.module.css';
import Image from 'next/image';
import calendarIcon from '../../../public/assets/icon/ic_calendar.png';

const CalendarPopup = ({onClose}: {onClose: () => void}) => (
    <div className={styles.popupContainer} onClick={onClose}>
        <span className={styles.popupText}>질병 캘린더에 연동 되었습니다.</span>
        <span
            className={styles.popupClick}
            onClick={() => {
                alert('질병 캘린더로 이동합니다.');
            }}
        >
            질병 캘린더로 이동하기
        </span>
    </div>
);

const MySurveyList = () => {
    const [diseaseList, setDiseaseList] = useState([
        {
            id: 1,
            date: '2024. 02. 21',
            diseasePath:
                '눈 > 눈의 통증 > 눈물이 나거나 건조함 > 안구건조증, 안과',
            isLinked: false,
        },
        {
            id: 2,
            date: '2024. 02. 21',
            diseasePath:
                '눈 > 눈의 통증 > 눈물이 나거나 건조함 > 안구건조증, 안과',
            isLinked: false,
        },
        {
            id: 3,
            date: '2024. 02. 21',
            diseasePath:
                '눈 > 눈의 통증 > 눈물이 나거나 건조함 > 안구건조증, 안과',
            isLinked: false,
        },
    ]);
    const [selectedDiseases, setSelectedDiseases] = useState<number[]>([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [activeDiseaseId, setActiveDiseaseId] = useState<number | null>(null);

    const handleCheckboxChange = (diseaseId: number) => {
        setSelectedDiseases(prevSelected =>
            prevSelected.includes(diseaseId)
                ? prevSelected.filter(id => id !== diseaseId)
                : [...prevSelected, diseaseId],
        );
    };

    const handleListClick = () => {
        setIsSelectionMode(!isSelectionMode);
    };

    const handleDeleteSelected = () => {
        setDiseaseList(
            diseaseList.filter(
                disease => !selectedDiseases.includes(disease.id),
            ),
        );
        setSelectedDiseases([]);
        setIsSelectionMode(false);
    };

    const toggleCalendarLink = (diseaseId: number) => {
        setDiseaseList(
            diseaseList.map(disease =>
                disease.id === diseaseId
                    ? {...disease, isLinked: !disease.isLinked}
                    : disease,
            ),
        );

        if (!diseaseList.find(disease => disease.id === diseaseId)?.isLinked) {
            setActiveDiseaseId(diseaseId);
            setShowPopup(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setActiveDiseaseId(null);
    };

    const [clickedId, setClickedId] = useState<number | null>(null);

    const handleItemClick = (diseaseId: number) => {
        toggleCalendarLink(diseaseId);
        setClickedId(diseaseId);
    };

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
                setActiveDiseaseId(null);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [showPopup, activeDiseaseId]);

    useEffect(() => {
        if (clickedId !== null) {
            const timer = setTimeout(() => {
                setClickedId(null);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [clickedId]);

    return (
        <>
            <div className={styles.like_text}>나의 질병 리스트</div>
            <div onClick={handleListClick} className={styles.like_check_text}>
                <input
                    type="checkbox"
                    className={styles.like_check_img}
                    onClick={handleListClick}
                />
                질병 리스트 선택
            </div>
            <div className={styles.like_container}>
                {diseaseList.map(disease => (
                    <div key={disease.id} className={styles.like_item_wrapper}>
                        {isSelectionMode && (
                            <input
                                type="checkbox"
                                className={styles.check_survey}
                                checked={selectedDiseases.includes(disease.id)}
                                onChange={() =>
                                    handleCheckboxChange(disease.id)
                                }
                            />
                        )}
                        <div
                            onClick={() => handleItemClick(disease.id)}
                            className={`${
                                isSelectionMode
                                    ? styles.like_item_container_delete
                                    : styles.like_item_container
                            } ${
                                clickedId === disease.id
                                    ? styles.clickedItem
                                    : ''
                            }`}
                        >
                            <div
                                className={`${styles.title} ${
                                    clickedId === disease.id
                                        ? styles.clickedItem
                                        : ''
                                }`}
                            >
                                직짱인12345님이 {disease.date}에 한 건강
                                설문입니다.
                            </div>
                            <div
                                className={`${styles.date} ${
                                    clickedId === disease.id
                                        ? styles.clickedItem
                                        : ''
                                }`}
                            >
                                <Image src={calendarIcon} alt={'calendar'} />
                                {disease.isLinked
                                    ? '질병 캘린더에 연동됨'
                                    : '질병 캘린더 연동중'}
                            </div>
                            <div
                                className={`${styles.title} ${
                                    clickedId === disease.id
                                        ? styles.clickedItem
                                        : ''
                                }`}
                            >
                                <span
                                    className={`${styles.place} ${
                                        clickedId === disease.id
                                            ? styles.clickedItem
                                            : ''
                                    }`}
                                >
                                    {disease.diseasePath}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                {isSelectionMode && (
                    <button
                        className={styles.chice_delete}
                        onClick={handleDeleteSelected}
                    >
                        선택한 질병 리스트 삭제
                    </button>
                )}
            </div>
            {showPopup && activeDiseaseId && (
                <CalendarPopup onClose={closePopup} />
            )}
        </>
    );
};

export default MySurveyList;
