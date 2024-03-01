import styled from 'styled-components';
import {Model_GoogleMapPlace} from '../../../types/PlaceInfo';

const Container = styled.section`
    padding: 54px 20px;
    width: 80%;
    background-color: white;
    border: 1px solid #a8a8a8;
    margin-top: 16px;
`;
const ItemContainer = styled.li`
    display: flex;
    padding: 20px;
    background-color: #f4f4f4;
    margin-top: 16px;
`;
const ItemInfoTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

interface Props {
    hospitalList: Model_GoogleMapPlace[];
    location?: {
        lat: number;
        lng: number;
    };
    address?: string;
}
const SearchList = ({hospitalList, location, address}: Props) => {
    const rad = (x: number) => {
        return (x * Math.PI) / 180;
    };

    const getDistance = (lat: number, lng: number) => {
        if (location) {
            const R = 6378137; // Earth’s mean radius in meter
            const dLat = rad(location.lat - lat);
            const dLong = rad(location.lng - lng);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(rad(lat)) *
                    Math.cos(rad(location.lat)) *
                    Math.sin(dLong / 2) *
                    Math.sin(dLong / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c;
            return +d.toFixed(0);
        }
        return 0;
    };

    return (
        <Container>
            {hospitalList.map(item => (
                <SearchItem
                    key={item.place_id}
                    hospitalInfo={item}
                    onClick={() => {
                        console.log(
                            item.geometry.location.lat?.(),
                            item.geometry.location.lng?.(),
                        );
                    }}
                    distance={getDistance(
                        item.geometry.location.lat?.(),
                        item.geometry.location.lng?.(),
                    )}
                />
            ))}
        </Container>
    );
};

interface SearchItemProps {
    hospitalInfo: Model_GoogleMapPlace;
    onClick: () => void;
    distance: number;
}
const SearchItem = ({hospitalInfo, onClick, distance}: SearchItemProps) => (
    <ItemContainer onClick={onClick}>
        <ItemInfoTextContainer>
            <p>{hospitalInfo.name}</p>
            <p>{hospitalInfo.formatted_address}</p>
            <p>{`${distance}m`}</p>
        </ItemInfoTextContainer>
    </ItemContainer>
);

export default SearchList;
