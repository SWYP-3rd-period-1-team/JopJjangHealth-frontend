import '../styles/globals.css';
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RecoilRoot} from 'recoil';
import type {AppProps} from 'next/app';
import useAxiosConfig from '../hooks/useAxiosConfig';
import axiosInstance from '../api/axiosInstance';

const queryClient = new QueryClient();

function MyApp({Component, pageProps, router}: AppProps) {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <ChildrenComponent
                    Component={Component}
                    pageProps={pageProps}
                    router={router}
                />
            </QueryClientProvider>
        </RecoilRoot>
    );
}

const ChildrenComponent = ({Component, pageProps, router}: AppProps) => {
    const {setAxiosInterceptors} = useAxiosConfig();
    setAxiosInterceptors(axiosInstance);

    return <Component {...pageProps} router={router} />;
};

export default MyApp;
