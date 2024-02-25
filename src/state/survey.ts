import { atom } from 'recoil';
export const selectedBodyPartState = atom({
	key: 'selectedBodyPartState',
	default: null,
});

export const selectedTargetBodyPartState = atom({
	key: 'selectedTargetBodyPartState',
	default: null,
});

export const selectedPresentedSymptomState = atom({
	key: 'selectedPresentedSymptomState',
	default: null,
});
