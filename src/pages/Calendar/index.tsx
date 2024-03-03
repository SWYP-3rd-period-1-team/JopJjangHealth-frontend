import React, {useEffect, useState} from 'react';
import styles from '../../styles/Calendar.module.css';
import Layout from '../../components/Layout';
import AddSupplements from '../../components/CalendarOption/AddSupplements';
import AddWaterIntake from '../../components/CalendarOption/AddWaterIntake';
import AddSleepTime from '../../components/CalendarOption/AddSleepTime';

type CalendarProps = {
    year: number;
    month: number;
};

const Calendar: React.FC<CalendarProps> = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentModal, setCurrentModal] = useState<React.ReactNode>(null); // 모달 상태
    
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
    };
    
    return (
        <Layout>
            <div className={styles.calendarContainer}>
                <header className={styles.header}>
                    <button onClick={handlePrevMonth}> {'<'} </button>
                    <span className={styles.monthDisplay}>
          {`${currentDate.getFullYear()}. ${currentDate.getMonth() + 1}`}
        </span>
                    <button onClick={handleNextMonth}> {'>'} </button>
                </header>
                <div className={styles.grid}>
                    {daysOfWeek.map((day) => (
                        <div key={day} className={styles.weekday}>
                            {day}
                        </div>
                    ))}
                    {days}
                </div>
            </div>
            <div>질병캘린더리스트</div>
            <button>리스트 모아보기</button>
            <div className={styles.listContainer}>
                <div>기본 캘린더</div>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={styles.listItem}
                        onClick={() => handleItemClick(item.value)}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
            {currentModal && (
                <div className={styles.modalContainer} onClick={handleCloseModal}>
                    {currentModal}
                    <button onClick={handleCloseModal}>모달 닫기</button>
                </div>
            )}
        </Layout>
    );
};

export default Calendar;
