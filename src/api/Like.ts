import axiosInstance from './axiosInstance';
import {fetchHospitalDeleteInfoUrl, fetchHospitalInfoUrl} from './Urls';

export const fetchHospitalInfo = async () => {
    try {
        const response = await axiosInstance.get(fetchHospitalInfoUrl);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: "찜한 병원을 호출 하지 못하였습니다." };
    }
};

export const fetchHospitalDeleteInfo = async (hospitalId: string) => {
    try {
        const response = await axiosInstance.post(fetchHospitalDeleteInfoUrl(hospitalId),{
            bookmark: false
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: "찜한 병원을 삭제하지 못하였습니다." };
    }
};


