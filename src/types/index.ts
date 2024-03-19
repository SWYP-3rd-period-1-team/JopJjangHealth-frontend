export interface APIResponse<T = any> {
    success: boolean;
    data?: any;
    message: string;
    errorCode?: string;
}
