import {AxiosResponse} from 'axios';
import {
    Param_Post_HospitalComment,
    Response_Get_Hospital,
} from '../types/server/hospital';
import axiosInstance from './axiosInstance';

export const postHospitalComment: (
    param: Param_Post_HospitalComment,
) => Promise<AxiosResponse<any>> = async (
    param: Param_Post_HospitalComment,
) => {
    return await axiosInstance.post(
        `/api/hospitals/${param.hospitalId}/comments`,
        {
            content: param.content,
            star: param.star,
        },
    );
};

export const getHospitalInfo: (
    hospitalId: string,
) => Promise<AxiosResponse<Response_Get_Hospital>> = async (
    hospitalId: string,
) => {
    return await axiosInstance.get(`/api/hospitals/${hospitalId}`);
};
