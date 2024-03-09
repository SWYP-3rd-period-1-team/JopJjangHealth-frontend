import React, {useEffect, useState} from 'react';
import styles from '../../styles/Calendar.module.css';
import Layout from '../../components/Layout';
import AddSupplements from '../../components/CalendarOption/AddSupplements';
import AddWaterIntake from '../../components/CalendarOption/AddWaterIntake';
import AddSleepTime from '../../components/CalendarOption/AddSleepTime';
import Image from 'next/image';

type CalendarProps = {
    year: number;
    month: number;
};

const Calendar: React.FC<CalendarProps> = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentModal, setCurrentModal] = useState<React.ReactNode>(null); // 모달 상태
    const [isVisible, setIsVisible] = useState<boolean>(false); // 새로운 상태 추가: 항목의 표시 여부

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const getMonthData = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];

        // 이전 달의 날짜
        const prevMonthLastDate = new Date(year, month, 0).getDate();
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push(
                <div key={`prev-${i}`} className={styles.day_notActive}>
                    {prevMonthLastDate - i}
                </div>,
            );
        }

        // 이번 달의 날짜
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(
                <div key={`current-${i}`} className={styles.day}>
                    {i}
                </div>,
            );
        }

        // 다음 달의 날짜
        const remainingDays = 7 - (days.length % 7);
        if (remainingDays !== 7) {
            for (let i = 1; i <= remainingDays; i++) {
                days.push(
                    <div key={`next-${i}`} className={styles.day_notActive}>
                        {i}
                    </div>,
                );
            }
        }

        return days;
    };

    const monthData = getMonthData(currentDate);

    const handlePrevMonth = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };

    const items = [
        {label: '+ 영양제 추가하기', value: 'addSupplement'},
        {label: '+ 물섭취 추가하기', value: 'addWaterIntake'},
        {label: '+ 수면시간 추가하기', value: 'addSleepTime'},
        {label: '+ 일정 수정하기', value: 'editSchedule'},
    ];

    const handleItemClick = (value: string) => {
        // setIsVisible(!isVisible); // 항목 클릭 시 표시 상태 토글
        switch (value) {
            case 'addSupplement':
                setCurrentModal(<AddSupplements onClose={handleCloseModal} />);
                break;
            case 'addWaterIntake':
                setCurrentModal(<AddWaterIntake onClose={handleCloseModal} />);
                break;
            case 'addSleepTime':
                setCurrentModal(<AddSleepTime onClose={handleCloseModal} />);
                break;
            default:
                setCurrentModal(null);
        }
    };

    const handleCloseModal = () => {
        setCurrentModal(null);
        // setIsVisible(false); // 모달 닫을 때 표시 상태도 변경
    };

    return (
        <Layout>
            <div className={styles.calendarContainer}>
                <header className={styles.header}>
                    <button
                        className={styles.header_arrow_button}
                        onClick={handlePrevMonth}
                    >
                        <Image
                            src={'/assets/icon/ic_before_gray.png'}
                            width={16}
                            height={16}
                            alt={'back_button'}
                        />
                    </button>
                    <span className={styles.monthDisplay}>
                        {`${currentDate.getFullYear()}. ${
                            currentDate.getMonth() + 1
                        }`}
                    </span>
                    <button
                        className={styles.header_arrow_button_right}
                        onClick={handleNextMonth}
                    >
                        <Image
                            src={'/assets/icon/ic_before_gray.png'}
                            width={16}
                            height={16}
                            alt={'back_button'}
                        />
                    </button>
                </header>
                <div className={styles.grid}>
                    {daysOfWeek.map(day => (
                        <div key={day} className={styles.weekday}>
                            {day}
                        </div>
                    ))}
                    {monthData}
                </div>
            </div>
            <div className={styles.listTitleContainer}>
                <div className={styles.listText}>질병캘린더 리스트</div>
                <button className={styles.listButton}>리스트 모아보기</button>
            </div>
            <br />
            <div className={styles.listContainer}>
                <div className={styles.listItemHeader}>
                    <span>기본 캘린더</span>
                    <span>
                        {isVisible ? (
                            <div
                                onClick={() => setIsVisible(false)}
                                className={styles.listModalButton}
                            >
                                저장
                            </div>
                        ) : (
                            <div
                                onClick={() => setIsVisible(true)}
                                className={styles.listModalButton}
                            >
                                추가 및 편집
                            </div>
                        )}
                    </span>
                </div>
                {isVisible &&
                    items.map(
                        (
                            item,
                            index, // isVisible 상태에 따라 항목 표시
                        ) => (
                            <div
                                key={index}
                                className={styles.listItem}
                                onClick={() => handleItemClick(item.value)}
                            >
                                {item.label}
                            </div>
                        ),
                    )}
            </div>
            {currentModal && (
                <div className={styles.modalContainer}>{currentModal}</div>
            )}
        </Layout>
    );
};

export default Calendar;
