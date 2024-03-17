import React, {useState} from 'react';
import styles from '../../styles/CalendarModal.module.css';
import {Param_Update_Calendar_Water} from '../../types/server/calendar';
import {useMutation} from '@tanstack/react-query';
import {postCalendarWater, updateCalendarWater} from '../../api/calendar';
import moment from 'moment';

interface Props {
    currentData?: Param_Update_Calendar_Water;
    createDate: Date;
    onRefetch: () => void;
    onClose: () => void;
}
const AddWaterInTake = ({
    currentData,
    createDate,
    onRefetch,
    onClose,
}: Props) => {
    const [intakeGoal, setIntakeGoal] = useState(
        currentData?.waterRequirement ? `${currentData?.waterRequirement}` : '',
    ); // 목표 섭취량을 문자열로 관리합니다.
    const [intakeCount, setIntakeCount] = useState(
        currentData?.waterFrequency ? `${currentData?.waterFrequency}` : '1',
    ); // 각 잔당 섭취량도 문자열로 관리합니다.

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

    const handleSubmit = () => {
        alert(`제출되었습니다:`);
        onRefetch();
        onClose();
    };

    const {mutate: onPostWater} = useMutation({
        mutationFn: postCalendarWater,
        onSuccess: handleSubmit,
    });
    const {mutate: onUpdateWater} = useMutation({
        mutationFn: updateCalendarWater,
        onSuccess: handleSubmit,
    });

    return (
        <div className={styles.modal} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={event => event.stopPropagation()}
            >
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
                        value={(
                            +intakeGoal.replace(/,/g, '') / +intakeCount
                        ).toFixed(0)}
                        disabled
                        className={styles.input}
                    />{' '}
                    ml씩{' '}
                    <select
                        className={styles.dropdown}
                        value={intakeCount}
                        onChange={event => {
                            setIntakeCount(event.target.value);
                        }}
                    >
                        {Array.from({length: 5}, (_, idx) => idx + 1).map(
                            item => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ),
                        )}
                    </select>
                    잔 섭취하고 있어요.
                </div>
                <button
                    className={styles.submitButton}
                    onClick={() => {
                        if (currentData)
                            onUpdateWater({
                                waterIntakeId: currentData.waterIntakeId,
                                waterRequirement: +intakeGoal.replace(/,/g, ''),
                                waterFrequency: +intakeCount,
                                waterCapacity: +(
                                    +intakeGoal.replace(/,/g, '') / +intakeCount
                                ).toFixed(0),
                            });
                        else
                            onPostWater({
                                waterRequirement: +intakeGoal.replace(/,/g, ''),
                                waterFrequency: +intakeCount,
                                waterCapacity: +(
                                    +intakeGoal.replace(/,/g, '') / +intakeCount
                                ).toFixed(0),
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

export default AddWaterInTake;
