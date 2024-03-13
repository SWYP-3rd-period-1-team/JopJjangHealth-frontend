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
            router.push('/Login').catch((error) => console.error('로그인 페이지로 이동 할 수 없습니다.'));
        }
    }, [getTokenValue, router]);
};

export default useAuth;
