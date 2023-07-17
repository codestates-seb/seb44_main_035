import { useState } from "react";
import SearchModal from "./SearchModal";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";
import IngreItem from "./IngreItem";
import axios from "axios";
// 지울 것
import { ingreItemAtom } from "../../atoms/atoms";
import db from "./db.json";
import { useRecoilState } from "recoil";

const IngreList = () => {
  const [ingreState, setIngreState] = useRecoilState(ingreItemAtom);
  console.log(ingreState);
  const [isOpenAddIngre, setIsOpenAddIngre] = useState(false);
  const handleAddClick = () => {
    setIsOpenAddIngre(!isOpenAddIngre);
  };

  const getList = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/ingres`;
      const data = await axios.get(url);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  getList();

  return (
    <GridContainer>
      {db.data.map((el) => (
        <IngreItem el={el.ingreName} />
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
