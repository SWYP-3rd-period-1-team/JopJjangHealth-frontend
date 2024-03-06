import {options} from './../../../mock/SurveyMock';
import {UseQueryOptions, UseQueryResult, useQuery} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';
import {fetchUserInfo} from '../../api/mypage';

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
