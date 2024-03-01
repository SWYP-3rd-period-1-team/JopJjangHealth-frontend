/* eslint-disable react-hooks/exhaustive-deps */
import {useRouter} from 'next/router';
import Layout from '../../../components/Layout';
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import InfoTitleView from './Child/InfoTitleView';
import {Model_GoogleMapPlace} from '../../../types/PlaceInfo';
import InfoContentView from './Child/InfoContentView';
import CommentView from './Child/CommntView';
import {useQuery} from '@tanstack/react-query';
import {getHospitalInfo} from '../../../api/Hospital';

const Container = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 30px 160px;
    flex-direction: column;
    align-items: center;
`;
const ImageContainer = styled.div`
    width: 100%;
    height: 400px;
    background-color: #d9d9d9;
`;
const PlaceImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const ContentContainer = styled.section`
    display: flex;
    width: 100%;
    border-bottom: 2px solid black;
`;

const MapDetail = () => {
    const router = useRouter();
    const {id} = router.query as {id: string};
    const [placeDetails, setPlaceDetails] = useState<Model_GoogleMapPlace>();
    const [placeImage, setPlaceImage] = useState<string>();

    const {data: getHospital, refetch: hospitalRefetch} = useQuery({
        queryKey: ['HospitalQuery', id],
        queryFn: () => getHospitalInfo(id),
    });
    console.log(getHospital?.data.data);

    useEffect(() => {
        if (id) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places`;
            script.onload = initializeMap;
            document.head.appendChild(script);
        }
    }, [id]);

    const initializeMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 15,
        });

        const service = new window.google.maps.places.PlacesService(map);

        const request = {
            placeId: id,
        };

        service.getDetails(request, (place: any, status: any) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setPlaceDetails(place);

                const image = place?.photos?.[0].getUrl();
                setPlaceImage(image);
            } else {
                console.error('장소 정보를 가져오는데 실패했습니다:', status);
            }
        });
    };

    return (
        !!id &&
        typeof id === 'string' && (
            <Layout>
                <Container>
                    {/* map api 활성화 용도 hidden */}
                    <div id="map" style={{display: 'none'}} />

                    <ImageContainer>
                        {!!placeImage && (
                            <PlaceImage
                                key={1}
                                src={placeImage}
                                alt={`Photo`}
                            />
                        )}
                    </ImageContainer>
                    {!!placeDetails?.name && (
                        <InfoTitleView name={placeDetails.name} />
                    )}
                    <ContentContainer>
                        <InfoContentView
                            address={placeDetails?.formatted_address}
                            openingHour={
                                placeDetails?.opening_hours?.weekday_text
                            }
                            phoneNumber={placeDetails?.formatted_phone_number}
                        />
                    </ContentContainer>

                    <CommentView hospitalId={id} />
                </Container>
            </Layout>
        )
    );
};

export default MapDetail;
