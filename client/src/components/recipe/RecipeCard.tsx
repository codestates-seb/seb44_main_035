import axios from "axios";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/constants";
import { useInView } from "react-intersection-observer";

export interface RecipeList {
  recipeId: number;
  recipeName: string;
  recipeImg: string;
  recommendCount: number;
}

function RecipeCard() {
  //무한스크롤

  const { ref, inView } = useInView();
  const loadMoreItems = async () => {};

  useEffect(() => {
    if (inView) {
      loadMoreItems();
    }
  });

  const navigate = useNavigate();

  const { keyword } = useParams();
  const [data, setData] = useState<RecipeList[]>([]);
  const getData = async () => {
    try {
      const res = await axios.get(BASE_URL + "recipes/find/underbar");

      setData(res.data.data);
    } catch (error) {
      console.log("에러입니다");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="recipesTitle">레시피 조회 🥘</div>
      {/* {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {recipes && ( */}
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
    </>
  );
  <div ref={ref} />;
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
