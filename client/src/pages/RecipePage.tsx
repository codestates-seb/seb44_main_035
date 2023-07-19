import styled from "styled-components";
import SearchBar from "../components/recipe/SearchBar";
import BackButton from "../components/BackButton";
import Recipes from "../components/recipe/Recipes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function RecipePage() {
  //무한스크롤

  return (
    <Container>
      <AppBox>
        <Header>
          <BackButton />
          <SearchBar />
        </Header>
        <QueryClientProvider client={queryClient}>
          <Recipes />
        </QueryClientProvider>
        {/* <CreateButton /> */}
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

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
`;

export default RecipePage;