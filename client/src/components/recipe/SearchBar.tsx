import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SearchBar() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); //input에 넣을 검색어
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/recipes/findbyname/{recipe-name}`);
  };

  useEffect(() => setSearch(keyword || ""), [keyword]);

  return (
    <SearchWrapper>
      <form className="search_form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search_input"
          placeholder="요리명을 검색해주세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <IoSearch className="search_icon"></IoSearch>
      </form>
    </SearchWrapper>
  );
}

const SearchWrapper = styled.span`
  width: 80%;
  height: 2.5rem;
  border: solid 1px black;
  border-radius: 10px;
  display: inline-block;
  background-color: rgba(241, 241, 241, 0.5);

  .search_form {
    display: inline;
    justify-content: center;
    align-items: center;
  }

  .search_input {
    border: none;
    background-color: rgba(241, 241, 241, 0.5);
    width: 90%;
    height: 100%;
    padding-left: 10px;
  }

  .search_icon {
    color: grey;
  }
`;

export default SearchBar;
