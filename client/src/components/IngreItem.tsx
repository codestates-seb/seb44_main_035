import { useState } from "react";
import SearchModal from "../components/SearchModal";
import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import styled from "styled-components";

const IngreItem = () => {
  const [isDeleteBtn, setIsDeleteBtn] = useState(true);
  const [isOpenAddIngre, setIsOpenAddIngre] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleAddClick = () => {
    setIsOpenAddIngre(!isOpenAddIngre);
  };
  const handleDeleteClick = () => {
    setIsDeleteBtn(false);
  };
  const handleBtnChange = () => {
    setClicked(!clicked);
  };
  // TODO 여기에 get요청 받아서 그리드 안에 추가시키기
  return (
    <GridContainer>
      {isDeleteBtn && (
        <IngreBtn
          onClick={handleBtnChange}
          style={{
            backgroundColor: clicked
              ? "rgba(134, 154, 177, 1)"
              : "rgba(238, 238, 238, 1)",
            color: clicked ? "white" : "black",
          }}
        >
          <Ingre>감자</Ingre>
          <DeleteBtn onClick={handleDeleteClick}>
            <FaXmark />
          </DeleteBtn>
        </IngreBtn>
      )}

      <PlusBtn onClick={handleAddClick}>
        <FaPlus size="30" />
      </PlusBtn>
      {isOpenAddIngre && <SearchModal />}
    </GridContainer>
  );
};

export default IngreItem;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 10px;
`;
const PlusBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(238, 238, 238, 1);
  border-radius: 18%;
  width: 80px;
  height: 85px;
  border: none;
`;
const IngreBtn = styled.div`
  //상속하는 거 알아오기
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 18%;
  width: 80px;
  height: 85px;
`;
const Ingre = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-top: 25px;
`;

const DeleteBtn = styled.button`
  // 자식 버튼으로 만들기
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  background-color: rgba(198, 197, 197, 1);
  border-radius: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 80px;
  height: 29px;
  border: none;
`;
