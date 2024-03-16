import {useMutation} from '@tanstack/react-query';
import styles from '../../../styles/Calendar.module.css';
import {
    deleteCalendarWater,
    updateCalendarWaterArchivement,
} from '../../../api/calendar';
import {useEffect, useState} from 'react';
import {Param_Update_Calendar_Water} from '../../../types/server/calendar';
import UpdateDeleteButton from './UpdateDeleteButton';
import {Checkbox} from '@mui/material';

interface Props {
    onClickWater: (currentData?: Param_Update_Calendar_Water) => void;
    calendarRefetch: () => void;
    waterInfo: {
        waterIntakeId: number;
        waterRequirement?: number;
        waterFrequency: number;
        waterCapacity: number;
        achievement: number;
        calenderDate: string;
        supplementAchieveArray?: boolean[];
    };
    isVisible: boolean;
}
const WaterInfoView = ({
    waterInfo,
    calendarRefetch,
    onClickWater,
    isVisible,
}: Props) => {
    const {mutate: deleteWater} = useMutation({
        mutationFn: deleteCalendarWater,
        onSuccess: () => {
            alert(`삭제되었습니다:`);
            calendarRefetch();
        },
    });

    const {mutate: updateWaterArchivement} = useMutation({
        mutationFn: updateCalendarWaterArchivement,
        onSuccess: () => {
            calendarRefetch();
        },
    });

    const handleCheckboxChange = (index: number) => {
        const waterArchivement =
            !!waterInfo.supplementAchieveArray &&
            (waterInfo.supplementAchieveArray?.length ?? 0) > 0
                ? waterInfo.supplementAchieveArray
                : Array.from(
                      {length: waterInfo.waterFrequency ?? 0},
                      () => false,
                  );
        waterArchivement[index] = !waterArchivement[index];

        updateWaterArchivement({
            waterIntakeId: waterInfo.waterIntakeId,
            achieveArray: waterArchivement,
        });
    };

    return (
        <div className={styles.listItem}>
            <div style={{width: '100%'}}>
                <div
                    className={styles.listItem_Content}
                    key={waterInfo.waterIntakeId}
                >
                    <div
                        style={{
                            minWidth: '60px',
                        }}
                    >
                        {`물 목표 섭취량`}
                    </div>
                    <div style={{marginLeft: '8px'}}>{`${
                        waterInfo.waterRequirement ?? '0'
                    }ml`}</div>
                    <div
                        style={{marginLeft: '8px'}}
                    >{`하루 ${waterInfo.waterFrequency}번`}</div>
                    {Array.from(
                        {
                            length: waterInfo.waterFrequency,
                        },
                        (_, idx) => idx,
                    ).map(waterItem => (
                        <div
                            key={`${`water`}-${waterItem}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Checkbox
                                style={{padding: 0}}
                                checked={
                                    waterInfo.supplementAchieveArray?.[
                                        waterItem
                                    ] ?? false
                                }
                                onChange={() => handleCheckboxChange(waterItem)}
                            />
                            <div>{`${waterInfo?.waterCapacity}ml`}</div>
                        </div>
                    ))}
                    {isVisible && (
                        <UpdateDeleteButton
                            onUpdate={() => {
                                if (waterInfo)
                                    onClickWater({
                                        waterIntakeId: waterInfo.waterIntakeId,
                                        waterFrequency:
                                            waterInfo.waterFrequency,
                                        waterRequirement:
                                            waterInfo.waterRequirement ?? 0,
                                        waterCapacity: waterInfo.waterCapacity,
                                    });
                            }}
                            onDelete={() =>
                                deleteWater({
                                    waterIntakeId:
                                        waterInfo?.waterIntakeId ?? -1,
                                })
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default WaterInfoView;
