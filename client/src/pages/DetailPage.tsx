import BackButton from "../components/BackButton";
import RecipeDetail from "../components/detail/RecipeDetail";
import styled from "styled-components";
import Comment from "../components/detail/Comment";
import BottomNavBar from "../components/bottom/BottomNavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function DetailPage() {
  return (
    <>
      <Container>
        <AppBox>
          <BackButton />
          <QueryClientProvider client={queryClient}>
            <RecipeDetail />
          </QueryClientProvider>
          <Comment />
        </AppBox>
      </Container>
      <BottomNavBar />
    </>
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
