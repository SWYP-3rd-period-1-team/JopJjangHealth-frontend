import React, {useEffect, useRef} from 'react';
import Layout from '../../components/Layout';
import Script from 'next/script';
import Head from 'next/head';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${'86d801b375edb1d693969c2378c548dd'}&autoload=false`;

declare global {
    interface Window {
        kakao: any;
    }
}
const Map = () => {
    useEffect(() => {
        const kakaoMapScript = document.createElement('script');
        kakaoMapScript.async = false;
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&autoload=false`;
        document.head.appendChild(kakaoMapScript);

        const onLoadKakaoAPI = () => {
            window.kakao.maps.load(() => {
                var container = document.getElementById('map');
                var options = {
                    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                    level: 3,
                };

                var map = new window.kakao.maps.Map(container, options);
            });
        };

        kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
    }, []);

    return (
        <>
            <Layout>
                <div id={'map'} style={{width: '100%', height: '100%'}} />
            </Layout>
        </>
    );
};

export default Map;
