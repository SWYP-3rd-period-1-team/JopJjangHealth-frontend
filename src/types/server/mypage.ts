import  {StaticImageData} from 'next/image';
export interface UserInfo {
    profileImage: StaticImageData | string;
    nickname: string;
    userId: string;
    email: string;
}
