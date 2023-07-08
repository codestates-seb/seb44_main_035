import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLogo from "../components/MainLogo";
import IngreList from "../components/IngreList";
import BasketModal from "../components/BasketModal";
import styled from "styled-components";

const MainPage = () => {
  const navigate = useNavigate();
  const [isOpenBasketModal, setIsOpenBasketModal] = useState(false);
  const handleBasketClick = () => {
    setIsOpenBasketModal(!isOpenBasketModal);
  };
  const handleCloseBasketModal = () => {
    setIsOpenBasketModal(false);
  };

  return (
    <StyledWrapper>
      <AppBox>
        <Header>
          <MainLogo />
        </Header>
        <Body>
          <IngreList />
          <BottomBtn>
            <Btn onClick={() => navigate("/recipes")}>추천 레시피</Btn>
            <Btn onClick={handleBasketClick}> 선택 재료</Btn>
            {isOpenBasketModal && (
              <BasketModal onClose={handleCloseBasketModal} />
            )}
          </BottomBtn>
        </Body>
      </AppBox>
    </StyledWrapper>
  );
};

export default MainPage;

const BottomBtn = styled.div`
  display: flex;
  justify-content: center;
`;
const Btn = styled.button`
  width: 140px;
  height: 46px;
  background-color: rgba(100, 117, 138, 1);
  color: white;
  padding: 15px;
  margin: 30px;
  border-radius: 11px;
  border: none;
  font-weight: bold;
`;

const StyledWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  /* margin: 0;
  padding: 0; */
  background-color: rgba(241, 241, 241, 0.5);
`;

const AppBox = styled.div`
  background-color: rgba(209, 232, 238, 1);
  max-width: 420px;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Header = styled.header`
  width: 100%;
  height: 20%;
`;
const Body = styled.div`
  background-color: white;
  border-radius: 5% 5% 0 0;
  width: 100%;
  height: 80%;
  padding: 30px;
`;
