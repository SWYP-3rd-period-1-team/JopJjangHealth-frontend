import React, {useState} from 'react';
import styles from '../../styles/CalendarModal.module.css';

const AddSupplements: React.FC = () => {
    const [supplementName, setSupplementName] = useState('');
    const [pillCount, setPillCount] = useState('');
    const [timesPerDay, setTimesPerDay] = useState('1');
    
    const formatNumberWithCommas = (value: string) => {
        const number = parseInt(value.replace(/,/g, ''), 10);
        if (isNaN(number)) return '';
        
        return number.toLocaleString();
    };
    
    const handleSupplementNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSupplementName(event.target.value);
    };
    
    const handlePillCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedNumber = formatNumberWithCommas(event.target.value);
        setPillCount(formattedNumber);
    };
    
    const handleTimesPerDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTimesPerDay(event.target.value);
    };
    
    const handleSubmit = () => {
        alert(`제출되었습니다:`);
    };
    
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.inputTitle}>영양제 추가하기</div>
                <div>
                    <div className={styles.inputText}>영양제 이름:</div>
                    <input
                        type="text"
                        value={supplementName}
                        onChange={handleSupplementNameChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.dropdowns}>
                    하루에
                    <select
                        className={styles.dropdown}
                        value={timesPerDay}
                        onChange={handleTimesPerDayChange}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>번
                    <input
                        type="text"
                        value={pillCount}
                        onChange={handlePillCountChange}
                        className={styles.input}
                    />
                    알 섭취하고 있어요.
                </div>
                <button className={styles.submitButton} onClick={handleSubmit}>저장하기</button>
            </div>
        </div>
    );
};

export default AddSupplements;
