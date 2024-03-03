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

export const updateHospitalComment: (param: {
    hospitalId: string;
    commentId: number;
    content: string;
}) => Promise<AxiosResponse<any>> = async ({
    hospitalId,
    commentId,
    content,
}: {
    hospitalId: string;
    commentId: number;
    content: string;
}) => {
    return await axiosInstance.put(
        `/api/hospitals/${hospitalId}/comments/${commentId}`,
        {
            content,
        },
    );
};

export const postHospitalReCommnet: (param: {
    hospitalId: string;
    commentId: number;
    content: string;
}) => Promise<AxiosResponse<any>> = async ({
    hospitalId,
    commentId,
    content,
}: {
    hospitalId: string;
    commentId: number;
    content: string;
}) => {
    return await axiosInstance.post(
        `/api/hospitals/${hospitalId}/comments/${commentId}/child-comments`,
        {
            content,
        },
    );
};

export const deleteHospitalComment: (param: {
    hospitalId: string;
    commentId: number;
}) => Promise<AxiosResponse<any>> = async ({
    hospitalId,
    commentId,
}: {
    hospitalId: string;
    commentId: number;
}) => {
    return await axiosInstance.delete(
        `/api/hospitals/${hospitalId}/comments/${commentId}`,
    );
};

export const reportsHospitalComment: (param: {
    hospitalId: string;
    commentId: number;
}) => Promise<AxiosResponse<any>> = async ({
    hospitalId,
    commentId,
}: {
    hospitalId: string;
    commentId: number;
}) => {
    return await axiosInstance.put(
        `/api/hospitals/${hospitalId}/comments/${commentId}/reports`,
        {},
    );
};

export const getHospitalInfo: (
    hospitalId: string,
) => Promise<AxiosResponse<Response_Get_Hospital>> = async (
    hospitalId: string,
) => {
    return await axiosInstance.get(`/api/hospitals/${hospitalId}`);
};

export const postHospitalBookmark: (param: {
    hospitalId: string;
    bookmark: boolean;
}) => Promise<AxiosResponse<Response_Get_Hospital>> = async ({
    hospitalId,
    bookmark,
}: {
    hospitalId: string;
    bookmark: boolean;
}) => {
    return await axiosInstance.post(`/api/hospitals/${hospitalId}/bookmarks`, {
        bookmark,
    });
};
