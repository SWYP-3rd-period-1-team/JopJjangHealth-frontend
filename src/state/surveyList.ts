import { atom } from 'recoil';
import {DiseaseItem} from '../types/server/surveyList';

export const selectedDiseasesState = atom<string[]>({
    key: 'selectedDiseasesState',
    default: [],
});

export const isSelectionModeState = atom<boolean>({
    key: 'isSelectionModeState',
    default: false,
});

export const activeDiseaseIdState = atom<string | null>({
    key: 'activeDiseaseIdState',
    default: null,
});

export const isLoadingState = atom<boolean>({
    key: 'isLoadingState',
    default: true,
});

export const diseaseListState = atom<DiseaseItem[]>({
    key: 'diseaseListState',
    default: [],
});
