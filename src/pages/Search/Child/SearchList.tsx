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
}
const SearchList = ({hospitalList}: Props) => {
    return (
        <Container>
            {hospitalList.map(item => (
                <SearchItem key={item.place_id} hospitalInfo={item} />
            ))}
        </Container>
    );
};

interface SearchItemProps {
    hospitalInfo: Model_GoogleMapPlace;
}
const SearchItem = ({hospitalInfo}: SearchItemProps) => (
    <ItemContainer>
        <ItemInfoTextContainer>
            <p>{hospitalInfo.name}</p>
            <p>{hospitalInfo.formatted_address}</p>
            <p>{hospitalInfo.opening_hours?.open_now}</p>
        </ItemInfoTextContainer>
    </ItemContainer>
);

export default SearchList;
