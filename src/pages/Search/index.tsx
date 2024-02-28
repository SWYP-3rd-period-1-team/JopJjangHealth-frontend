import React, {Suspense, useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import SearchLogoView from './Child/SearchLogoView';
import {Model_GoogleMapPlace} from '../../types/PlaceInfo';
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

    const [location, setLocation] = useState<{
        lat: number;
        lng: number;
    }>();
    const [address, setAddress] = useState<string>();

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
                    setLocation({lat: center.lat(), lng: center.lng()});
                }
            },
        );

        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode(
            {
                location: {
                    lat: center.lat(),
                    lng: center.lng(),
                },
            },
            function (results: any, status: any) {
                if (status === 'OK') {
                    if (results[0]) {
                        // 첫 번째 결과의 도로명 주소 가져오기
                        var address = results[0].formatted_address;
                        setAddress(address);
                    } else {
                        console.log('주소를 찾을 수 없습니다.');
                    }
                } else {
                    console.log('Geocoder에러: ' + status);
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
                    {/* <SearchInput
                        useSearchQueryState={[searchQuery, setSearchQuery]}
                        onSearch={handleSearch}
                    /> */}
                    {isSearchList && (
                        <SearchList
                            hospitalList={searchList}
                            location={location}
                        />
                    )}
                </Container>
            </Layout>
        </>
    );
};

export default Search;
