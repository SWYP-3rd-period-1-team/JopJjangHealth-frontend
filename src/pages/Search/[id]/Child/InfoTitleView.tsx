import styled from 'styled-components';

const Container = styled.h1`
    border-bottom: 2px solid black;
    display: flex;
    width: 100%;
    font-size: 24px;
`;

interface Props {
    name: string;
}
const InfoTitleView = ({name}: Props) => {
    return (
        <Container>
            <p>{name}</p>
        </Container>
    );
};

export default InfoTitleView;
