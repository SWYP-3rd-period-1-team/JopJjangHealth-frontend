import {Checkbox} from '@mui/material';
import styles from '../../../styles/Calendar.module.css';
import UpdateDeleteButton from './UpdateDeleteButton';
import {useMutation} from '@tanstack/react-query';
import {
    deleteCalendarSupplement,
    updateCalendarSupplementArchivement,
} from '../../../api/calendar';

interface Props {
    onClickSupplement: (currentData?: {
        supplementId: number;
        supplementName: string;
        supplementNumber: number;
        supplementFrequency: number;
    }) => void;
    calendarRefetch: () => void;
    supplementInfo: {
        supplementId: number;
        supplementName: string;
        supplementNumber: number;
        supplementFrequency: number;
        achievement: number;
        calenderDate: string;
        supplementAchieveArray?: boolean[];
    };
    isVisible: boolean;
}
const SupplementInfoView = ({
    onClickSupplement,
    calendarRefetch,
    supplementInfo,
    isVisible,
}: Props) => {
    const {mutate: deleteSupplement} = useMutation({
        mutationFn: deleteCalendarSupplement,
        onSuccess: () => {
            alert(`삭제되었습니다:`);
            calendarRefetch();
        },
    });

    const {mutate: updateSupplementArchivement} = useMutation({
        mutationFn: updateCalendarSupplementArchivement,
        onSuccess: () => {
            calendarRefetch();
        },
    });

    const handleCheckboxChange = (index: number) => {
        const supplementArchivement =
            !!supplementInfo.supplementAchieveArray &&
            (supplementInfo.supplementAchieveArray?.length ?? 0) > 0
                ? supplementInfo.supplementAchieveArray
                : Array.from(
                      {length: supplementInfo.supplementFrequency ?? 0},
                      () => false,
                  );
        supplementArchivement[index] = !supplementArchivement[index];

        updateSupplementArchivement({
            supplementId: supplementInfo.supplementId,
            achieveArray: supplementArchivement,
        });
    };

    return (
        <div className={styles.listItem_Content}>
            <div
                style={{
                    minWidth: '60px',
                }}
            >
                {supplementInfo.supplementName}
            </div>
            <div>{`하루 ${supplementInfo.supplementFrequency}번`}</div>
            {Array.from(
                {
                    length: supplementInfo.supplementFrequency,
                },
                (_, idx) => idx + 1,
            ).map(supplementItem => (
                <div
                    key={`${supplementInfo.supplementName}-${supplementItem}`}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Checkbox
                        style={{padding: 0}}
                        checked={
                            supplementInfo.supplementAchieveArray?.[
                                supplementItem
                            ] ?? false
                        }
                        onChange={() => handleCheckboxChange(supplementItem)}
                    />
                    <div>{`${supplementInfo.supplementNumber}알`}</div>
                </div>
            ))}

            {isVisible && (
                <UpdateDeleteButton
                    onUpdate={() =>
                        onClickSupplement({
                            supplementId: supplementInfo.supplementId,
                            supplementName: supplementInfo.supplementName,
                            supplementFrequency:
                                supplementInfo.supplementFrequency,
                            supplementNumber: supplementInfo.supplementNumber,
                        })
                    }
                    onDelete={() =>
                        deleteSupplement({
                            supplementID: supplementInfo.supplementId,
                        })
                    }
                    onAdd={() => onClickSupplement()}
                    addText={`영양제 추가하기`}
                />
            )}
        </div>
    );
};

export default SupplementInfoView;
