import type {NextPage} from 'next';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';
import Image from 'next/image';
import LogoImage from '../../public/assets/Logo.png';

const Container = styled.main`
  height: 100vh;
  flex: 1;
  background: linear-gradient(to bottom, #f1fff7 0%, #91ffbd 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderView = styled.header`
  display: flex;
  width: 100vw;
  padding: 50px 50px 30px 50px;
  align-items: center;
  font-family: 'GmarketSansMedium';
  color: #00a241;
  font-size: 20pt;
`;

const LogoImageView = styled(Image)``;

const MainView = styled.section`
  flex: 1;
  width: 100vw;
  padding: 0 50px 50px 50px;
`;

const Content = styled.div`
  background-color: #f4f4f4;
  width: 100%;
  height: 100%;
`;

const Home: NextPage = () => {
  return (
    <Container>
      <HeaderView>
        <LogoImageView src={LogoImage} alt="로고" width={100} height={100} />
        <div>
          직<strong>짱</strong>건강
        </div>
      </HeaderView>
      <MainView>
        <Content></Content>
      </MainView>
    </Container>
  );
};

export default Home;
