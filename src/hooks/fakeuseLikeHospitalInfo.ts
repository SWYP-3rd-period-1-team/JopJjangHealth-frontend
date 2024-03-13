import {useEffect} from 'react';
import {fetchHospitalInfo} from '../api/Like';
import {useRecoilState} from 'recoil';
import {HospitalBookmark, HospitalDetail} from '../types/server/like';
import {
    hospitalFirstDataState,
    hospitalInfoState,
    isHospitalDetailsLoadedState,
    isHospitalInfoLoadedState,
    isLoadingState,
} from '../state/like';
import {useQuery} from '@tanstack/react-query';

const useHospitalInfo = () => {
    // @ts-ignore
    const { data:response, isLoading, isError, error } = useQuery(['hospitalInfo'], fetchHospitalInfo);
    
    useEffect(() => {
        if (isLoading) {
            setIsLoading(true);
            return;
        }
        
        if (isError) {
            console.error('Error fetching hospital info:', error);
            setIsLoading(false);
            return;
        }
        
        if (response) {
            // @ts-ignore
            const bookmarks = response?.data?.data?.bookmarkList ?? [];
            setHospitalFirstData(bookmarks);
            setIsHospitalInfoLoaded(true);
            setIsHospitalDetailsLoaded(true);
        }
        
        setIsLoading(false);
    }, [response, isLoading, isError, error]);
    
    const [hospitalInfo, setHospitalInfo] = useRecoilState<HospitalDetail[]>(hospitalInfoState);
    const [hospitalFirstData, setHospitalFirstData] = useRecoilState<HospitalBookmark[]>(hospitalFirstDataState);
    const [, setIsLoading] = useRecoilState<boolean>(isLoadingState);
    const [isHospitalDetailsLoaded, setIsHospitalDetailsLoaded] = useRecoilState<boolean>(isHospitalDetailsLoadedState);
    const [isHospitalInfoLoaded, setIsHospitalInfoLoaded] = useRecoilState<boolean>(isHospitalInfoLoadedState);
    
    const loadPlaceDetails = () => {
        if (!window.google || !navigator.geolocation) {
            console.error('Google Maps API or Geolocation is not available');
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                const service = new google.maps.places.PlacesService(document.createElement('div'));
                
                const detailsPromises = hospitalFirstData.map((hospital) =>
                    new Promise<HospitalDetail | null>((resolve, reject) => {
                        if (hospital.googleMapId) {
                            service.getDetails({placeId: hospital.googleMapId}, (result: any, status) => {
                                if (status === google.maps.places.PlacesServiceStatus.OK && result) {
                                    const hospitalLocation = result.geometry.location;
                                    const distanceMeters = google.maps.geometry?.spherical.computeDistanceBetween(
                                        userLocation,
                                        hospitalLocation,
                                    );
                                    const distanceKm = (distanceMeters / 1000).toFixed(2);
                                    
                                    resolve({
                                        id: result.place_id,
                                        name: result.name,
                                        address: result.formatted_address,
                                        bookmarkDate: hospital.bookmarkDate,
                                        distance: `${distanceKm} km`,
                                    });
                                } else {
                                    reject(new Error(`Error with Google Maps ID ${hospital.googleMapId}`));
                                    setIsLoading(false);
                                }
                            });
                        } else {
                            reject(new Error('Google Maps ID is not provided.'));
                            setIsLoading(false);
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
                    console.error('Error loading hospital details:', error);
                    setIsLoading(false);
                })
                    .finally(() => {
                        setIsLoading(false);
                    });
            },
            (error) => {
                console.error('Geolocation error:', error);
                setIsLoading(false);
            },
        );
    };
    
    useEffect(() => {
        if (hospitalFirstData?.length > 0 && isHospitalInfoLoaded) {
            const loadGoogleMapsScript = (callback: () => void) => {
                if (!document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')) {
                    const googleMapScript = document.createElement('script');
                    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places,geometry`;
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
