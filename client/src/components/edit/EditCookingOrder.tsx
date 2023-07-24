import styled from "styled-components";
import { MdAddAPhoto } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { recipesStateAtom } from "../../atoms/atoms";

const CookingOrder = () => {
  const [recipes, setRecipes] = useRecoilState(recipesStateAtom);

  // TODO update images
  const updateRecipeImages = (newRecipeImage: File[]) => {
    setRecipes((prevRecipes) => ({
      ...prevRecipes,
      cookStepImage: newRecipeImage,
    }));
  };

  // TODO update content
  const updateStepContent = (newStepContent: string[]) => {
    setRecipes((prevRecipes) => ({
      ...prevRecipes,
      cookStepContent: newStepContent,
    }));
  };

  // 이미지 업로드 input의 onChange
  const saveImgFile = (index: number) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      const reader = new FileReader();

      if (file) {
        //TODO multi images
        const newCookStepImage: File[] = [...recipes.cookStepImage];
        newCookStepImage[index] = file;
        updateRecipeImages(newCookStepImage);
        reader.readAsDataURL(file);
      }
    };
  };

  const handleAddInput = () => {
    const newCookStepContent = "";
    const newCookStepContents = [
      ...recipes.cookStepContent,
      newCookStepContent,
    ];
    updateStepContent(newCookStepContents);
  };

  const handleChangeOrderInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const newCookStepContent: string[] = [...recipes.cookStepContent];
    newCookStepContent[index] = event.target.value;
    // TODO stepContent
    updateStepContent(newCookStepContent);
  };

  const maxLength = Math.max(
    recipes.cookStepContent.length,
    recipes.cookStepImage.length
  );

  return (
    <>
      <Title>요리 순서</Title>
      <OrderContainer>
        {Array.from({ length: maxLength }).map((_, index) => (
          <IngreOrder key={index}>
            <OrderNumber>{index + 1}</OrderNumber>
            <OrderInput
              placeholder="새로운 입력 칸"
              value={recipes.cookStepContent[index]}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeOrderInput(event, index)
              }
            ></OrderInput>

            <OrderPhoto>
              <form>
                {recipes.cookStepImage[index] ? (
                  <>
                    <img
                      src={URL.createObjectURL(recipes.cookStepImage[index])}
                      alt={`Food Image ${index}`}
                    />
                    <ImgLabel htmlFor={`FoodImg-${index}`}>
                      이미지 변경
                    </ImgLabel>
                    <ImgInput
                      type="file"
                      accept="image/*"
                      id={`FoodImg-${index}`}
                      onChange={saveImgFile(index)}
                      style={{ display: "none" }}
                    />
                  </>
                ) : (
                  <>
                    <ImgLabel htmlFor={`FoodImg-${index}`}>
                      <MdAddAPhoto size="35px" />
                    </ImgLabel>
                    <ImgInput
                      type="file"
                      accept="image/*"
                      id={`FoodImg-${index}`}
                      onChange={saveImgFile(index)}
                      style={{ display: "none" }}
                    />
                  </>
                )}
              </form>
            </OrderPhoto>
          </IngreOrder>
        ))}
      </OrderContainer>
      <AddContainer>
        <AddBtn onClick={handleAddInput}>
          <FaPlusCircle size="20px" />
          순서 추가
        </AddBtn>
      </AddContainer>
    </>
  );
};

export default CookingOrder;

const Title = styled.div`
  background-color: rgba(217, 217, 217, 1);
  width: 100%;
  height: 37px;
  font-weight: bold;
  font-size: small;
  padding: 10px;
  padding-left: 20px;
`;
const OrderContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
`;
const IngreOrder = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 100%;
  height: 80px;
  border-bottom: solid 1px rgba(150, 147, 147, 1);
`;
const OrderNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const OrderInput = styled.input`
  width: 70%;
  border-style: none;
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
const OrderPhoto = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;

  form {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const ImgInput = styled.input`
  display: none;
`;
const ImgLabel = styled.label`
  display: flex;
  align-items: center;

  /* margin: 5px 0 20px 0; */
  font-weight: bold;
  font-size: 13px;
  color: #0095f6;
  display: inline-block;
  cursor: pointer;
`;
