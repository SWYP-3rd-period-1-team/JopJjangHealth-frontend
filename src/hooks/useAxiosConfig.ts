import {useRecoilState, useSetRecoilState} from 'recoil';
import {AxiosInstance} from 'axios';
import useSaveLocalContent from './useSaveLocalContent';
import useToken from './useToken';

const useAxiosConfig = () => {
    const {setEncryptedCookie, getDecryptedCookie} = useSaveLocalContent();
    const {logoutDeleteToken} = useToken();
    // const showErrorModal = useShowErrorModal();

    const setAxiosInterceptors = (axiosInstance: AxiosInstance) => {
        const REFRESH_URL = `/api/members/refresh`;
        let lock = false;
        let refreshSubscribers: ((token: string) => void)[] = [];

        const onTokenRefreshed = (accessToken: string) => {
            refreshSubscribers.map(callback => callback(accessToken));
        };

        const addRefreshSubscriber = (callback: (token: string) => void) => {
            refreshSubscribers.push(callback);
        };

        const getRefreshToken = async (): Promise<string | void> => {
            try {
                const refreshToken = getDecryptedCookie('zzgg_rt');
                if (refreshToken != null) {
                    const response = await axiosInstance.post(REFRESH_URL, {
                        refreshToken: refreshToken || '',
                    });

                    const {
                        status,
                        data: {
                            data: {accessToken},
                        },
                    } = response;

                    lock = false;
                    onTokenRefreshed(accessToken);
                    refreshSubscribers = [];

                    if (status == 200) {
                        setEncryptedCookie('zzgg_at', accessToken, 7);
                    }

                    return accessToken;
                }
            } catch (error) {
                lock = false;
                refreshSubscribers = [];
                logoutDeleteToken();
            }
        };

        axiosInstance.interceptors.request.use(async config => {
            const Content_Type = config.headers['Content-Type'];
            config.headers['Content-Type'] = Content_Type ?? 'application/json';

            const accessToken = getDecryptedCookie('zzgg_at');

            if (
                !config.headers.Authorization &&
                accessToken != null &&
                config.url != REFRESH_URL &&
                config.url != '/login'
            ) {
                config.headers.Authorization = `${accessToken}`;
            }
            return config;
        });

        axiosInstance.interceptors.response.clear();
        // response 값으로 401 에러를 받을때 refresh token 이 있으면 다시 불러옴
        axiosInstance.interceptors.response.use(
            response => {
                return response;
            },
            async error => {
                const {config, response} = error;

                const originalRequest = config;

                const errorStatus = response.status ?? error.status ?? 0;
                const url = originalRequest.url as string;

                if (
                    (errorStatus === 401 ||
                        response.data ===
                            '만료된 토큰입니다. 토큰을 재발급하세요') &&
                    !url.includes(REFRESH_URL) &&
                    !url.includes('refresh')
                ) {
                    if (!lock) {
                        lock = true;
                        const accessToken = await getRefreshToken();
                        if (accessToken) {
                            config.headers.Authorization = `${accessToken}`;
                            return axiosInstance(config);
                        }
                    }

                    const retryOriginRequest = new Promise(resolve => {
                        addRefreshSubscriber((token: string) => {
                            originalRequest.headers.Authorization = `${token}`;
                            resolve(axiosInstance(originalRequest));
                        });
                    });

                    return retryOriginRequest;
                } else {
                    // if (error?.response?.data) alert(error.response.data);
                }

                return Promise.reject(error);
            },
        );
    };

    return {
        setAxiosInterceptors,
    };
};

export default useAxiosConfig;
