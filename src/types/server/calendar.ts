export interface Response_Calendar {
    myCalender: {
        calenderId: number;
        sleepScheduleInfo?: {
            sleepScheduleId: number;
            sleepPeriod: string;
            sleepTime: number;
            sleepScheduleAchievement: boolean;
            calenderDate: string;
        };
        scheduleInfoList?: {
            scheduleId: number;
            scheduleName: string;
            scheduleDate: string;
            scheduleTime: string;
            achievement: number;
        }[];
        supplementInfoList?: {
            supplementId: number;
            supplementName: string;
            supplementNumber: number;
            supplementFrequency: number;
            achievement: number;
            calenderDate: string;
            supplementAchieveArray?: boolean[];
        }[];
        waterIntakeInfo?: {
            waterIntakeId: number;
            waterRequirement: number;
            waterFrequency: number;
            waterCapacity: number;
            achievement: number;
            calenderDate: string;
            supplementAchieveArray?: boolean[];
        };
    };
}

export interface Param_Calendar_Supplement {
    supplementName: string;
    supplementNumber: number;
    supplementFrequency: number;
    calenderDate: string;
}
export interface Param_Calendar_UpdateSupplement {
    supplementID: number;
    supplementName: string;
    supplementNumber: number;
    supplementFrequency: number;
}

export interface Param_Calendar_Schedules {
    scheduleName: string;
    scheduleDate: string;
    scheduleTime: string;
}
export interface Param_Update_Calendar_Schedules {
    scheduleId: number;
    scheduleName: string;
    scheduleDate: string;
    scheduleTime: string;
}
export interface Param_Add_Calendar_Water {
    waterRequirement: number;
    waterFrequency: number;
    waterCapacity: number;
    calenderDate: string;
}
export interface Param_Update_Calendar_Water {
    waterIntakeId: number;
    waterRequirement: number;
    waterFrequency: number;
    waterCapacity: number;
}
export interface Param_Add_Calendar_Sleep {
    sleepPeriod: string;
    sleepTime: number;
    calenderDate: string;
}
export interface Param_Update_Calendar_Sleep {
    sleepScheduleId: number;
    sleepPeriod: string;
    sleepTime: number;
}
