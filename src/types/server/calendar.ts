export interface Response_Calendar {
    myCalender: {
        calenderId: number;
        sleepScheduleInfo?: {
            sleepScheduleId: number;
            sleepPeriod: number;
            sleepTime: number;
            achievement: number;
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
        }[];
        waterIntakeInfo?: {
            waterIntakeId: number;
            waterRequirement: number;
            waterFrequency: number;
            waterCapacity: number;
            achievement: number;
            calenderDate: string;
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
