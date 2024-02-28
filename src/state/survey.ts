import { atom } from 'recoil';
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
