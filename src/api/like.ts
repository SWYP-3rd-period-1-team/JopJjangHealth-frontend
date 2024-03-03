import axiosInstance from './axiosInstance';

export const fetchHospitalInfo = async () => {
    try {
        const response = await axiosInstance.get('/api/hospitals/members/bookmarks');
        return { success: true, data: response.data.bookmarkList };
    } catch (error) {
        return { success: false, message: "찜한 병원을 호출 하지 못하였습니다." };
    }
};
