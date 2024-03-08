import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Like.module.css';
import Link from 'next/link';
import noLikeImage from '../../../public/assets/no/this.png';
import Image from 'next/image';
import {fetchHospitalDeleteInfo, fetchHospitalInfo} from '../../api/like';
import {checkUserAuthentication} from '../../utils/auth';
import {GetServerSideProps} from 'next';
import useAuth from '../../hooks/useAuth';
import LoadingView from '../../components/common/LoadingView';

interface HospitalFirstData {
    googleMapId: string;
    bookmarkDate: string;
}

interface HospitalInfo {
    id: string;
    name: string;
    bookmarkDate: string;
    address: string;
    distance: string;
}

const Like = () => {
    useAuth();
    const [hospitalFirstData, setHospitalFirstData] = useState<HospitalFirstData[]>([{
        googleMapId: '',
        bookmarkDate: '',
    }]);
    const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isHospitalDetailsLoaded, setIsHospitalDetailsLoaded] = useState(false);
    const [isHospitalInfoLoaded, setIsHospitalInfoLoaded] = useState(false); // 병원 기본 정보 로딩 상태
    
    useEffect(() => {
        const initializeHospitalInfo = async () => {
            setIsLoading(true);
            try {
                const response = await fetchHospitalInfo();
                setHospitalFirstData(response?.data?.data.bookmarkList);
                setIsHospitalInfoLoaded(true); // 병원 기본 정보 로딩 완료
            }
            finally {
                setIsLoading(false);
            }
        };
        initializeHospitalInfo();
    }, []);
    
    useEffect(() => {
        const loadGoogleMapsScript = (callback: () => void) => {
            if (document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')) {
                callback();
            } else {
                const googleMapScript = document.createElement('script');
                googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places,geometry`;
                document.body.appendChild(googleMapScript);
                googleMapScript.addEventListener('load', callback);
            }
        };
        
        const loadPlaceDetails = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLocation = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                
                const service = new window.google.maps.places.PlacesService(document.createElement('div'));
                
                hospitalFirstData.forEach(hospital => {
                    if (hospital.googleMapId) {
                        service.getDetails({
                            placeId: hospital.googleMapId,
                        }, (result: any, status: any) => {
                            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                                const hospitalLocation = result.geometry.location;
                                const distanceMeters = window.google.maps.geometry.spherical.computeDistanceBetween(userLocation, hospitalLocation);
                                const distanceKm = (distanceMeters / 1000).toFixed(2);
                                
                                setHospitalInfo(prevHospitalInfo => [
                                    ...prevHospitalInfo,
                                    {
                                        id: result.place_id,
                                        name: result.name,
                                        address: result.formatted_address,
                                        bookmarkDate: hospital.bookmarkDate,
                                        distance: `${distanceKm} km`,
                                    },
                                ]);
                            } else {
                                console.error(`병원 호출이 틀렸습니다! ${hospital.googleMapId}:`, status);
                            }
                        });
                    }
                });
            });
        };
        
        if (hospitalFirstData.length > 0 && !isLoading) {
            loadGoogleMapsScript(() => {
                loadPlaceDetails();
                setIsHospitalDetailsLoaded(true);
            });
        }
    }, [hospitalFirstData, isHospitalInfoLoaded]);
    
    const isStillLoading = isLoading || !isHospitalDetailsLoaded;
    const handleDeleteHospital = async (hospitalId: string) => {
        const response = await fetchHospitalDeleteInfo(hospitalId);
        if (response.success) {
            const updatedHospitalInfo = hospitalInfo.filter(hospital => hospital.id !== hospitalId);
            setHospitalInfo(updatedHospitalInfo);
        } else {
            alert(response.message);
        }
    };
    
    return (
        <Layout>
            <div className={styles.like_text}><b>직짱인 님</b>의 <b>찜한</b> 병원 리스트</div>
            {isStillLoading ? <LoadingView />
                :
                <div className={styles.like_container}>
                    {
                        hospitalInfo?.length > 0 ?
                            <>
                                {hospitalInfo.map(hospital => (
                                    <div key={hospital.id} className={styles.like_item_container}>
                                        <div className={styles.title}>
                                            {hospital.name}
                                        </div>
                                        <div className={styles.date}>{hospital.bookmarkDate} 찜</div>
                                        <div className={styles.title}>
                                            <span className={styles.place}>{hospital.address}</span>
                                            {' '}|{' '}
                                            <span className={styles.district}>{hospital.distance} 떨어져 있습니다.</span>
                                        </div>
                                        <div className={styles.delete}
                                             onClick={() => handleDeleteHospital(hospital.id)}>삭제
                                        </div>
                                    </div>
                                ))}
                            </> : <div className={styles.no_hospitals}>
                                <div className={styles.no_like}>찜한 병원이 없네요!</div>
                                <div className={styles.no_like_text}><b>건강 설문</b>을 통해 <b>병원을 추천</b>받아볼까요?</div>
                                <Link href={'/'}>
                                    <button className={styles.click_survey}>건강 설문하러 가기</button>
                                </Link>
                                <div className={styles.imageContainer}>
                                    <Image src={noLikeImage} alt="no_like" width={223} height={156} />
                                </div>
                            </div>
                    }
                </div>}
        </Layout>
    );
};

export default Like;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return checkUserAuthentication(context);
};
