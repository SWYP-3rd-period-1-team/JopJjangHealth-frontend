import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useToken from './useToken';

const useAuth = () => {
    const router = useRouter();
    const { getTokenValue } = useToken();
    
    useEffect(() => {
        const accessToken = getTokenValue('zzgg_at');
        const userIsLoggedIn = !!accessToken;
        
        if (!userIsLoggedIn) {
            router.push('/Login').catch((error) => console.error('Failed to redirect to /Login', error));
        }
    }, [getTokenValue, router]);
};

export default useAuth;
