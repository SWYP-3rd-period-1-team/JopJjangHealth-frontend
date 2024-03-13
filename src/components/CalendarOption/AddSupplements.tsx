import React, {useState} from 'react';
import styles from '../../styles/CalendarModal.module.css';
import {useMutation} from '@tanstack/react-query';
import {
    postCalendarSupplement,
    postUpdateCalendarSupplement,
} from '../../api/calendar';
import moment from 'moment';

interface SupplementItem {
    supplementId: number;
    supplementName: string;
    supplementNumber: number;
    supplementFrequency: number;
}
interface Props {
    currentData?: SupplementItem;
    createDate: Date;
    onRefetch: () => void;
    onClose: () => void;
}
const AddSupplements = ({
    currentData,
    createDate,
    onRefetch,
    onClose,
}: Props) => {
    const [supplementName, setSupplementName] = useState(
        currentData?.supplementName ?? '',
    );
    const [timesPerDay, setTimesPerDay] = useState(
        currentData?.supplementFrequency ?? '1',
    );
    const [pillCount, setPillCount] = useState(
        currentData?.supplementNumber ?? '1',
    );

    const formatNumberWithCommas = (value: string) => {
        const number = parseInt(value.replace(/,/g, ''), 10);
        if (isNaN(number)) return '';

        return number.toLocaleString();
    };

    const handleSupplementNameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSupplementName(event.target.value);
    };

    const handlePillCountChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const formattedNumber = formatNumberWithCommas(event.target.value);
        setPillCount(formattedNumber);
    };

    const handleTimesPerDayChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setTimesPerDay(event.target.value);
    };

    const handleSubmit = () => {
        alert(`제출되었습니다:`);
        onRefetch();
        onClose();
    };

    const {mutate: onPostSupplement} = useMutation({
        mutationFn: postCalendarSupplement,
        onSuccess: handleSubmit,
    });
    const {mutate: onUpdateSupplement} = useMutation({
        mutationFn: postUpdateCalendarSupplement,
        onSuccess: handleSubmit,
    });

    return (
        <div className={styles.modal} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={event => event.stopPropagation()}
            >
                <div className={styles.inputTitle}>영양제 추가하기</div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '16px',
                    }}
                >
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
                    </select>
                    번
                    <select
                        className={styles.dropdown}
                        value={pillCount}
                        onChange={handlePillCountChange}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    알 섭취하고 있어요.
                </div>
                <button
                    className={styles.submitButton}
                    onClick={() => {
                        if (currentData)
                            onUpdateSupplement({
                                supplementID: currentData.supplementId,
                                supplementName: supplementName,
                                supplementFrequency: +timesPerDay,
                                supplementNumber: +pillCount,
                            });
                        else
                            onPostSupplement({
                                supplementName: supplementName,
                                supplementFrequency: +timesPerDay,
                                supplementNumber: +pillCount,
                                calenderDate:
                                    moment(createDate).format('YYYY-MM-DD'),
                            });
                    }}
                >
                    저장하기
                </button>
            </div>
        </div>
    );
};

export default AddSupplements;
