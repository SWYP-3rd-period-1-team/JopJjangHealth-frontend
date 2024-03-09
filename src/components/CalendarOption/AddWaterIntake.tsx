import React, {useState} from 'react';
import styles from '../../styles/CalendarModal.module.css';

interface Props {
    onClose: () => void;
}
const AddWaterInTake = ({onClose}: Props) => {
    const [intakeGoal, setIntakeGoal] = useState(''); // 목표 섭취량을 문자열로 관리합니다.
    const [intakePerGlass, setIntakePerGlass] = useState(''); // 각 잔당 섭취량도 문자열로 관리합니다.

    const formatNumberWithComma = (value: string) => {
        const numericValue = value.replace(/,/g, '');
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleIntakeGoalChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const formattedNumber = formatNumberWithComma(event.target.value);
        setIntakeGoal(formattedNumber);
    };

    const handleIntakePerGlassChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const formattedNumber = formatNumberWithComma(event.target.value);
        setIntakePerGlass(formattedNumber);
    };

    const handleSubmit = () => {
        alert(`제출되었습니다:`);
        onClose();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>물 섭취량 추가하기</h2>
                <div style={{marginTop: '16px'}}>
                    목표 섭취량
                    <input
                        type="text"
                        value={intakeGoal}
                        onChange={handleIntakeGoalChange}
                        className={styles.input}
                    />{' '}
                    ml
                </div>
                <div style={{marginTop: '16px'}}>
                    하루에
                    <input
                        type="text"
                        value={intakePerGlass}
                        onChange={handleIntakePerGlassChange}
                        className={styles.input}
                    />{' '}
                    ml씩{' '}
                    <select className={styles.dropdown} defaultValue="1">
                        {Array.from({length: 5}, (_, i) => (
                            <option key={i} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                    잔 섭취하고 있어요.
                </div>
                <button className={styles.submitButton} onClick={handleSubmit}>
                    전송하기
                </button>
            </div>
        </div>
    );
};

export default AddWaterInTake;
