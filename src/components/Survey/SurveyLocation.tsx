import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { locationState } from '../../state';

const SurveyLocation: React.FC = () => {
	const setLocation = useSetRecoilState(locationState);
	
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLocation({ latitude, longitude });
				},
				(error) => {
					console.error(error);
					setLocation(null);
				},
				{ enableHighAccuracy: true }
			);
		} else {
			console.log('Geolocation is not supported by this browser.');
			setLocation(null);
		}
	}, [setLocation]);
	
	return <div>위치 정보 요청 중...</div>;
};

export default SurveyLocation;
