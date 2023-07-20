import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AddModal from "../components/MyPage/AddModal";
import axios from "axios";

const MyPage = () => {
  // const [imgFile, setImgFile] = useState("");
  // const imgRef = useRef();
  const [memberId, setMemberId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  // const handleRecipesClick = () => {
  //   navigate("/my-recipes");
  // };
  const [isOpenAddIngredientModal, setIsOpenAddIngredientModal] =
    useState(false);
  const handleAddClick = () => {
    setIsOpenAddIngredientModal(!isOpenAddIngredientModal);
  };
  const handleCloseIngredientModal = () => {
    setIsOpenAddIngredientModal(false);
  };
  // const saveImgFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       saveImgFile(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  /*페이지 로드 */
  async function fetchData() {
    try {
      const response = await axios.get("URL");
      const data = response.data;
      setMemberId(data.memberId);
      setName(data.name);
      setImage(data.image);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  // 받아온 데이터를 활용하여 화면에 표시하는 로직 작성
  useEffect(() => {
    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <StyledWrapper>
      <AppBox>
        <ProFile>
          {/* <form>
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
          </form> */}
          <UserPicture>{image}유저 사진</UserPicture>
          <UserName>{name}유저 이름</UserName>
        </ProFile>

        <RecipeBox>
          <List>내가 작성한 레시피</List>
          <List>댓글 작성한 레시피</List>
          <List onClick={handleAddClick}>재료 추가 신청</List>
          {isOpenAddIngredientModal && (
            <AddModal onClose={handleCloseIngredientModal} />
          )}
        </RecipeBox>
      </AppBox>
    </StyledWrapper>
  );
};
export default MyPage;
const StyledWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(241, 241, 241, 0.5);
`;

const AppBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  max-width: 420px;
  width: 100%;
  height: 100%;
  position: relative;
`;
const ProFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const UserPicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(98, 104, 131, 1);
  width: 135px;
  height: 135px;
  border-radius: 100%;
  color: white;
`;
const UserName = styled.div`
  color: rgba(61, 80, 103, 1);
  margin-top: 20px;
`;
const RecipeBox = styled.div`
  margin-top: 30px;
`;
const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 332px;
  height: 100px;
  background-color: rgba(98, 104, 131, 1);
  margin: 30px;
  border-radius: 14px;
  color: white;
  font-size: large;
`;
const Label = styled.label`
  margin: 5px 0 20px 0;
  font-weight: bold;
  font-size: 13px;
  color: #0095f6;
  display: inline-block;
  cursor: pointer;
`;
