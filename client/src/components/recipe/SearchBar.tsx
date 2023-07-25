import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// interface Props {
//   setSearch: React.Dispatch<React.SetStateAction<void>>;
//   search: string;
// }

function SearchBar() {
  // const { keyword } = useParams();
  const navigate = useNavigate();

  //입력값(검색어)
  const [search, setSearch] = useState("");

  //엔터 누르면 searchCheck 호출
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) {
      navigate(`/recipes`);
      alert("검색어를 입력해주세요.");
    } else {
      const findValue = document.getElementsByTagName("input")[0].value;
      return navigate(`/recipes/search/${search}`, {
        state: findValue,
      });
    }
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!search) {
      navigate(`/recipes`);
      alert("검색어를 입력해주세요.");
    } else {
      const findValue = document.getElementsByTagName("input")[0].value;
      return navigate(`/recipes/search/${search}`, {
        state: findValue,
      });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <SearchWrapper>
      <form className="search_form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="search_input"
          placeholder="요리명을 검색해주세요"
          defaultValue={search}
          onChange={onChange}
          onKeyUp={handleKeyUp}
        ></input>
        <IoSearch
          className="search_icon"
          onClick={handleClick}
          type="submit"
        ></IoSearch>
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
