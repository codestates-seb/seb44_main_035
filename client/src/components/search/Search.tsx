import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { RecipeProps } from "../detail/RecipeDetail";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Props {
  // recipes: RecipeProps[];
  search: string;
  setSearch: (e: string) => void;
  state: string;
}

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  //검색어
  const [search, setSearch] = useState("");

  //검색 목록 담을 곳
  const [searchResult, setSearchResult] = useState<RecipeProps[]>([]);
  const searchWord = location.state;

  useEffect(() => {
    setSearch(searchWord); //state에 검색어 저장
    axios
      .get("http://localhost:5173/moks/recipe.json")
      // .get(`/recipes/${keyword? 'find/underbar': 'findbyname/{recipe-name} })
      .then((res) => setSearchResult(res.data))
      .catch(() => {
        console.log("에러입니다");
      });
  }, [searchWord]); //searchWord 변경될 때 렌더링

  console.log(searchResult);
  if (Array.isArray(searchResult)) {
    const filteredResult = searchResult.filter((item) => {
      return item.name.includes(search);
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
                      navigate(`/recipes/${item.recipe_id}`);
                    }}
                  >
                    <img className="img" alt="img" src={item.img} />
                    <div className="name">{item.name}</div>
                    <div className="view">view: {item.view}</div>
                    <div className="likes">likes: {item.likes}</div>
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
