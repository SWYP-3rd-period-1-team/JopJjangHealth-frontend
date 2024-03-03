import React, {useState} from 'react';
import styles from './Calendar.module.css';

type OptionType = {
    value: number;
    label: string;
};

const timeOptions: OptionType[] = Array.from({length: 24}, (_, index) => ({
    value: index,
    label: index.toString().padStart(2, '0') + ':00', // Format the label as 'HH:00'
}));

const AddSleepTime: React.FC = () => {
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(7);
    
    const calculateDuration = (start: number, end: number) => {
        let duration = end - start;
        if (duration < 0) {
            duration += 24; // Adjust for the next day
        }
        return duration;
    };
    
    const handleStartChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStartTime = parseInt(event.target.value, 10);
        setStartTime(newStartTime);
    };
    
    const handleEndChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newEndTime = parseInt(event.target.value, 10);
        setEndTime(newEndTime);
    };
    
    const duration = calculateDuration(startTime, endTime);
    
    const handleSubmit = () => {
        alert(`제출되었습니다:`);
    };
    
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>수면 시간 추가하기</h2>
                <div className={styles.dropdowns}>
                    수면시간
                    <select
                        className={styles.dropdown}
                        value={startTime}
                        onChange={handleStartChange}
                    >
                        {timeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    ~
                    <select
                        className={styles.dropdown}
                        value={endTime}
                        onChange={handleEndChange}
                    >
                        {timeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <br />
                <div>하루에 {duration} 시간씩 수면을 취하고 있어요</div>
                <button className={styles.submitButton} onClick={handleSubmit}>전송하기</button>
            </div>
        </div>
    );
};

export default AddSleepTime;
