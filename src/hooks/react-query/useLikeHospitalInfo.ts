import {useEffect} from 'react';

import {useRecoilState} from 'recoil';
import {
    hospitalFirstDataState,
    hospitalInfoState,
    isHospitalDetailsLoadedState, isHospitalInfoLoadedState,
    isLoadingState
} from '../../state/like';
import {HospitalBookmark, HospitalDetail} from '../../types/server/like';
import {fetchHospitalInfo} from '../../api/Like';
import {useRouter} from 'next/router';

const useHospitalInfo = () => {
    const router = useRouter();
    const [hospitalFirstData, setHospitalFirstData] = useRecoilState<HospitalBookmark[]>(hospitalFirstDataState);
    const [hospitalInfo, setHospitalInfo] = useRecoilState<HospitalDetail[]>(hospitalInfoState);
    const [isLoading, setIsLoading] = useRecoilState<boolean>(isLoadingState);
    const [isHospitalDetailsLoaded, setIsHospitalDetailsLoaded] = useRecoilState<boolean>(isHospitalDetailsLoadedState);
    const [isHospitalInfoLoaded, setIsHospitalInfoLoaded] = useRecoilState<boolean>(isHospitalInfoLoadedState);
    
    useEffect(() => {
        const initializeHospitalInfo = async () => {
            setIsLoading(true);
            try {
                const response = await fetchHospitalInfo();
                if (response.data.success) {
                    const bookmarkList = response.data.data.bookmarkList;
                    setHospitalFirstData(bookmarkList.length > 0 ? bookmarkList : '');
                    setIsHospitalInfoLoaded(true);
                } else {
                    setHospitalFirstData([]);
                    setIsHospitalDetailsLoaded(true);
                    setIsHospitalInfoLoaded(true);
                }
            } catch (error) {
                setHospitalFirstData([]);
                setIsHospitalDetailsLoaded(true);
                setIsHospitalInfoLoaded(true);
            } finally {
                setIsLoading(false);
            }
            
        };
        initializeHospitalInfo();
    }, []);
    
    const loadPlaceDetails = () => {
        if (!window.google || !navigator.geolocation) {
            setIsLoading(false);
            return;
        }
        
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                const service = new window.google.maps.places.PlacesService(document.createElement('div'));
                
                const detailsPromises = hospitalFirstData.map((hospital) =>
                    new Promise<HospitalDetail | null>((resolve, reject) => {
                        if (hospital.googleMapId) {
                            service.getDetails({placeId: hospital.googleMapId}, (result:any, status:any) => {
                                if (status === window.google.maps.places.PlacesServiceStatus.OK && result && result.geometry && result.geometry.location) {
                                    let hospitalLat = result.geometry.location.lat;
                                    let hospitalLng = result.geometry.location.lng;
                                    if (typeof hospitalLat === 'function') {
                                        hospitalLat = hospitalLat();
                                    }
                                    if (typeof hospitalLng === 'function') {
                                        hospitalLng = hospitalLng();
                                    }
                                    const hospitalLocation = new window.google.maps.LatLng(Number(hospitalLat), Number(hospitalLng));
                                    const distanceMeters = window.google.maps.geometry?.spherical.computeDistanceBetween(
                                        userLocation,
                                        hospitalLocation
                                    );
                                    if (!isNaN(distanceMeters)) {
                                        const distanceKm = (distanceMeters / 1000).toFixed(2);
                                        resolve({
                                            id: result.place_id,
                                            name: result.name,
                                            address: result.formatted_address,
                                            bookmarkDate: hospital.bookmarkDate,
                                            distance: `${distanceKm} km`,
                                        });
                                    } else {
                                        resolve(null);
                                    }
                                } else {
                                    reject(new Error(`${hospital.googleMapId}의 구글맵 ID에 에러 발생하였습니다.`));
                                }
                            });
                        } else {
                            reject(new Error('구글 맵 ID가 제공되지 않았습니다.'));
                        }
                    }),
                );
                
                Promise.allSettled(detailsPromises).then((results) => {
                    const successfulDetails = results
                        .filter((result): result is PromiseFulfilledResult<HospitalDetail | null> => result.status === 'fulfilled')
                        .map((result) => result.value)
                        .filter((detail): detail is HospitalDetail => detail !== null);
                    setHospitalInfo(successfulDetails);
                    setIsHospitalDetailsLoaded(true);
                }).catch(error => {
                    console.error('구글맵 병원 정보 로드 중 에러 발생:', error);
                })
                    .finally(() => {
                        setIsLoading(false);
                    });
            },
            (error) => {
                console.error('Geolocation 에러 발생:', error);
                setIsLoading(false);
            },
        );
    };
    
    useEffect(() => {
        if (hospitalFirstData?.length > 0 && isHospitalInfoLoaded) {
            const loadGoogleMapsScript = (callback: () => void) => {
                if (!document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')) {
                    const googleMapScript = document.createElement('script');
                    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places,geometry&loading=async`;
                    document.body.appendChild(googleMapScript);
                    googleMapScript.addEventListener('load', callback);
                } else {
                    callback();
                }
            };
            
            if (hospitalFirstData?.length > 0 && !isLoading) {
                loadGoogleMapsScript(() => {
                    loadPlaceDetails();
                });
            } else {
                setIsLoading(false);
            }
        }
    }, [hospitalFirstData, isHospitalInfoLoaded]);
    
    return {hospitalFirstData, hospitalInfo, setHospitalInfo, isLoading, isHospitalDetailsLoaded, isHospitalInfoLoaded};
};

export default useHospitalInfo;
