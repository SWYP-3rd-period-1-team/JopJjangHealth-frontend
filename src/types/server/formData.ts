export interface LoginFormData {
    username: string;
    password: string;
}

export interface JoinFormData {
    nickname: string;
    userId: string;
    password: string;
    confirmPassword: string;
    email: string;
    emailVerificationCode: string;
}

export interface PasswordFormData {
    email: string;
    userId:string;
}

export interface ChangePasswordFormData {
    password: string;
    confirmPassword: string;
    email: string;
}

export interface FindFormData {
    email: string;
}
