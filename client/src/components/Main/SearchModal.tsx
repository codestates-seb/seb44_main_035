import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/constants";
import styled from "styled-components";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";

const SearchModal = () => {
  const [isDeleteBtn, setIsDeleteBtn] = useState(true);
  const [ingredient, setIngredient] = useState("");
  const handleDeleteClick = () => {
    setIsDeleteBtn(false);
  };
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(event.target.value);
  };
  const token = JSON.parse(sessionStorage.getItem("token") || "null") as {
    access: string;
    refresh: string;
  };

  /*재료 추가 부분 */
  const addIngredient = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/ingres/add`;
      const data = {
        ingredientName: ingredient,
      };
      const headers = {
        Authorization: `Bearer ${token.access}`,
      };

      await axios.post(url, data, { headers });
      console.log(data);
      window.location.href = "/";
      navigate("/"); //딴 거 넣으면 이동 다 됨
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleAddClick = () => {
    addIngredient();
  };

  return (
    <>
      {isDeleteBtn && (
        <Modal>
          <ModalContent>
            <RightElements>
              <FaXmark onClick={handleDeleteClick} />
            </RightElements>

            <AddIngre
              type="text"
              value={ingredient}
              onChange={handleInputChange}
            ></AddIngre>
            <AddBtn onClick={handleAddClick}>재료추가</AddBtn>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default SearchModal;

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
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: rgba(98, 104, 131, 1);
  width: 300px;
  height: 223px;
  border-radius: 30px;
`;
const AddIngre = styled.input`
  background-color: rgba(245, 241, 233, 1);
  margin: 30px;
  color: black;
  width: 208px;
  height: 56px;
  border-radius: 10px;
`;
const AddBtn = styled.button`
  background-color: rgba(209, 232, 238, 1);
  color: rgba(76, 83, 114, 1);
  width: 141px;
  height: 51px;
  border-radius: 10px;
  font-weight: bold;
`;
const RightElements = styled.div`
  margin: 20px;
  position: absolute;
  top: 0;
  right: 0;
`;
