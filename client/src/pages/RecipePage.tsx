import styled from "styled-components";
import SearchBar from "../components/recipe/SearchBar";
import BackButton from "../components/BackButton";
import RecipeCard from "../components/recipe/RecipeCard";
import CreateButton from "../components/recipe/CreateButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

function RecipePage() {
  return (
    <Container>
      <AppBox>
        <Header>
          <BackButton />
          <SearchBar />
        </Header>
        {/* <QueryClientProvider client={queryClient}> */}
        <RecipeCard />
        {/* </QueryClientProvider> */}
        <CreateButton />
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
