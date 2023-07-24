import axios from "axios";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CreateButton from "./CreateButton";
import { useNavigate } from "react-router-dom";

export interface RecipeList {
  recipeId: number;
  recipeName: string;
  recipeImg: string;
  recommendCount: number;
}

function RecipeCard() {
  //무한스크롤
  const navigate = useNavigate();
  // const { keyword } = useParams();
  const [data, setData] = useState<RecipeList[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getData = async (page: any) => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/recipes/find/underbar/?page=${page}&size=20`
    );
    const data = await res.data.data;
    setData((prev) => [...prev, ...data]);
    setLoading(true);
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const pageEnd = useRef<any>();

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  return (
    <>
      <TitleWrapper>
        <span className="recipesTitle"> 🍽️ 전체 레시피 조회 🍽️</span>
        <CreateButton />
      </TitleWrapper>
      <ul>
        <RecipeWrapper>
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
        </RecipeWrapper>
        <InfiniteScroll ref={pageEnd} />
      </ul>
    </>
  );
}

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

const RecipeWrapper = styled.section`
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

const InfiniteScroll = styled.div``;

export default RecipeCard;
