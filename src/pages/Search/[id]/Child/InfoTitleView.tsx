import styled from 'styled-components';

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
}
const InfoTitleView = ({name}: Props) => {
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
                <ButtonView>
                    <IconImage
                        src={'/assets/icon/ic_bookmark.png'}
                        alt={'ic_bookmark'}
                    />
                    <ButtonText>찜</ButtonText>
                </ButtonView>
            </ButtonContainer>
        </Container>
    );
};

export default InfoTitleView;
