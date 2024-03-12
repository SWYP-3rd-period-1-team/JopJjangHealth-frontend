import { atom } from 'recoil';

export const emailUsernameState = atom({
    key: 'emailUsernameState',
    default: '',
});

export const emailDomainState = atom({
    key: 'emailDomainState',
    default: 'gmail.com',
});

export const customDomainState = atom({
    key: 'customDomainState',
    default: '',
});

export const isVerificationSentState = atom({
    key: 'isVerificationSentState',
    default: false,
});

export const isVerificationCompleteState = atom({
    key: 'isVerificationCompleteState',
    default: false,
});

export const isAgreedState = atom({
    key: 'isAgreedState',
    default: false,
});

export const passwordVisibilityState = atom({
    key: 'passwordVisibilityState',
    default: 'password',
});
