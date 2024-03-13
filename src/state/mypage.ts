import { atom } from 'recoil';
import defaultProfileImage from '../../public/assets/myPage/Default.png';
import {UserInfo} from '../types/server/mypage';

export const changeBasicImageSelectedIndex = atom<number | null>({
    key: 'changeBasicImageSelectedState',
    default: null,
});

export const changeProfileImageSelectedFile = atom<File | null>({
    key: 'changeProfileImageSelectedFileState',
    default: null,
});

export const changeProfileImagePreviewUrl = atom<string>({
    key: 'changeProfileImagePreviewUrlState',
    default: defaultProfileImage.src,
});

export const showLogoutModalState = atom({
    key: 'showLogoutModalState',
    default: false,
});

export const isLoadingState = atom({
    key: 'isLoadingState',
    default: true,
});

export const userInfoState = atom<UserInfo>({
    key: 'userInfoState',
    default: {
        profileImage: defaultProfileImage,
        nickname: '',
        userId: '',
        email: '',
    },
});

export const newNicknameState = atom({
    key: 'newNicknameState',
    default: '',
});

export const errorMessageState = atom({
    key: 'errorMessageState',
    default: '',
});

export const nicknameValidationPassedState = atom({
    key: 'nicknameValidationPassedState',
    default: true,
});

export const nicknameChangeRequestedState = atom({
    key: 'nicknameChangeRequestedState',
    default: true,
});

export const isVerificationSentState = atom({
    key: 'isVerificationSentState',
    default: false,
});

export const passwordTypeState = atom({
    key: 'passwordTypeState',
    default: 'password',
});
