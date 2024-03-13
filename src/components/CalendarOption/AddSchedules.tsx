import React, {useState} from 'react';
import styles from '../../styles/CalendarModal.module.css';
import {useMutation} from '@tanstack/react-query';
import {postCalendarSchedule, updateCalendarSchedule} from '../../api/calendar';
import moment from 'moment';

interface ScheduleItem {
    scheduleId: number;

    scheduleName: string;
    scheduleDate: string;
    scheduleTime: string;
}
interface Props {
    currentData?: ScheduleItem;
    createDate: Date;
    onRefetch: () => void;
    onClose: () => void;
}
const AddSchedules = ({currentData, createDate, onRefetch, onClose}: Props) => {
    const [scheduleName, setScheduleName] = useState(
        currentData?.scheduleName ?? '',
    );
    const [date, setDate] = useState(
        currentData?.scheduleDate ?? moment(createDate).format('YYYY-MM-DD'),
    );
    const [time, setTime] = useState(
        currentData?.scheduleTime ?? moment(createDate).format('hh:mm'),
    );

    const years = Array.from({length: 31}, (_, idx) => idx + 2000);
    const months = Array.from({length: 12}, (_, idx) => idx + 1);
    const daysByMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 10, 31];
    const days = Array.from(
        {length: daysByMonth[+date.slice(5, 7) ?? 0]},
        (_, idx) => idx + 1,
    );
    const hours = Array.from({length: 24}, (_, idx) => idx + 1);
    const minutes = Array.from({length: 60}, (_, idx) => idx + 1);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScheduleName(event.target.value);
    };

    const handleSubmit = () => {
        alert(`제출되었습니다:`);
        onRefetch();
        onClose();
    };

    const {mutate: onPostSchedule} = useMutation({
        mutationFn: postCalendarSchedule,
        onSuccess: handleSubmit,
    });
    const {mutate: onUpdateSchedule} = useMutation({
        mutationFn: updateCalendarSchedule,
        onSuccess: handleSubmit,
    });

    return (
        <div className={styles.modal} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={event => event.stopPropagation()}
            >
                <div className={styles.inputTitle}>일정 추가하기</div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '16px',
                    }}
                >
                    <div className={styles.inputText}>일정</div>
                    <input
                        type="text"
                        value={scheduleName}
                        onChange={handleNameChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.dropdowns}>
                    날짜
                    <select
                        className={styles.dropdown}
                        value={date.slice(0, 4)}
                        onChange={event => {
                            setDate(
                                prev =>
                                    `${event.target.value}${prev.slice(5, 10)}`,
                            );
                        }}
                    >
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    년
                    <select
                        className={styles.dropdown}
                        value={date.slice(5, 7)}
                        onChange={event => {
                            setDate(
                                prev =>
                                    `${prev.slice(0, 5)}${
                                        event.target.value
                                    }${prev.slice(7, 10)}`,
                            );
                        }}
                    >
                        {months.map(monthItem => (
                            <option
                                key={monthItem}
                                value={
                                    `${monthItem}`.length < 2
                                        ? `0${monthItem}`
                                        : `${monthItem}`
                                }
                            >
                                {`${monthItem}`.length < 2
                                    ? `0${monthItem}`
                                    : `${monthItem}`}
                            </option>
                        ))}
                    </select>
                    월
                    <select
                        className={styles.dropdown}
                        value={date.slice(8, 10)}
                        onChange={event => {
                            setDate(
                                prev =>
                                    `${prev.slice(0, 8)}${event.target.value}`,
                            );
                        }}
                    >
                        {days.map(dayItem => (
                            <option
                                key={dayItem}
                                value={
                                    `${dayItem}`.length < 2
                                        ? `0${dayItem}`
                                        : `${dayItem}`
                                }
                            >
                                {`${dayItem}`.length < 2
                                    ? `0${dayItem}`
                                    : `${dayItem}`}
                            </option>
                        ))}
                    </select>
                    일
                </div>
                <div className={styles.dropdowns}>
                    시간
                    <select
                        className={styles.dropdown}
                        value={time.slice(0, 2)}
                        onChange={event => {
                            setTime(
                                prev =>
                                    `${event.target.value}${prev.slice(2, 5)}`,
                            );
                        }}
                    >
                        {hours.map(hourItem => (
                            <option
                                key={hourItem}
                                value={
                                    `${hourItem}`.length < 2
                                        ? `0${hourItem}`
                                        : `${hourItem}`
                                }
                            >
                                {`${hourItem}`.length < 2
                                    ? `0${hourItem}`
                                    : `${hourItem}`}
                            </option>
                        ))}
                    </select>
                    시
                    <select
                        className={styles.dropdown}
                        value={time.slice(3, 5)}
                        onChange={event => {
                            setTime(
                                prev =>
                                    `${prev.slice(0, 3)}${event.target.value}`,
                            );
                        }}
                    >
                        {minutes.map(minuteItem => (
                            <option
                                key={minuteItem}
                                value={
                                    `${minuteItem}`.length < 2
                                        ? `0${minuteItem}`
                                        : `${minuteItem}`
                                }
                            >
                                {`${minuteItem}`.length < 2
                                    ? `0${minuteItem}`
                                    : `${minuteItem}`}
                            </option>
                        ))}
                    </select>
                    분
                </div>
                <button
                    className={styles.submitButton}
                    onClick={() => {
                        if (currentData)
                            onUpdateSchedule({
                                scheduleId: currentData.scheduleId,
                                scheduleName: scheduleName,
                                scheduleDate: date,
                                scheduleTime: time,
                            });
                        else
                            onPostSchedule({
                                scheduleName: scheduleName,
                                scheduleDate: date,
                                scheduleTime: time,
                            });
                    }}
                >
                    저장하기
                </button>
            </div>
        </div>
    );
};

export default AddSchedules;
