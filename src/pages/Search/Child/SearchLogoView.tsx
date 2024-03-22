import styled from 'styled-components';

const LogoImage1 = styled.img`
    width: 200px;
    height: 200px;
    margin-top: 60px;
`;
const LogoImage2 = styled.img`
    width: 267px;
    height: 190px;
    margin-left: 20px;
    margin-top: 160px;
`;
const Container = styled.main`
    display: flex;
    align-items: center;
    @media (max-width: 1919px) {
        display: block;
    }
`;
const BubbleTriangle = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 30px 15px 0;
    border-color: transparent #ffffff transparent transparent;
    transform: rotate(0deg);
`;
const BubbleContent = styled.div`
    padding: 30px 42px;
    background-color: #ffffff;
    border-radius: 20px;
`;
const BubbleText = styled.p`
    margin: 0;
    font-size: 24px;
    line-height: 1.6;
`;

const SearchLogoView = () => {
    return (
        <Container>
            <LogoImage1 src={'/assets/Logo.png'} />
            <BubbleTriangle />
            <BubbleContent>
                <BubbleText>
                    <strong>어떤 병원/약국을 찾으시나요?</strong>
                </BubbleText>
                <BubbleText>제가 찾아드릴게요!</BubbleText>
            </BubbleContent>
            <LogoImage2 src={'/assets/search/img_search_logo.png'} />
        </Container>
    );
};

export default SearchLogoView;
