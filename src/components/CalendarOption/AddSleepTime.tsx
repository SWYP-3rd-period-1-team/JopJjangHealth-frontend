import React, {useState} from 'react';
import styles from '../../styles/CalendarModal.module.css';
import {Param_Update_Calendar_Sleep} from '../../types/server/calendar';
import {useMutation} from '@tanstack/react-query';
import {postCalendarSleep, updateCalendarSleep} from '../../api/calendar';
import moment from 'moment';

type OptionType = {
    value: number;
    label: string;
};

const timeOptions: OptionType[] = Array.from({length: 24}, (_, index) => ({
    value: index,
    label: index.toString().padStart(2, '0') + ':00', // Format the label as 'HH:00'
}));

interface Props {
    currentData?: Param_Update_Calendar_Sleep;
    createDate: Date;
    onRefetch: () => void;
    onClose: () => void;
}
const AddSleepTime = ({currentData, createDate, onRefetch, onClose}: Props) => {
    const [startTime, setStartTime] = useState(
        currentData?.sleepPeriod
            ? +`${currentData.sleepPeriod}`.slice(0, 2)
            : 0,
    );
    const [endTime, setEndTime] = useState(
        currentData?.sleepPeriod
            ? +`${currentData.sleepPeriod}`.slice(4, 6)
            : 7,
    );

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
        onRefetch();
        onClose();
    };

    const {mutate: onPostSleep} = useMutation({
        mutationFn: postCalendarSleep,
        onSuccess: handleSubmit,
    });
    const {mutate: onUpdateSleep} = useMutation({
        mutationFn: updateCalendarSleep,
        onSuccess: handleSubmit,
    });

    return (
        <div className={styles.modal} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={event => event.stopPropagation()}
            >
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
                <button
                    className={styles.submitButton}
                    onClick={() => {
                        if (currentData)
                            onUpdateSleep({
                                sleepScheduleId: currentData.sleepScheduleId,
                                sleepPeriod: `${
                                    startTime >= 10
                                        ? startTime
                                        : `0${startTime}`
                                }00${
                                    endTime >= 10 ? endTime : `0${endTime}`
                                }00`,
                                sleepTime: duration,
                            });
                        else
                            onPostSleep({
                                sleepPeriod: `${
                                    startTime >= 10
                                        ? startTime
                                        : `0${startTime}`
                                }00${
                                    endTime >= 10 ? endTime : `0${endTime}`
                                }00`,
                                sleepTime: duration,
                                calenderDate:
                                    moment(createDate).format('YYYY-MM-DD'),
                            });
                    }}
                >
                    전송하기
                </button>
            </div>
        </div>
    );
};

export default AddSleepTime;
