import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSaveLocalContent from './useSaveLocalContent';

const useAuth = () => {
    const router = useRouter();
    const {getDecryptedCookie} = useSaveLocalContent();
    const accessToken = getDecryptedCookie('zzgg_at');
    
    useEffect(() => {
    
        const userIsLoggedIn = !!accessToken;
        
        if (!userIsLoggedIn) {
            router.push('/Login').catch((error) => console.error('로그인 페이지로 이동 할 수 없습니다.'));
        }
    }, [router]);
};

export default useAuth;
