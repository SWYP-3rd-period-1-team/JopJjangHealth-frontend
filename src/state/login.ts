import { atom } from 'recoil';

export const passwordVisibilityState = atom<string>({
    key: 'passwordVisibilityState',
    default: 'password',
});
