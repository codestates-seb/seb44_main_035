import { useEffect, useState } from "react";
import SearchModal from "./SearchModal";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";
import IngreItem from "./IngreItem";
import { BASE_URL } from "../../constants/constants";
import axios from "axios";

type ingreListType = {
  ingredientId: number;
  ingredientName: string;
  quantity: number;
};

const IngreList = () => {
  const [ingreList, setIngreList] = useState<ingreListType[]>([]);

  const [isOpenAddIngre, setIsOpenAddIngre] = useState(false);

  const handleAddClick = () => {
    setIsOpenAddIngre(!isOpenAddIngre);
  };
  const token = JSON.parse(sessionStorage.getItem("token") || "null") as {
    access: string;
    refresh: string;
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token.access}`,
          // "ngrok-skip-browser-warning": "true",
        };
        const url = `${import.meta.env.VITE_API_URL}/ingres`;
        const response = await axios.get(url, { headers });
        const data = response.data.data;
        console.log(response);
        console.log(data);
        setIngreList(() => [...data]);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getList();
  }, []);

  return (
    <GridContainer>
      {ingreList.map((el) => (
        <IngreItem el={el.ingredientName} ingredientId={el.ingredientId} />
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