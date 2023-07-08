import { useState } from "react";
import SearchModal from "./SearchModal";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";
import IngreItem from "./IngreItem";

import { ingreItemAtom } from "../atoms/atoms";
import db from "./db.json";
import { useRecoilState } from "recoil";

const IngreList = () => {
  const [ingreState, setIngreState] = useRecoilState(ingreItemAtom);
  console.log(ingreState);
  const [isOpenAddIngre, setIsOpenAddIngre] = useState(false);
  const handleAddClick = () => {
    setIsOpenAddIngre(!isOpenAddIngre);
  };
  // TODO  여기에 get요청 받아서 그리드 안에 추가시키기
  return (
    <GridContainer>
      {db.data.map((el) => (
        <IngreItem />
      ))}

      <PlusBtn onClick={handleAddClick}>
        <FaPlus size="30" />
      </PlusBtn>
      {isOpenAddIngre && <SearchModal />}
    </GridContainer>
  );
};

export default IngreList;

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
