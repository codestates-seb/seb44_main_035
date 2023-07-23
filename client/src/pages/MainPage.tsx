import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLogo from "../components/Main/MainLogo";
import IngreList from "../components/Main/IngreList";
import BasketModal from "../components/Main/BasketModal";
import styled from "styled-components";
import { ingreItemAtom } from "../atoms/atoms";
import { useRecoilState } from "recoil";

const MainPage = () => {
  const [ingreState, _setIngreState] = useRecoilState(ingreItemAtom);
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
          <ButtonBox>
            <Button onClick={() => navigate("/refridge")}>추천 레시피</Button>
            <Button onClick={handleBasketClick}>
              선택 재료 <ItemCount>{ingreState.length}</ItemCount>
            </Button>
            {isOpenBasketModal && (
              <BasketModal onClose={handleCloseBasketModal} />
            )}
          </ButtonBox>
        </Body>
      </AppBox>
    </StyledWrapper>
  );
};

export default MainPage;

const StyledWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

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
  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  position: relative;
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
const ItemCount = styled.div`
  position: absolute;
  height: 30px;
  width: 30px;
  top: -10px;
  right: -10px;
  background-color: salmon;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
