import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, Key } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

export interface Recipes {
  recipe_id: number;
  name: string;
  view: number;
  likes: number;
  img: string;
}

export interface RecipeList {
  recipes: Recipes[];
}

function RecipeCard() {
  //무한스크롤
  const [data, setData] = useState<RecipeList[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const apiUrl = "http://localhost:5173/moks/recipe.json";
  const [ref, inView] = useInView();

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
      const response = await axios.get(`${apiUrl}?page=${currentPage}`);
      // const response = await axios.get(`${apiUrl}?page=${currentPage}`);
      console.log(response);
      const newItems: RecipeList[] = response.data;

      // 기존 데이터와 새로운 데이터 합치기
      setData((prevData) => [...prevData, ...newItems]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const navigate = useNavigate();
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

  return (
    <>
      <div>Recipes</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {recipes && (
        <ul>
          <Wrapper>
            {data.map((recipe: any, index: Key | null | undefined) => (
              <>
                <Component>
                  <Link to={`/recipes/${recipe.recipe_id}`}>
                    <li key={index}>
                      <img className="img" alt="img" src={recipe.img} />
                      <div className="name">{recipe.name}</div>
                      <div className="view">view: {recipe.view}</div>
                      <div className="likes">likes: {recipe.likes}</div>
                    </li>
                  </Link>
                </Component>
              </>
            ))}
          </Wrapper>
        </ul>
      )}
      <div ref={ref}></div>
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

export default RecipeCard;
