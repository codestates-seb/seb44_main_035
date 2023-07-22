import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { recipesStateAtom } from "../../atoms/atoms";
type IngredientType = {
  ingredientName: string;
  quantity: string;
};
const Ingredient = () => {
  const [recipes, setRecipes] = useRecoilState(recipesStateAtom);
  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newIngredients: IngredientType[] = [...recipes.ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [event.target.name]: event.target.value,
    };
    updateRecipeIngredient(newIngredients);
  };

  const handleAddIngredient = () => {
    const newIngredient = {
      ingredientName: "",
      quantity: "",
    };
    const newIngredients = [...recipes.ingredients, newIngredient];
    updateRecipeIngredient(newIngredients);
    console.log(recipes.ingredients);
  };

  // TODO update ingredient
  const updateRecipeIngredient = (newRecipeIntro: IngredientType[]) => {
    setRecipes((prevRecipes) => ({
      ...prevRecipes,
      ingredients: newRecipeIntro,
    }));
  };

  return (
    <>
      <Title>재료</Title>
      <GridContainer>
        <div>
          {recipes.ingredients.map((ingredient, index) => (
            <Input
              key={index}
              type="text"
              name={`ingredientName`}
              value={ingredient.ingredientName}
              placeholder={"예) 재료"}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}
        </div>
        <div>
          {recipes.ingredients.map((ingredient, index) => (
            <Input
              key={index}
              type="text"
              name={`quantity`}
              value={ingredient.quantity}
              placeholder={"예) 계량"}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}
        </div>
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
  grid-template-columns: 1fr 1fr; // 두 개의 열로 구성
  grid-auto-rows: minmax(50px, auto); // 행의 높이를 자동으로 조정
  column-gap: 10px; // 열 사이의 간격
  row-gap: 10px; // 행 사이의 간격
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
