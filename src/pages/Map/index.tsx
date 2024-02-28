import React, {Suspense, useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import MapView from './Child/MapView';
import styled from 'styled-components';
import LoadingView from '../../components/common/LoadingView';
import {useRouter} from 'next/router';

declare global {
    interface Window {
        google: any;
    }
}

const Container = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 30px 160px;
    flex-direction: column;
    align-items: center;
`;

const Map = () => {
    const router = useRouter();

    const [map, setMap] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    // 마커 관리 전역 변수
    const [markers, setMarkers] = useState<any[]>([]);

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

        // 이전에 생성된 모든 마커 제거
        clearMarkers();

        // 현재 지도의 중심 좌표 (드래그로 위치 변경)
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
            (results: any, status: any) => {
                if (
                    status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                    addMarkers(results);
                }
            },
        );
    };

    // 이전 마커 제거
    const clearMarkers = () => {
        // 전체 마커 목록 순회
        markers.forEach(marker => {
            marker.setMap(null); // 마커를 지도에서 제거
        });
        // 배열 초기화
        setMarkers([]);
    };

    // 마커를 추가하는 함수
    const addMarkers = (places: any[]) => {
        places.forEach(place => {
            const marker = new window.google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name,
            });
            // 생성된 마커를 전역 배열에 추가
            setMarkers(prev => [...prev, marker]);

            // 마커 클릭 이벤트
            marker.addListener('click', () => {
                // console.log(JSON.stringify(place, null, 2));
                router.push(`/Map/${place.place_id}`);
            });

            // 마커에 마우스 호버 이벤트를 추가합니다.
            marker.addListener('mouseover', () => {
                console.log('마커 위에 마우스가 올라갔습니다:', place.name);
            });
        });
    };

    return (
        <>
            <Layout>
                <Container>
                    <Suspense fallback={<LoadingView />}>
                        <MapView />
                    </Suspense>
                </Container>
            </Layout>
        </>
    );
};

export default Map;