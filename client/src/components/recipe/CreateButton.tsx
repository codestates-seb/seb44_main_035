import styled from "styled-components";
import { PiPencilCircle } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function CreateButton() {
  const navigate = useNavigate();

  return (
    <ButtonWrapper>
      <PiPencilCircle
        className="pencil-icon"
        onClick={() => {
          navigate("/create-recipe");
        }}
      />
      {/* <span className="write-button" onClick={() => navigate("/create-recipe")}>
        레시피 작성
      </span> */}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.span`
  text-align: right;

  /* .write-button {
    background-color: #d4f4fa;
    height: 30px;
    width: 60px;
    text-align: center;
    border-radius: 40px;
    padding: 3px 0;
  } */

  .pencil-icon {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    color: grey;
  }
`;

export default CreateButton;
