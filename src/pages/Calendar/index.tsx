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

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className={styles.day} />);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(
            <div key={i} className={styles.day}>
                {i}
            </div>,
        );
    }

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1));
    };

    const items = [
        {label: '+ 영양제 추가하기', value: 'addSupplement'},
        {label: '+ 물섭취 추가하기', value: 'addWaterIntake'},
        {label: '+ 수면시간 추가하기', value: 'addSleepTime'},
        {label: '+ 일정 수정하기', value: 'editSchedule'},
    ];

    const handleItemClick = (value: string) => {
        setIsVisible(!isVisible); // 항목 클릭 시 표시 상태 토글
        switch (value) {
            case 'addSupplement':
                setCurrentModal(<AddSupplements />);
                break;
            case 'addWaterIntake':
                setCurrentModal(<AddWaterIntake />);
                break;
            case 'addSleepTime':
                setCurrentModal(<AddSleepTime />);
                break;
            default:
                setCurrentModal(null);
        }
    };

    const handleCloseModal = () => {
        setCurrentModal(null);
        setIsVisible(false); // 모달 닫을 때 표시 상태도 변경
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
                    {days}
                </div>
            </div>
            <div className={styles.listText}>질병캘린더리스트</div>
            <button className={styles.listButton}>리스트 모아보기</button>
            <br />
            <div className={styles.listContainer}>
                <div>
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
                <div
                    className={styles.modalContainer}
                    onClick={handleCloseModal}
                >
                    {currentModal}
                </div>
            )}
        </Layout>
    );
};

export default Calendar;
