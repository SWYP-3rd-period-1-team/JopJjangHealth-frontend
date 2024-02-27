import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import React from 'react';
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default MyApp;
