import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {fetchDiseaseList, fetchUserInfo} from '../../api/MyPage';
import {fetchHospitalInfo} from '../../api/Like';
import {getCalendar} from '../../api/calendar';
import {Response_Calendar} from '../../types/server/calendar';
import useSaveLocalContent from '../useSaveLocalContent';
import {DiseaseItem} from '../../types/server/surveyList';

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
    const { getDecryptedCookie } = useSaveLocalContent();
    const refreshToken = getDecryptedCookie('zzgg_rt');
    return useQuery({
        queryKey: ['user_info'],
        queryFn: () => fetchUserInfo(),
        enabled: !!refreshToken,
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
