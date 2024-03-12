export interface APIResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
}
