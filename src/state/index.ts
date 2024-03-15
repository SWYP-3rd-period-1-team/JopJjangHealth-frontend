import { atom } from 'recoil';
export const errorMessageState = atom({
    key: 'errorMessageState',
    default: '',
});

export const passwordTypeState = atom({
    key: 'passwordTypeState',
    default: 'password',
});

export const passwordVisibilityState = atom<string>({
    key: 'passwordVisibilityState',
    default: 'password',
});
