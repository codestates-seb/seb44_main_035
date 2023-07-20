import Comment from "../components/detail/Comment";
import BackButton from "../components/BackButton";
import RecipeDetail from "../components/detail/RecipeDetail";
import styled from "styled-components";

interface RecipeProps {
  recipe_id: number;
  img: string;
  name: string;
  view: number;
  likes: number;
}

function DetailPage() {
  return (
    <Container>
      <AppBox>
        <BackButton />
        <RecipeDetail />
        <Comment />
      </AppBox>
    </Container>
  );
}

const Container = styled.main`
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
  overflow-y: auto;
`;

export default DetailPage;
