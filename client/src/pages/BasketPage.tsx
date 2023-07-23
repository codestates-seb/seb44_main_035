import BackButton from "../components/BackButton";
import SearchBar from "../components/recipe/SearchBar";
import CreateButton from "../components/recipe/CreateButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";
import { ingreItemAtom } from "../atoms/atoms";

export interface RecipeList {
  recipeId: number;
  recipeName: string;
  recipeImage: string;
  views: number;
  recommendCount: number;
}

const BasketPage = () => {
  //무한스크롤
  const [data, setData] = useState<RecipeList[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ref, inView] = useInView();
  const navigate = useNavigate();

  const [ingreState, _setIngreState] = useRecoilState(ingreItemAtom);

  useEffect(() => {
    if (inView) {
      loadMoreItems();
    }
  }, [inView]);

  // 데이터 로드 함수
  const loadMoreItems = async () => {
    // 페이지 증가
    setCurrentPage((prevPage) => prevPage + 1);

    // API 호출하여 새로운 데이터 로드
    try {
      //   const headers = {
      //       "ngrok-skip-browser-warning": "true",
      //   };
      const queryString = ingreState
        .map((ingre) => `ingredients=${encodeURIComponent(ingre)}`)
        .join("&");
      const url = `https://port-0-seb44-main-035-rt92alkaxb0vy.sel4.cloudtype.app/recipes/select?${queryString}`;

      const response = await axios.get(`${url}&page=${currentPage}`);
      const newItems: RecipeList[] = response.data.data;
      setData((prevData: RecipeList[]) => [...prevData, ...newItems]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container>
      <AppBox>
        <Header>
          <BackButton />
          <SearchBar />
        </Header>
        <TitleWrapper>
          <span className="recipesTitle"> 🍽️ 장바구니 레시피 조회 🍽️</span>
          <CreateButton />
        </TitleWrapper>
        <>
          <ul>
            <Wrapper>
              {data.map((recipe: any, index: number) => (
                <Component key={index}>
                  <li
                    onClick={() => {
                      navigate(`/recipes/${recipe.recipeId}`, {
                        state: { recipe },
                      });
                    }}
                  >
                    <img className="img" alt="img" src={recipe.recipeImage} />
                    <div className="name">{recipe.recipeName}</div>
                  </li>
                </Component>
              ))}
            </Wrapper>
          </ul>
          <div ref={ref}></div>
        </>
      </AppBox>
    </Container>
  );
};
export default BasketPage;

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const TitleWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
  .recipesTitle {
    color: grey;
    font-size: 20px;
    text-align: center;
  }
`;

const Component = styled.div`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  :hover {
    scale: 1.05;
  }

  .img {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
`;

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
