import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Ingredient from "../components/Write/Ingredient";
import CookingOrder from "../components/Write/CookingOrder";
import Buttons from "../components/Write/Buttons";
import { MdAddAPhoto } from "react-icons/md";

export interface Recipes {
  recipeName: string;
  recipeImage: string;
  recipeIntro: string;
  cookStepContent: string[];
  cookStepImage: string[];
}

const WritePage = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeIntro, setRecipeIntro] = useState("");

  const handleRecipeNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipeName(event.target.value);
  };
  useEffect(() => {
    console.log(recipeName);
  }, [recipeName]);

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeIntro(event.target.value);
  };
  useEffect(() => {
    console.log(recipeIntro);
  }, [recipeIntro]);

  const saveRecipeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <StyledWrapper>
      <AppBox>
        <Title>레시피 제목</Title>
        <TitleInput
          type="text"
          value={recipeName}
          name="title"
          placeholder="요리의 제목을 입력해 주세요."
          onChange={handleRecipeNameChange}
        ></TitleInput>
        <PhotoUpload>
          <form>
            {recipeImage ? (
              <>
                <img src={recipeImage} />
                <ImgLabel htmlFor="FoodImg">이미지 변경</ImgLabel>
              </>
            ) : (
              <ImgLabel htmlFor="FoodImg">
                <MdAddAPhoto size="45px" />
                프로필 이미지 추가
              </ImgLabel>
            )}
            <ImgInput
              type="file"
              accept="image/*"
              id="FoodImg"
              onChange={saveRecipeImage}
            />
          </form>
        </PhotoUpload>
        <Title>요리 소개</Title>
        <IntroduceInput
          type="textarea"
          value={recipeIntro}
          name="food-intoduce"
          placeholder="이 레시피의 탄생 배경을 적어주세요."
          onChange={handleContentChange}
        ></IntroduceInput>

        <Ingredient />
        <CookingOrder />
        <Buttons />
      </AppBox>
    </StyledWrapper>
  );
};

export default WritePage;

const StyledWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(241, 241, 241, 0.5);
`;

const AppBox = styled.div`
  background-color: white;
  max-width: 420px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.div`
  background-color: rgba(217, 217, 217, 1);
  width: 100%;
  height: 37px;
  font-weight: bold;
  font-size: small;
  padding: 10px;
  padding-left: 20px;
`;

const TitleInput = styled.input`
  background-color: rgba(244, 243, 243, 1);
  width: 100%;
  height: 37px;
  padding: 10px;
  padding-left: 20px;
  border-style: none;
`;
const IntroduceInput = styled.input`
  background-color: rgba(244, 243, 243, 1);
  width: 100%;
  height: 70px;
  padding-left: 20px;
  border-style: none;
`;
const PhotoUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(165, 165, 165, 1);
  width: 100%;
  height: 200px;
  font-size: small;
  form {
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
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
  font-weight: bold;
  font-size: 13px;
  color: #0095f6;
  display: inline-block;
  cursor: pointer;
`;
