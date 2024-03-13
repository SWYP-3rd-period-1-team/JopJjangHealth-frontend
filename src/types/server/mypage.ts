import  {StaticImageData} from 'next/image';
export interface UserInfo {
    profileImage: StaticImageData | string;
    nickname: string;
    userId: string;
    email: string;
}

export interface ChangeNicknameResponse {
    success: boolean;
    message: string;
}

export interface DeleteProfileImageResponse {
    success: boolean;
    message: string;
}
