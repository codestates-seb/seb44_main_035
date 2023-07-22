import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/constants";

export interface RecipeList {
  recipeId: number;
  recipeName: string;
  recipeImage: string;
  recommendCount: number;
}

function Search() {
  const { keyword } = useParams();
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
      .get(BASE_URL + "recipes/find/underbar")
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
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  li {
    list-style: none;
  }
`;

export default Search;
