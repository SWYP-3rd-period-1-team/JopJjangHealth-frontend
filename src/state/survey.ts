import { atom } from 'recoil';
import {IOption} from '../types/server/survey';
export const selectedBodyPartState = atom({
	key: 'selectedBodyPartState',
	default: "",
});

export const selectedTargetBodyPartState = atom({
	key: 'selectedTargetBodyPartState',
	default: "",
});

export const selectedPresentedSymptomState = atom({
	key: 'selectedPresentedSymptomState',
	default: "",
});

export const showLoginConfirmState = atom({
	key: 'showLoginConfirmState',
	default: false,
});

export const currentOptionsState = atom<IOption[]>({
	key: 'currentOptionsState',
	default: [],
});
