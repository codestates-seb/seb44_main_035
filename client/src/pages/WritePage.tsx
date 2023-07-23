import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Ingredient from "../components/Write/Ingredient";
import CookingOrder from "../components/Write/CookingOrder";
import { MdAddAPhoto } from "react-icons/md";
import axios from "axios";
import { useRecoilState } from "recoil";
import { recipesStateAtom } from "../atoms/atoms";

const WritePage = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useRecoilState(recipesStateAtom);
  const [recipeImage, setRecipeImage] = useState<string>();

  const handleRecipeNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // TODO recipeName
    updateRecipeName(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO recipeIntro
    updateRecipeIntro(event.target.value);
  };

  // TODO update recipeName
  const updateRecipeName = (newRecipeName: string) => {
    setRecipes((prevRecipes) => ({
      ...prevRecipes,
      recipeName: newRecipeName,
    }));
  };

  // TODO update recipeIntro
  const updateRecipeIntro = (newRecipeIntro: string) => {
    setRecipes((prevRecipes) => ({
      ...prevRecipes,
      recipeIntro: newRecipeIntro,
    }));
  };

  // TODO update image
  const updateRecipeImage = (newRecipeImage: File) => {
    setRecipes((prevRecipes) => ({
      ...prevRecipes,
      recipeImage: newRecipeImage,
    }));
  };

  const saveRecipeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      updateRecipeImage(file);
      reader.onloadend = () => {
        setRecipeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const token = JSON.parse(sessionStorage.getItem("token") || "null") as {
    access: string;
    refresh: string;
  };
  const handleSaveClick = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token.access}`,
      };
      const url = `${import.meta.env.VITE_API_URL}/recipes/create`;
      const formData = new FormData();
      // TODO send photo
      formData.append("recipeImage", recipes.recipeImage);

      // TODO send photo multi photo
      recipes.cookStepImage.forEach((file) => {
        formData.append("cookStepImage", file); // 동일한 키를 사용하여 파일들을 추가
      });

      const data = {
        recipeName: recipes.recipeName,
        recipeIntro: recipes.recipeIntro,
        ingredients: recipes.ingredients,
        cookStepContent: recipes.cookStepContent,
      };
      const json = JSON.stringify(data);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("recipe", blob);
      const response = await axios.post(url, formData, { headers });
      navigate(`/recipes/${response.data.data.recipeId}`); //아이디에 맞는 상세페이지 이동
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <StyledWrapper>
      <AppBox>
        <Title>레시피 제목</Title>
        <TitleInput
          type="text"
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
          name="food-intoduce"
          placeholder="이 레시피의 탄생 배경을 적어주세요."
          onChange={handleContentChange}
        ></IntroduceInput>

        <Ingredient />
        <CookingOrder />
        <BtnContainer>
          <SaveBtn onClick={handleSaveClick}>저장하기</SaveBtn>
          <CancelBtn onClick={() => navigate("/recipes")}>취소하기</CancelBtn>
        </BtnContainer>
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
const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const SaveBtn = styled.button`
  width: 139px;
  height: 63px;
  border-radius: 20px;
  background-color: rgba(96, 150, 255, 1);
  color: white;
  margin-right: 15px;
`;
const CancelBtn = styled.button`
  width: 139px;
  height: 63px;
  border-radius: 20px;
  background-color: rgba(255, 118, 118, 1);
  color: white;
  margin-left: 15px;
`;
