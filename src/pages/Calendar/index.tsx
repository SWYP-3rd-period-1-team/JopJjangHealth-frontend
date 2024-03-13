import React, {useEffect, useState} from 'react';
import styles from '../../styles/Calendar.module.css';
import Layout from '../../components/Layout';
import AddSupplements from '../../components/CalendarOption/AddSupplements';
import AddWaterIntake from '../../components/CalendarOption/AddWaterIntake';
import AddSleepTime from '../../components/CalendarOption/AddSleepTime';
import Image from 'next/image';
import {useQuery_CalendarList} from '../../hooks/react-query';
import moment from 'moment';
import {Checkbox} from '@mui/material';
import AddSchedules from '../../components/CalendarOption/AddSchedules';
import AddWaterInTake from '../../components/CalendarOption/AddWaterIntake';
import {
    Param_Update_Calendar_Sleep,
    Param_Update_Calendar_Water,
} from '../../types/server/calendar';
import {useMutation} from '@tanstack/react-query';

type CalendarProps = {
    year: number;
    month: number;
};

const Calendar: React.FC<CalendarProps> = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentModal, setCurrentModal] = useState<React.ReactNode>(null); // 모달 상태
    const [isVisible, setIsVisible] = useState<boolean>(false); // 새로운 상태 추가: 항목의 표시 여부

    const {data: calendarData, refetch: calendarRefetch} =
        useQuery_CalendarList(moment(currentDate).format('YYYY-MM-DD'));
    const calendarInfo = calendarData?.data.data.myCalender;

    console.log(calendarInfo?.sleepScheduleInfo);

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const getMonthData = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];

        // 이전 달의 날짜
        const prevMonthLastDate = new Date(year, month, 0).getDate();
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push(
                <div
                    key={`prev-${i}`}
                    className={styles.day_notActive}
                    onClick={() =>
                        setCurrentDate(prev => {
                            const newDate = new Date(prev);
                            newDate.setMonth(newDate.getMonth() - 1);
                            newDate.setDate(prevMonthLastDate - i);
                            return newDate;
                        })
                    }
                >
                    {prevMonthLastDate - i}
                </div>,
            );
        }

        // 이번 달의 날짜
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(
                <div
                    key={`current-${i}`}
                    className={styles.day}
                    onClick={() =>
                        setCurrentDate(prev => {
                            const newDate = new Date(prev);
                            newDate.setDate(i);
                            return newDate;
                        })
                    }
                >
                    {i}
                </div>,
            );
        }

        // 다음 달의 날짜
        const remainingDays = 7 - (days.length % 7);
        if (remainingDays !== 7) {
            for (let i = 1; i <= remainingDays; i++) {
                days.push(
                    <div
                        key={`next-${i}`}
                        className={styles.day_notActive}
                        onClick={() =>
                            setCurrentDate(prev => {
                                const newDate = new Date(prev);
                                newDate.setMonth(newDate.getMonth() + 1);
                                newDate.setDate(i);
                                return newDate;
                            })
                        }
                    >
                        {i}
                    </div>,
                );
            }
        }

        return days;
    };

    const monthData = getMonthData(currentDate);

    const handlePrevMonth = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };

    // const {mutate: deleteWater} = useMutation({
    //     mutationFn: updateCalendarWater,
    //     onSuccess: () => {
    //         alert(`제출되었습니다:`);
    //         calendarRefetch();
    //     },
    // });

    const handleNextMonth = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };

    const onClickSupplement = (currentData?: {
        supplementId: number;
        supplementName: string;
        supplementNumber: number;
        supplementFrequency: number;
    }) => {
        setCurrentModal(
            <AddSupplements
                currentData={currentData}
                createDate={currentDate}
                onRefetch={calendarRefetch}
                onClose={handleCloseModal}
            />,
        );
    };
    const onClickWater = (currentData?: Param_Update_Calendar_Water) => {
        setCurrentModal(
            <AddWaterInTake
                currentData={currentData}
                createDate={currentDate}
                onRefetch={calendarRefetch}
                onClose={handleCloseModal}
            />,
        );
    };
    const onClickSleep = (currentData?: Param_Update_Calendar_Sleep) => {
        setCurrentModal(
            <AddSleepTime
                currentData={currentData}
                createDate={currentDate}
                onRefetch={calendarRefetch}
                onClose={handleCloseModal}
            />,
        );
    };
    const onClickSchedule = (currentData?: {
        scheduleId: number;
        scheduleName: string;
        scheduleDate: string;
        scheduleTime: string;
    }) => {
        setCurrentModal(
            <AddSchedules
                currentData={currentData}
                createDate={currentDate}
                onRefetch={calendarRefetch}
                onClose={handleCloseModal}
            />,
        );
    };

    const handleCloseModal = () => {
        setCurrentModal(null);
        // setIsVisible(false); // 모달 닫을 때 표시 상태도 변경
    };

    return (
        <Layout>
            <div className={styles.calendarContainer}>
                <header className={styles.header}>
                    <button
                        className={styles.header_arrow_button}
                        onClick={handlePrevMonth}
                    >
                        <Image
                            src={'/assets/icon/ic_before_gray.png'}
                            width={16}
                            height={16}
                            alt={'back_button'}
                        />
                    </button>
                    <span className={styles.monthDisplay}>
                        {`${currentDate.getFullYear()}. ${
                            currentDate.getMonth() + 1
                        }`}
                    </span>
                    <button
                        className={styles.header_arrow_button_right}
                        onClick={handleNextMonth}
                    >
                        <Image
                            src={'/assets/icon/ic_before_gray.png'}
                            width={16}
                            height={16}
                            alt={'back_button'}
                        />
                    </button>
                </header>
                <div className={styles.grid}>
                    {daysOfWeek.map(day => (
                        <div key={day} className={styles.weekday}>
                            {day}
                        </div>
                    ))}
                    {monthData}
                </div>
            </div>
            <div style={{margin: '0 130px'}}>
                {moment(currentDate).format('YYYY-MM-DD')}
            </div>
            <div className={styles.listTitleContainer}>
                <div className={styles.listText}>질병캘린더 리스트</div>
                <button className={styles.listButton}>리스트 모아보기</button>
            </div>
            <br />
            <div className={styles.listContainer}>
                <div className={styles.listItemHeader}>
                    <span>기본 캘린더</span>
                    <span>
                        {isVisible ? (
                            <div
                                onClick={() => setIsVisible(false)}
                                className={styles.listModalButton}
                            >
                                저장
                            </div>
                        ) : (
                            <div
                                onClick={() => setIsVisible(true)}
                                className={styles.listModalButton}
                            >
                                추가 및 편집
                            </div>
                        )}
                    </span>
                </div>

                <div>
                    {!!calendarInfo?.supplementInfoList &&
                    calendarInfo.supplementInfoList.length > 0 ? (
                        <div className={styles.listItem}>
                            <div style={{width: '100%'}}>
                                {calendarInfo?.supplementInfoList?.map(item => (
                                    <div
                                        className={styles.listItem_Content}
                                        key={item.supplementId}
                                    >
                                        <div
                                            style={{
                                                minWidth: '60px',
                                            }}
                                        >
                                            {item.supplementName}
                                        </div>
                                        <div>{`하루 ${item.supplementFrequency}번`}</div>
                                        {Array.from(
                                            {
                                                length: item.supplementFrequency,
                                            },
                                            (_, idx) => idx + 1,
                                        ).map(supplementItem => (
                                            <div
                                                key={`${item.supplementName}-${supplementItem}`}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Checkbox
                                                    style={{padding: 0}}
                                                />
                                                <div>{`${item.supplementNumber}알`}</div>
                                            </div>
                                        ))}

                                        {isVisible && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        onClickSupplement({
                                                            supplementId:
                                                                item.supplementId,
                                                            supplementName:
                                                                item.supplementName,
                                                            supplementFrequency:
                                                                item.supplementFrequency,
                                                            supplementNumber:
                                                                item.supplementNumber,
                                                        })
                                                    }
                                                >{`[수정]`}</button>
                                                <button>{`[삭제]`}</button>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'flex-end',
                                                        flex: 1,
                                                    }}
                                                    onClick={() =>
                                                        onClickSupplement()
                                                    }
                                                >
                                                    <div>
                                                        {'+ 영양제 추가하기'}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : isVisible ? (
                        <div
                            className={styles.listItem}
                            onClick={() => onClickSupplement()}
                        >
                            {'+ 영양제 추가하기'}
                        </div>
                    ) : null}
                    {!!calendarInfo?.waterIntakeInfo ? (
                        <div className={styles.listItem}>
                            <div style={{width: '100%'}}>
                                <div
                                    className={styles.listItem_Content}
                                    key={
                                        calendarInfo.waterIntakeInfo
                                            .waterIntakeId
                                    }
                                >
                                    <div
                                        style={{
                                            minWidth: '60px',
                                        }}
                                    >
                                        {`물 목표 섭취량`}
                                    </div>
                                    <div>{`${calendarInfo.waterIntakeInfo.waterRequirement}ml`}</div>
                                    <div>{`하루 ${calendarInfo.waterIntakeInfo.waterFrequency}번`}</div>
                                    {Array.from(
                                        {
                                            length: calendarInfo.waterIntakeInfo
                                                .waterFrequency,
                                        },
                                        (_, idx) => idx + 1,
                                    ).map(waterItem => (
                                        <div
                                            key={`${`water`}-${waterItem}`}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Checkbox style={{padding: 0}} />
                                            <div>{`${calendarInfo.waterIntakeInfo?.waterCapacity}ml`}</div>
                                        </div>
                                    ))}
                                    {isVisible && (
                                        <>
                                            <button
                                                onClick={() => {
                                                    if (
                                                        calendarInfo.waterIntakeInfo
                                                    )
                                                        onClickWater({
                                                            waterIntakeId:
                                                                calendarInfo
                                                                    .waterIntakeInfo
                                                                    .waterIntakeId,
                                                            waterFrequency:
                                                                calendarInfo
                                                                    .waterIntakeInfo
                                                                    .waterFrequency,
                                                            waterRequirement:
                                                                calendarInfo
                                                                    .waterIntakeInfo
                                                                    .waterRequirement,
                                                            waterCapacity:
                                                                calendarInfo
                                                                    .waterIntakeInfo
                                                                    .waterCapacity,
                                                        });
                                                }}
                                            >{`[수정]`}</button>
                                            <button>{`[삭제]`}</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : isVisible ? (
                        <div
                            className={styles.listItem}
                            onClick={() => onClickWater()}
                        >
                            {'+ 물 섭취량 추가하기'}
                        </div>
                    ) : null}

                    {!!calendarInfo?.sleepScheduleInfo ? (
                        <div className={styles.listItem}>
                            <div style={{width: '100%'}}>
                                <div
                                    className={styles.listItem_Content}
                                    key={
                                        calendarInfo.sleepScheduleInfo
                                            .sleepScheduleId
                                    }
                                >
                                    <div
                                        style={{
                                            minWidth: '60px',
                                        }}
                                    >
                                        {`목표 수면시간`}
                                    </div>
                                    <div>{`${calendarInfo.sleepScheduleInfo.sleepPeriod}`}</div>

                                    <Checkbox style={{padding: 0}} />
                                    <div>{`하루 ${calendarInfo.sleepScheduleInfo.sleepTime}시간 수면`}</div>

                                    {isVisible && (
                                        <>
                                            <button
                                                onClick={() => {
                                                    if (
                                                        calendarInfo.sleepScheduleInfo
                                                    )
                                                        onClickSleep({
                                                            sleepScheduleId:
                                                                calendarInfo
                                                                    .sleepScheduleInfo
                                                                    .sleepScheduleId,
                                                            sleepPeriod:
                                                                calendarInfo
                                                                    .sleepScheduleInfo
                                                                    .sleepPeriod,
                                                            sleepTime:
                                                                calendarInfo
                                                                    .sleepScheduleInfo
                                                                    .sleepTime,
                                                        });
                                                }}
                                            >{`[수정]`}</button>
                                            <button>{`[삭제]`}</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : isVisible ? (
                        <div
                            className={styles.listItem}
                            onClick={() => onClickSleep()}
                        >
                            {'+ 수면시간 추가하기'}
                        </div>
                    ) : null}

                    {!!calendarInfo?.scheduleInfoList &&
                    calendarInfo.scheduleInfoList.length > 0 ? (
                        <div className={styles.listItem}>
                            <div style={{width: '100%'}}>
                                {calendarInfo?.scheduleInfoList?.map(item => (
                                    <div
                                        className={styles.listItem_Content}
                                        key={item.scheduleId}
                                    >
                                        <div
                                            style={{
                                                minWidth: '60px',
                                            }}
                                        >
                                            {item.scheduleDate}
                                        </div>
                                        <div>{item.scheduleName}</div>
                                        <div>{item.scheduleTime} 예약</div>

                                        {isVisible && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        onClickSchedule({
                                                            scheduleId:
                                                                item.scheduleId,
                                                            scheduleName:
                                                                item.scheduleName,
                                                            scheduleDate:
                                                                item.scheduleDate,
                                                            scheduleTime:
                                                                item.scheduleTime,
                                                        })
                                                    }
                                                >{`[수정]`}</button>
                                                <button>{`[삭제]`}</button>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'flex-end',
                                                        flex: 1,
                                                    }}
                                                    onClick={() =>
                                                        onClickSchedule()
                                                    }
                                                >
                                                    <div>+ 일정 추가하기</div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : isVisible ? (
                        <div
                            className={styles.listItem}
                            onClick={() => onClickSchedule()}
                        >
                            {'+ 일정 추가하기'}
                        </div>
                    ) : null}
                </div>
            </div>
            {/* items.map(
                        (
                            item,
                            index, // isVisible 상태에 따라 항목 표시
                        ) => (!!calendarInfo && calendarInfo[item.value] && (
                            !Array.isArray(calendarInfo.[item.value]) || calendarInfo?[item.value].length > 0
                        )) ? (
                            <div
                                key={index}
                                className={styles.listItem}
                                onClick={() => handleItemClick(item.value)}
                            >
                                {'asdasdasd'}
                            </div>
                        ) : (
                            
                        ),
                    )} */}
            {/* </div> */}
            {currentModal && (
                <div className={styles.modalContainer}>{currentModal}</div>
            )}
        </Layout>
    );
};

export default Calendar;
