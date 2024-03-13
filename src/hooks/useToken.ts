// import {useResetRecoilState, useSetRecoilState} from 'recoil';
import useSaveLocalContent from './useSaveLocalContent';
import {useQueryClient} from '@tanstack/react-query';
import Cookies from 'js-cookie';

const useToken = () => {
    const queryClient = useQueryClient();
    const {setEncryptedCookie} = useSaveLocalContent();

    const loginSaveToken = ({
        access_token,
        refresh_token,
    }: {
        access_token: string;
        refresh_token: string;
    }) => {
        setEncryptedCookie('zzgg_at', access_token, 7);
        setEncryptedCookie('zzgg_rt', refresh_token, 7);
    };

    const logoutDeleteToken = () => {
        document.cookie = 'zzgg_at=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'zzgg_rt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        queryClient.clear();
    };
    
    const getTokenValue = (tokenName: string) => {
        return Cookies.get(tokenName);
    };

    return {
        loginSaveToken,
        logoutDeleteToken,
        getTokenValue,
    };
};

export default useToken;
