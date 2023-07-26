import { useState, useEffect } from "react";
import axios from "axios";
import { RecipeList } from "../App";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import SearchBar from "../components/recipe/SearchBar";
import CreateButton from "../components/recipe/CreateButton";
import BottomNavBar from "../components/bottom/BottomNavBar";

type ingreListType = {
  ingredientId: number;
  ingredientName: string;
  quantity: number;
};

export default function RefridgePage() {
  //장바구니에 재료 없는 경우, 냉장고 속 재료 하나라도 있으면 뿌려주기
  //재료 추가 (post) 후에 메인에서 다시 get해서 냉장고에 있는 재료를 담아오는 방식 ...
  //냉장고에 담긴 재료 = ingreList (post) -> 유저 아이디랑 같이 가져오기

  // http://localhost:8080/recipes/find/main?ingredients=양파&ingredients=마늘

  const [ingreList, setIngreList] = useState<ingreListType[]>([]);

  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token") || "null") as {
    access: string;
    refresh: string;
  };
  useEffect(() => {
    const getRefridgeIngre = async () => {
      //냉장고에 담긴 재료 조회
      try {
        const url = `${import.meta.env.VITE_API_URL}/ingres`;
        const headers = {
          Authorization: `Bearer ${token.access}`,
        };
        const response = await axios.get(url, { headers });
        const data = response.data.data;
        setIngreList(() => [...data]);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getRefridgeIngre();
  }, []);

  const ingredientName = [];
  for (let data of ingreList) {
    ingredientName.push(data.ingredientName);
  }
  // 배열로 재료 이름 뽑힘 ex) [양파, 마늘, 당근]

  const queryStr = ingredientName
    .map((item: any) => `ingredients=${item}&`)
    .join("")
    .slice(0, -1);
  // http://localhost:8080/recipes/find/main?ingredients=양파&ingredients=마늘
  // const queryStr = ingres.join("").slice(0, -1);
  // const url = BASE_URL + `recipes/find/main?${queryStr}`;
  // console.log(url);

  const [data, setData] = useState<RecipeList[]>([]);
  const getData = async () => {
    try {
      const url = `${
        import.meta.env.VITE_API_URL
      }/recipes/find/main?${queryStr}`;
      const res = await axios.get(url);
      console.log(res.data);
      setData(res.data.data);
    } catch (error) {
      console.log("에러입니다");
    }
  };

  useEffect(() => {
    getData();
  }, [ingreList]);

  return (
    <>
      <Container>
        <AppBox>
          <Header>
            <BackButton />
            <SearchBar />
          </Header>
          <TitleWrapper>
            <div className="recipesTitle">냉장고 속 재료로 요리하기👩🏻‍🍳</div>
            <CreateButton />
          </TitleWrapper>

          <ul>
            <Wrapper>
              {data.map((recipe: any, index: number) => (
                <>
                  <Component>
                    <li
                      key={index}
                      onClick={() => {
                        navigate(`/recipes/${recipe.recipeId}`);
                      }}
                    >
                      <img
                        className="img"
                        alt="recipeImg"
                        src={recipe.recipeImage}
                      />
                      <div className="name">{recipe.recipeName}</div>
                    </li>
                  </Component>
                </>
              ))}
            </Wrapper>
          </ul>
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
  padding-bottom: 60px;
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

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
`;

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
    height: 150px;
    object-fit: cover;
    display: flex;
    flex-direction: column;
    position: relative;
  }
`;
