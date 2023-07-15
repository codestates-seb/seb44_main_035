import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useCallback, useEffect } from "react";
import recipe_list from "../../../public/moks/recipe.json";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export interface RecipeProps {
  recipe: {
    img: string;
    name: string;
    view: number;
    likes: number;
  };
}

function Recipes() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: recipes,
    //data를 recipes라고 해줌
    //key 이름 아래에 데이터 보관
    //원하는 세부 상태 별로 다양한 상태 조합해서 사용
  } = useQuery(["recipes", keyword], async () => {
    //데이터 가져오는 함수
    return (
      axios
        .get("http://localhost:5173/moks/recipe.json")
        // .get(`/recipes/${keyword? 'find/underbar': 'findbyname/{recipe-name} })
        .then((res) => res.data)
        .catch(() => {
          console.log("에러입니다");
        })
    );
  });

  //무한스크롤
  const [itemIndex, setItemIndex] = useState(0); //아이템 순서
  const [result, setResult] = useState(recipe_list.slice(0, 16)); //초기값: 16개 + 렌더링할 데이터 담기

  const fetchMoreData = async () => {
    setItemIndex(itemIndex + 16);
    setResult(result.concat(recipe_list.slice(itemIndex + 16, itemIndex + 32)));
  };

  const infiniteScroll = useCallback(() => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      fetchMoreData();
    }
  }, [itemIndex, result]);

  useEffect(() => {
    document.body.addEventListener("scroll", infiniteScroll, true);
    return () =>
      document.body.removeEventListener("scroll", infiniteScroll, true); //useEffect 실행 전 실행
  }, [infiniteScroll]);

  return (
    <>
      <div>Recipes</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {recipes && (
        <ul>
          <Wrapper>
            {recipes.map((e: any) => (
              <>
                <Component>
                  <li>
                    <img className="img" alt="img" src={e.img} />
                    <div className="name">{e.name}</div>
                    <div className="view">view: {e.view}</div>
                    <div className="likes">likes: {e.likes}</div>
                  </li>
                </Component>
              </>
            ))}
          </Wrapper>
        </ul>
      )}
    </>
  );
}

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Component = styled.div`
  width: 100%;
  padding: 10px;

  .img {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
`;

export default Recipes;
