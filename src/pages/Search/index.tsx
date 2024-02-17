import React, {Suspense, useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import MapView from './Child/MapView';
import styled from 'styled-components';
import LoadingView from '../../components/common/LoadingView';
import SearchView from './Child/SearchView';
import useKakaoMapInit from '../../hooks/useKakaoMapInit';

// const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;

const Container = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 30px 160px;
    flex-direction: column;
    align-items: center;
`;

const Search = () => {
    const {getMapLocation} = useKakaoMapInit();

    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState<{
        latitude: number;
        longitude: number;
    }>();

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
        getMapLocation({location, keyword: searchQuery});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, searchQuery]);

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
