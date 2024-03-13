import { atom } from 'recoil';
import { HospitalBookmark, HospitalDetail } from '../types/server/like';

export const hospitalFirstDataState = atom<HospitalBookmark[]>({
    key: 'hospitalFirstData',
    default: [{
        googleMapId: '',
        bookmarkDate: '',
    }],
});

export const hospitalInfoState = atom<HospitalDetail[]>({
    key: 'hospitalInfo',
    default: [],
});

export const isLoadingState = atom<boolean>({
    key: 'isLoading',
    default: true,
});

export const isHospitalDetailsLoadedState = atom<boolean>({
    key: 'isHospitalDetailsLoaded',
    default: false,
});

export const isHospitalInfoLoadedState = atom<boolean>({
    key: 'isHospitalInfoLoaded',
    default: false,
});
