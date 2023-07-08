import { useState } from "react";
import styled from "styled-components";
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
            <Font>재료를 추가해 주세요.</Font>
            <SearchBtn>레시피 검색</SearchBtn>
          </CenterElements>
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
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;

  background-color: rgba(98, 104, 131, 1);
  width: 300px;
  height: 412px;
  border-radius: 30px;
`;

const CenterElements = styled.div`
  text-align: center;
  margin: 60px;
`;

const RightElements = styled.div`
  text-align: right;
  margin: 30px;
`;

const Font = styled.p`
  font-size: large;
  font-weight: 200px;
  color: white;
`;

const SearchBtn = styled.button`
  background-color: rgba(1, 1, 1, 0.4);
  width: 176px;
  height: 52px;
  margin-top: 110px;
  border-radius: 10px;
`;
