import styled from "styled-components";

const MyPage = () => {
  return (
    <StyledWrapper>
      <AppBox>
        <ProFile>
          <UserPicture>유저 사진</UserPicture>
          <UserName>유저 이름</UserName>
        </ProFile>

        <RecipeBox>
          <List>좋아요 누른 레시피</List>
          <List>내가 작성한 레시피</List>
          <List>댓글 작성한 레시피</List>
          <List>재료 추가 신청</List>
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
  background-color: rgba(217, 217, 217, 1);
  width: 135px;
  height: 135px;
  border-radius: 100%;
  color: black;
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
  background-color: rgba(217, 217, 217, 1);
  margin: 30px;
  border-radius: 14px;
  color: black;
`;
