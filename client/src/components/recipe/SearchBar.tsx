import styled from "styled-components";
import { IoSearch } from "react-icons/io5";

function SearchBar() {
  return (
    <SearchWrapper>
      <form className="search_form">
        <input
          type="text"
          className="search_input"
          placeholder="요리명을 검색해주세요"
        ></input>
        <IoSearch className="search_icon" />
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
