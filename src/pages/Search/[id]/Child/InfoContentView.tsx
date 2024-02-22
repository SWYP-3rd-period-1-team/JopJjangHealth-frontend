import styled from 'styled-components';

const Container = styled.div`
    flex: 1;
    padding: 24px 0 36px 0;
`;
const ContentContainer = styled.li`
    display: flex;
    margin-top: 8px;
`;
const ContentImage = styled.img`
    width: 16px;
    height: 16px;
    object-fit: contain;
`;
const ContentText = styled.p`
    margin: 0 0 0 8px;
`;
const OpeningHourView = styled.div`
    display: flex;
    flex-direction: column;
`;

interface Props {
    address?: string;
    openingHour?: string[];
    phoneNumber?: string;
    tags?: string[];
}
const InfoContentView = ({address, openingHour, phoneNumber, tags}: Props) => {
    return (
        <Container>
            {!!address && (
                <ContentView
                    image={'/assets/icon/ic_place.png'}
                    text={address}
                />
            )}
            {!!openingHour && (
                <ContentView
                    image={'/assets/icon/ic_clock.png'}
                    text={
                        <OpeningHourView>
                            {openingHour.map(item => (
                                <ContentText key={item}>{item}</ContentText>
                            ))}
                        </OpeningHourView>
                    }
                />
            )}
            {!!phoneNumber && (
                <ContentView
                    image={'/assets/icon/ic_phone.png'}
                    text={phoneNumber}
                />
            )}
        </Container>
    );
};

interface ContentProps {
    image: string;
    text: string | JSX.Element;
}
const ContentView = ({image, text}: ContentProps) => (
    <ContentContainer>
        <ContentImage src={image} />
        {typeof text === 'string' ? <ContentText>{text}</ContentText> : text}
    </ContentContainer>
);

export default InfoContentView;
