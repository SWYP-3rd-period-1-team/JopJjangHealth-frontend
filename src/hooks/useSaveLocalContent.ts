import CryptoJS from 'crypto-js';

const SECERET_KEY = 'temp';

const useSaveLocalContent = () => {
    const encryptData = (data: string) => {
        const encryptedData = CryptoJS.AES.encrypt(
            data,
            SECERET_KEY,
        ).toString();
        return encryptedData;
    };

    const decryptData = (encryptedData: string) => {
        const decryptedData = CryptoJS.AES.decrypt(
            encryptedData,
            SECERET_KEY,
        ).toString(CryptoJS.enc.Utf8);
        return decryptedData;
    };

    const setEncryptedCookie = (name: string, value: string, days: number) => {
        const expires = days
            ? `; expires=${new Date(
                  Date.now() + days * 24 * 60 * 60 * 1000,
              ).toUTCString()}`
            : '';
        const encryptedValue = encryptData(value); // 데이터를 암호화
        document.cookie = `${name}=${encryptedValue}${expires}; path=/`;
    };

    function getDecryptedCookie(name: string) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(`${name}=`)) {
                const encryptedValue = cookie.substring(name.length + 1); // '=' 이후의 값
                const decryptedValue = decryptData(encryptedValue); // 데이터를 복호화
                return decryptedValue;
            }
        }
        return null;
    }

    return {
        setEncryptedCookie,
        getDecryptedCookie,
    };
};

export default useSaveLocalContent;
