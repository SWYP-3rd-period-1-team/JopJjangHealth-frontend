import React, {Suspense, useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import LoadingView from '../../components/common/LoadingView';
import {useRouter} from 'next/router';
import SearchLogoView from './Child/SearchLogoView';
import {Model_GoogleMapPlace} from '../../types/PlaceInfo';
import SearchInput from './Child/SearchInput';
import SearchList from './Child/SearchList';

declare global {
    interface Window {
        google: any;
    }
}

const Container = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 30px 30px;
    flex-direction: column;
    align-items: center;
`;

const Search = () => {
    const router = useRouter();

    const [map, setMap] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    // 마커 관리 전역 변수
    const [searchList, setSearchList] = useState<Model_GoogleMapPlace[]>([]);

    useEffect(() => {
        // Google Maps API 스크립트
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places`;
        googleMapScript.onload = initMap;
        document.head.appendChild(googleMapScript);

        return () => {
            document.head.removeChild(googleMapScript);
        };
    }, []);

    const initMap = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const mapInstance = new window.google.maps.Map(
                        document.getElementById('map'),
                        {
                            center: {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            },
                            zoom: 14,
                        },
                    );
                    setMap(mapInstance);
                },
                error => {
                    console.error('Error getting current location:', error);
                },
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const handleSearch = () => {
        if (!map || !searchQuery) return;

        const center = map.getCenter();
        const service = new window.google.maps.places.PlacesService(map);
        service.textSearch(
            {
                query: searchQuery,
                radius: 5000,
                location: {
                    lat: center.lat(),
                    lng: center.lng(),
                },
            },
            (results: Model_GoogleMapPlace[], status: any) => {
                if (
                    status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                    setSearchList(results);
                }
            },
        );
    };

    const isSearchList = !!searchList && searchList.length > 0;

    return (
        <>
            <Layout>
                <div id="map" style={{display: 'none'}} />
                <Container>
                    {!isSearchList && <SearchLogoView />}
                    <SearchInput
                        useSearchQueryState={[searchQuery, setSearchQuery]}
                        onSearch={handleSearch}
                    />
                    {isSearchList && <SearchList hospitalList={searchList} />}
                </Container>
            </Layout>
        </>
    );
};

export default Search;
