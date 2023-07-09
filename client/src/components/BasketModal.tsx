import { useState } from "react";
import styled from "styled-components";
import BasketItem from "./BasketItem";
import { FaXmark } from "react-icons/fa6";

type BasketModalProps = {
  onClose: () => void;
};
const BasketModal: React.FC<BasketModalProps> = ({ onClose }) => {
  const [isDeleteBtn, setIsDeleteBtn] = useState(true);

  const handleDeleteClick = () => {
    setIsDeleteBtn(false);
    onClose();
  };
  return (
    isDeleteBtn && (
      <Modal>
        <ModalContent>
          <RightElements onClick={handleDeleteClick}>
            <FaXmark color="white" />
          </RightElements>
          <CenterElements>
            <BasketItem />
          </CenterElements>
          <SearchBtn>레시피 검색</SearchBtn>
        </ModalContent>
      </Modal>
    )
  );
};

export default BasketModal;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  overflow: hidden;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background-color: rgba(98, 104, 131, 1);
  width: 300px;
  height: 412px;
  border-radius: 30px;
`;
const CenterElements = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 4fr);
  place-items: center;
  grid-gap: 10px;
  overflow-y: scroll;
  height: 260px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchBtn = styled.button`
  background-color: rgba(1, 1, 1, 0.4);
  width: 176px;
  height: 52px;
  border-radius: 10px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const RightElements = styled.div`
  margin: 20px;
  position: absolute;
  top: 0;
  right: 0;
`;
