import {useEffect, useState} from 'react';
import styled from 'styled-components';

const MapContentView = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin-top: 24px;
`;

const MapView = () => {
    return <MapContentView id={'map'} />;
};

export default MapView;
