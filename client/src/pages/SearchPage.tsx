import styled from "styled-components";
import BackButton from "../components/BackButton";
import SearchBar from "../components/recipe/SearchBar";
import Search from "../components/search/Search";
// import CreateButton from "../components/recipe/CreateButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BottomNavBar from "../components/bottom/BottomNavBar";

function SearchPage() {
  const queryClient = new QueryClient();
  // const location = useLocation();
  // const searchWord = location.state;

  return (
    <>
      <Container>
        <AppBox>
          <Header>
            <BackButton />
            <SearchBar />
          </Header>
          <QueryClientProvider client={queryClient}>
            <Search />
          </QueryClientProvider>
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
  overflow: hidden;
  position: fixed;
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
