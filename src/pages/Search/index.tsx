import React, {Suspense, useEffect, useRef, useState} from 'react';
import Layout from '../../components/Layout';
import Script from 'next/script';
import Head from 'next/head';
import MapView from './Child/MapView';
import styled from 'styled-components';
import LoadingView from '../../components/common/LoadingView';
import SearchView from './Child/SearchView';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;

const Container = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 30px 160px;
    flex-direction: column;
    align-items: center;
`;

declare global {
    interface Window {
        kakao: any;
    }
}
const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const [location, setLocation] = useState<{
        latitude: number | undefined;
        longitude: number | undefined;
    }>({
        latitude: undefined,
        longitude: undefined,
    });

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                error => {},
            );
        } else {
            console.log('geolocationerrror');
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        if (location.latitude && location.longitude) {
            const kakaoMapScript = document.createElement('script');
            kakaoMapScript.async = false;
            kakaoMapScript.src = KAKAO_SDK_URL;
            document.head.appendChild(kakaoMapScript);

            const onLoadKakaoAPI = () => {
                window.kakao.maps.load(() => {
                    var container = document.getElementById('map');
                    var options = {
                        center: new window.kakao.maps.LatLng(
                            location.latitude,
                            location.longitude,
                        ),
                        level: 3,
                    };

                    const map = new window.kakao.maps.Map(container, options);
                });
            };

            kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
        }
    }, [location]);

    return (
        <>
            <Layout>
                <Container>
                    <SearchView
                        useSearchQueryState={[searchQuery, setSearchQuery]}
                    />
                    <Suspense fallback={<LoadingView />}>
                        <MapView />
                    </Suspense>
                </Container>
            </Layout>
        </>
    );
};

export default Search;
