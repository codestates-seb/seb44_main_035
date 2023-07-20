import styled from "styled-components";
import BackButton from "../components/BackButton";
import SearchBar from "../components/recipe/SearchBar";
import Search from "../components/search/Search";
import CreateButton from "../components/recipe/CreateButton";
import { RecipeProps } from "../components/detail/RecipeDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  // data: RecipeProps[];
  search: string;
  setSearch: (value: string) => void;
  state: string;
}

function SearchPage() {
  const queryClient = new QueryClient();

  return (
    <Container>
      <AppBox>
        <Header>
          <BackButton />
          <SearchBar />
        </Header>
        <QueryClientProvider client={queryClient}>
          <Search />
        </QueryClientProvider>
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

export default SearchPage;
