import axiosInstance from './axiosInstance';

export const fetchHospitalInfo = async () => {
    try {
        const response = await axiosInstance.get('/api/hospitals/members/bookmarks');
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: "찜한 병원을 호출 하지 못하였습니다." };
    }
};

export const fetchHospitalDeleteInfo = async (hospitalId: string) => {
    try {
        const response = await axiosInstance.post(`/api/hospitals/${hospitalId}/bookmarks`,{
            bookmark: false
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: "찜한 병원을 삭제하지 못하였습니다." };
    }
};


