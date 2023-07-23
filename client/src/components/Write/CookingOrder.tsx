import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdAddAPhoto } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { recipesStateAtom } from "../../atoms/atoms";

type OrderInput = {
  orderNumber: number;
  placeholder: string;
  imgFile: string;
};
const CookingOrder = () => {
  const [recipes, setRecipes] = useRecoilState(recipesStateAtom);
  const [cookStepImage, _setCookStepImage] = useState<File[]>([]);
  const [orderInputs, setOrderInputs] = useState<OrderInput[]>([
    {
      orderNumber: 1,
      placeholder: "예) 소고기는 적당한 크기로 잘라주세요.",
      imgFile: "",
    },
    {
      orderNumber: 2,
      placeholder: "예) 준비된 양념으로 고기를 재워 둡니다.",
      imgFile: "",
    },
    {
      orderNumber: 3,
      placeholder: "예) 고기가 반쯤 익어갈 때 야채와 볶아요.",
      imgFile: "",
    },
  ]);

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

        reader.onloadend = () => {
          const newOrderInputs = [...orderInputs];
          newOrderInputs[index].imgFile = reader.result as string;
          setOrderInputs(newOrderInputs);
        };
        reader.readAsDataURL(file);
      }
    };
  };
  useEffect(() => {
    console.log(cookStepImage);
  }, [cookStepImage]);

  const handleAddInput = () => {
    const newOrderNumber: number = orderInputs.length + 1;
    const newInput: OrderInput = {
      orderNumber: newOrderNumber,
      placeholder: "새로운 입력 칸",
      imgFile: "",
    };
    setOrderInputs([...orderInputs, newInput]);
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

  return (
    <>
      <Title>요리 순서</Title>
      <OrderContainer>
        {orderInputs.map((input, index) => (
          <IngreOrder key={index}>
            <OrderNumber>{input.orderNumber}</OrderNumber>
            <OrderInput
              placeholder={input.placeholder}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeOrderInput(event, index)
              }
            ></OrderInput>
            <OrderPhoto>
              <form>
                {input.imgFile ? (
                  <>
                    <img src={input.imgFile} />
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
