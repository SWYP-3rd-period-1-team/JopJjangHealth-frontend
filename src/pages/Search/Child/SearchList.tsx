import styled from 'styled-components';
import {Model_GoogleMapPlace} from '../../../types/PlaceInfo';
import {useQuery_BookmarkList} from '../../../hooks/react-query';
import {postHospitalBookmark} from '../../../api/Hospital';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/router';

const Container = styled.section`
    padding: 54px 20px;
    width: 80%;
    background-color: #ffffff;
    border: 1px solid #a8a8a8;
    margin-top: 16px;
`;
const ItemContainer = styled.li`
    display: flex;
    align-items: center;
    padding: 32px 20px;
    background-color: white;
    border-radius: 5px;
    margin-top: 16px;
    border: 1px solid #ececec;
    &:hover {
        background: linear-gradient(90deg, #b5fcd1, #b5fcd14d);
    }
`;
const ItemInfoTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;
const HospitalName = styled.p`
    font-size: 16px;
    margin: 0;
`;
const HospitalInfoView = styled.div`
    display: flex;
    align-items: center;
    margin-top: 16px;
`;
const HospitalContent = styled.p`
    margin: 0;
    font-size: 12px;
`;
const HospitalContentSepetateLine = styled.div`
    width: 3px;
    height: 16px;
    background-color: #d3d3d3;
    margin: 0 16px;
`;
const BookmarkButton = styled.button`
    border: none;
    background-color: transparent;
`;
const BookmarkIcon = styled.img`
    width: 24px;
    height: 24px;
    object-fit: contain;
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
    const router = useRouter();

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

    const {data: bookmarkData, refetch} = useQuery_BookmarkList();
    const bookmarkList = bookmarkData?.data?.data.bookmarkList;

    const {mutate: onSetBookmark} = useMutation({
        mutationFn: postHospitalBookmark,
        onSuccess: () => {
            refetch?.();
        },
    });

    return (
        <Container>
            {Array.isArray(hospitalList) &&
                hospitalList?.map(item => (
                    <SearchItem
                        key={item.place_id}
                        hospitalInfo={item}
                        onClick={() => {
                            router.push(`/Map/${item.place_id}`);
                        }}
                        distance={getDistance(
                            item.geometry.location.lat?.(),
                            item.geometry.location.lng?.(),
                        )}
                        isBookmark={
                            !!bookmarkList?.find(
                                bookmarkItem =>
                                    bookmarkItem.googleMapId === item.place_id,
                            )
                        }
                        onClickBookmark={() => {
                            if (
                                !!bookmarkList?.find(
                                    bookmarkItem =>
                                        bookmarkItem.googleMapId ===
                                        item.place_id,
                                )
                            ) {
                                onSetBookmark({
                                    hospitalId: item.place_id,
                                    bookmark: false,
                                });
                            } else {
                                onSetBookmark({
                                    hospitalId: item.place_id,
                                    bookmark: true,
                                });
                            }
                        }}
                    />
                ))}
        </Container>
    );
};

interface SearchItemProps {
    hospitalInfo: Model_GoogleMapPlace;
    onClick: () => void;
    distance: number;
    isBookmark?: boolean;
    onClickBookmark: () => void;
}
const SearchItem = ({
    hospitalInfo,
    onClick,
    distance,
    isBookmark,
    onClickBookmark,
}: SearchItemProps) => (
    <ItemContainer onClick={onClick}>
        <ItemInfoTextContainer>
            <HospitalName>{hospitalInfo.name}</HospitalName>
            <HospitalInfoView>
                <HospitalContent>
                    {hospitalInfo.formatted_address}
                </HospitalContent>
                <HospitalContentSepetateLine />
                <HospitalContent>{`${distance}m`}</HospitalContent>
            </HospitalInfoView>
        </ItemInfoTextContainer>
        <BookmarkButton
            onClick={event => {
                event.stopPropagation();
                onClickBookmark();
            }}
        >
            <BookmarkIcon
                src={
                    isBookmark
                        ? '/assets/icon/ic_bookmark.png'
                        : '/assets/icon/ic_bookmark_white.png'
                }
            />
        </BookmarkButton>
    </ItemContainer>
);

export default SearchList;
