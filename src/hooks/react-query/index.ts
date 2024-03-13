import {options} from './../../../mock/SurveyMock';
import {UseQueryOptions, UseQueryResult, useQuery} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';
import {fetchUserInfo} from '../../api/MyPage';
import {fetchHospitalInfo} from '../../api/Like';

export const useQuery_UserInfo: () => UseQueryResult<{
    data: {
        success: boolean;
        data: {
            email: string;
            memberId: number;
            nickname: string;
            profileImage: string;
            userId: string;
        };
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
