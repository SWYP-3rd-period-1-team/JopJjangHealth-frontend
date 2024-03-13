import {options} from './../../../mock/SurveyMock';
import {UseQueryOptions, UseQueryResult, useQuery} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';
import {fetchUserInfo} from '../../api/mypage';
import {fetchHospitalInfo} from '../../api/like';
import {getCalendar} from '../../api/calendar';
import {Response_Calendar} from '../../types/server/calendar';

export const useQuery_UserInfo: () => UseQueryResult<{
    success: boolean;
    data: {
        email: string;
        memberId: number;
        nickname: string;
        profileImage: string;
        userId: string;
    };
}> = () => {
    return useQuery({
        queryKey: ['user_info'],
        queryFn: () => fetchUserInfo(),
    });
};

export const useQuery_BookmarkList: () => UseQueryResult<{
    data: {
        success: boolean;
        data: {
            message: string;
            bookmarkList: {
                googleMapId: string;
                bookmarkDate: string;
            }[];
        };
    };
}> = () => {
    return useQuery({
        queryKey: ['bookmark_list'],
        queryFn: () => fetchHospitalInfo(),
    });
};

export const useQuery_CalendarList: (calendarDate: string) => UseQueryResult<{
    data: {
        success: boolean;
        data: Response_Calendar;
    };
}> = (calendarDate: string) => {
    return useQuery({
        queryKey: ['calendar_info', calendarDate],
        queryFn: () => getCalendar(calendarDate),
    });
};
