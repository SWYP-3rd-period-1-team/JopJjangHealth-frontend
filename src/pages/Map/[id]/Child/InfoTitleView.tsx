import {useMutation} from '@tanstack/react-query';
import styled from 'styled-components';
import {postHospitalBookmark} from '../../../../api/Hospital';
import {useQuery_BookmarkList} from '../../../../hooks/react-query';

const Container = styled.h1`
    border-bottom: 2px solid black;
    display: flex;
    width: 100%;
    font-size: 24px;
    align-items: center;
    justify-content: space-between;
`;
const ButtonContainer = styled.div`
    display: flex;
`;
const ButtonView = styled.button`
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
`;
const IconImage = styled.img`
    width: 20px;
    height: 20px;
    object-fit: contain;
`;
const ButtonText = styled.p`
    font-size: 16px;
    margin-left: 8px;
`;

interface Props {
    name: string;
    hospitalId: string;
}
const InfoTitleView = ({name, hospitalId}: Props) => {
    const {data: bookmarkData, refetch} = useQuery_BookmarkList();
    const bookmarkList = bookmarkData?.data?.data.bookmarkList;

    const {mutate: setHospitalBookMark} = useMutation({
        mutationFn: postHospitalBookmark,
        onSuccess: () => {
            refetch?.();
        },
    });

    const isBookmarked = !!bookmarkList?.find(
        bookmarkItem => bookmarkItem.googleMapId === hospitalId,
    );
    return (
        <Container>
            <p>{name}</p>
            <ButtonContainer>
                <ButtonView>
                    <IconImage
                        src={'/assets/icon/ic_share.png'}
                        alt={'ic_share'}
                    />
                    <ButtonText>공유</ButtonText>
                </ButtonView>
                <ButtonView
                    onClick={() => {
                        if (isBookmarked) {
                            setHospitalBookMark({
                                hospitalId,
                                bookmark: false,
                            });
                        } else {
                            setHospitalBookMark({
                                hospitalId,
                                bookmark: true,
                            });
                        }
                    }}
                >
                    <IconImage
                        src={
                            isBookmarked
                                ? '/assets/icon/ic_bookmark.png'
                                : '/assets/icon/ic_bookmark_white.png'
                        }
                        alt={'ic_bookmark'}
                    />
                    <ButtonText>찜</ButtonText>
                </ButtonView>
            </ButtonContainer>
        </Container>
    );
};

export default InfoTitleView;
