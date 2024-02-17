const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`;

declare global {
    interface Window {
        kakao: any;
    }
}

interface Props {
    location?: {
        latitude: number;
        longitude: number;
    };
    keyword?: string;
}
const useKakaoMapInit = () => {
    const getMapLocation = ({location, keyword}: Props) => {
        const kakaoMapScript = document.createElement('script');
        kakaoMapScript.async = false;
        kakaoMapScript.src = KAKAO_SDK_URL;
        document.head.appendChild(kakaoMapScript);

        const onLoadKakaoAPI = () => {
            window.kakao.maps.load(() => {
                const center = new window.kakao.maps.LatLng(
                    location ? location.latitude : 37.566826,
                    location ? location.longitude : 126.9786567,
                );

                var container = document.getElementById('map');
                var options = {
                    center: center,
                    level: 5,
                };

                const map = new window.kakao.maps.Map(container, options);

                if (keyword) {
                    const displayMarker = (place: any) => {
                        var marker = new window.kakao.maps.Marker({
                            map: map,
                            position: new window.kakao.maps.LatLng(
                                place.y,
                                place.x,
                            ),
                        });

                        window.kakao.maps.event.addListener(
                            marker,
                            'click',
                            function () {
                                // 마커를 클릭했을 때 실행할 동작을 여기에 작성
                                console.log(place);
                            },
                        );
                    };

                    const places = new window.kakao.maps.services.Places();

                    places.keywordSearch(
                        keyword,
                        (data: any, status: any, pagination: any) => {
                            if (
                                status === window.kakao.maps.services.Status.OK
                            ) {
                                for (var i = 0; i < data.length; i++) {
                                    displayMarker(data[i]);
                                }
                            }
                        },
                        {
                            location: center,
                            radius: 3000,
                        },
                    );
                }
            });
        };

        kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
    };

    return {
        getMapLocation,
    };
};

export default useKakaoMapInit;
