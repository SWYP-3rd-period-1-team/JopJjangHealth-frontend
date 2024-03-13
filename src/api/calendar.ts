import {AxiosResponse} from 'axios';
import axiosInstance from './axiosInstance';
import {
    Param_Add_Calendar_Water,
    Param_Calendar_Schedules,
    Param_Calendar_Supplement,
    Param_Calendar_UpdateSupplement,
    Param_Update_Calendar_Schedules,
    Param_Update_Calendar_Water,
    Response_Calendar,
} from '../types/server/calendar';

export const getCalendar: (
    calendarDate: string,
) => Promise<AxiosResponse<Response_Calendar>> = async (
    calendarDate: string,
) => {
    return await axiosInstance.get(
        `/api/calenders/myCalenders?calenderDate=${calendarDate}`,
    );
};

// 영양제 정보
export const postCalendarSupplement: (
    param: Param_Calendar_Supplement,
) => Promise<AxiosResponse<any>> = async (param: Param_Calendar_Supplement) => {
    return await axiosInstance.post(`/api/calenders/supplements`, param);
};
export const postUpdateCalendarSupplement: (
    param: Param_Calendar_UpdateSupplement,
) => Promise<AxiosResponse<any>> = async ({
    supplementID,
    supplementName,
    supplementFrequency,
    supplementNumber,
}: Param_Calendar_UpdateSupplement) => {
    return await axiosInstance.put(
        `/api/calenders/supplements/${supplementID}`,
        {
            supplementName,
            supplementNumber,
            supplementFrequency,
        },
    );
};
// 물 섭취량
export const postCalendarWater: (
    param: Param_Add_Calendar_Water,
) => Promise<AxiosResponse<any>> = async (param: Param_Add_Calendar_Water) => {
    return await axiosInstance.post(`/api/calenders/waterIntakes`, param);
};
export const updateCalendarWater: (
    param: Param_Update_Calendar_Water,
) => Promise<AxiosResponse<any>> = async ({
    waterIntakeId,
    waterCapacity,
    waterFrequency,
    waterRequirement,
}: Param_Update_Calendar_Water) => {
    return await axiosInstance.put(
        `/api/calenders/waterIntakes/${waterIntakeId}`,
        {
            waterCapacity,
            waterFrequency,
            waterRequirement,
        },
    );
};

// 일정정보
export const postCalendarSchedule: (
    param: Param_Calendar_Schedules,
) => Promise<AxiosResponse<any>> = async (param: Param_Calendar_Schedules) => {
    return await axiosInstance.post(`/api/calenders/schedules`, param);
};

export const updateCalendarSchedule: (
    param: Param_Update_Calendar_Schedules,
) => Promise<AxiosResponse<any>> = async ({
    scheduleId,
    scheduleName,
    scheduleDate,
    scheduleTime,
}: Param_Update_Calendar_Schedules) => {
    return await axiosInstance.put(`/api/calenders/schedules/${scheduleId}`, {
        scheduleName,
        scheduleDate,
        scheduleTime,
    });
};
