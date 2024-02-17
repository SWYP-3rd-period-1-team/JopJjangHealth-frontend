import styled from 'styled-components';

const LoadingContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LoadingView = () => {
    return <LoadingContainer>loading...</LoadingContainer>;
};

export default LoadingView;
