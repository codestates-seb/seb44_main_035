import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CreateButton from "../recipe/CreateButton";

export interface RecipeList {
  recipeId: number;
  recipeName: string;
  recipeImage: string;
  recommendCount: number;
}

function Search() {
  // const { keyword } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  //검색어
  const [search, setSearch] = useState("");

  //검색 목록 담을 곳
  const [searchResult, setSearchResult] = useState<RecipeList[]>([]);
  const searchWord = location.state;
  console.log(searchWord);

  useEffect(() => {
    setSearch(searchWord); //state에 검색어 저장
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/recipes/findbyname?recipe-name=${searchWord}`
      )
      .then((res) => setSearchResult(res.data.data))
      .catch(() => {
        console.log("에러입니다");
      });
  }, [searchWord]); //searchWord 변경될 때 렌더링

  if (Array.isArray(searchResult)) {
    const filteredResult = searchResult.filter((item) => {
      return item.recipeName.includes(search);
    });
    return (
      <>
        <TitleWrapper>
          <div className="recipesTitle">
            {filteredResult.length > 0 ? (
              <div> 🔎 {searchWord} 검색결과 입니다 </div>
            ) : (
              <>
                <div> 검색 결과가 없습니다 🙁 </div>
                <div
                  className="recipe-button"
                  onClick={() => {
                    navigate("/recipes");
                  }}
                >
                  전체 레시피 보기
                </div>
              </>
            )}
          </div>
          <CreateButton />
        </TitleWrapper>

        <ul>
          <Wrapper>
            {filteredResult.map((item, index) => (
              <div key={index}>
                <>
                  <Component>
                    <li
                      onClick={() => {
                        navigate(`/recipes/${item.recipeId}`);
                      }}
                    >
                      <img className="img" alt="img" src={item.recipeImage} />
                      <div className="name">{item.recipeName}</div>
                    </li>
                  </Component>
                </>
              </div>
            ))}
          </Wrapper>
        </ul>
      </>
    );
  }
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
    height: 150px;
    object-fit: cover;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  li {
    list-style: none;
  }
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
  .recipe-button {
    margin-top: 10px;
    padding: 6px 0px;
    color: white;
    background-color: #626883;
    text-align: center;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default Search;
