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
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.span`
  text-align: right;

  .pencil-icon {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    color: grey;
  }
`;

export default CreateButton;
