import { useState } from "react";
import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";

const Ingredient = () => {
  const [ingredientInput, setIngredientInput] = useState([
    { placeholder: "예) 밥(2공기)" },
    { placeholder: "예) 참기름(2T)" },
    { placeholder: "예) 굴소스(1T)" },
  ]);
  console.log(ingredientInput);
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIngredient(event.target.value);
    setIngredients([...ingredients, ingredient]);
  };

  const handleAddIngredient = () => {
    const newIngredients = {
      placeholder: "예) 재료(계량)",
    };
    setIngredientInput([...ingredientInput, newIngredients]);
  };
  return (
    <>
      <Title>재료</Title>
      <GridContainer>
        {ingredientInput.map((input, index) => (
          <Input
            key={index}
            type="text"
            name={`ingredient-${index}`}
            placeholder={input.placeholder}
            onChange={(event) => handleIngredientChange(event)}
          />
        ))}
      </GridContainer>
      <AddContainer>
        <AddBtn onClick={handleAddIngredient}>
          <FaPlusCircle size="20px" />
          재료 추가
        </AddBtn>
      </AddContainer>
    </>
  );
};

export default Ingredient;

const Title = styled.div`
  background-color: rgba(217, 217, 217, 1);
  width: 100%;
  height: 37px;
  font-weight: bold;
  font-size: small;
  padding: 10px;
  padding-left: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  border-style: none;
  font-weight: bolder;
  border-bottom: solid 1px rgba(150, 147, 147, 1);
`;

const AddBtn = styled.button`
  background-color: white;
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  border-style: none;
`;
const AddContainer = styled.div`
  margin-top: 50px;
  background-color: salmon;
  width: 100%;
`;
