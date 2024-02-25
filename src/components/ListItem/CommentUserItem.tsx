import {useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;
const ImageView = styled.div`
    width: 70px;
    height: 70px;
    object-fit: cover;
    background-color: #d9d9d9;
    border-radius: 35px;
`;
const Name = styled.p`
    display: flex;
    margin: 0 8px;
`;
const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 0 8px;
`;
const StarBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const StarItem = styled.div<{$isactive: boolean}>`
    color: ${props => (props.$isactive ? '#FFD23F' : '#dadada')};
    cursor: pointer;
`;
const Date = styled.p`
    font-size: 12px;
    color: #999999;
    margin-left: 8px;
`;
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CommentUserItem = () => {
    const [score, setScore] = useState<number>(5);

    return (
        <Container>
            <ImageView />
            <InfoContainer>
                <Name>닉네임</Name>
                <FlexContainer>
                    <StarBox>
                        {[1, 2, 3, 4, 5].map(item => (
                            <StarItem
                                key={item}
                                $isactive={score >= item}
                                onClick={() => setScore(item)}
                            >
                                ★
                            </StarItem>
                        ))}
                    </StarBox>
                    <Date>2024.02.14.</Date>
                </FlexContainer>
            </InfoContainer>
        </Container>
    );
};

export default CommentUserItem;
