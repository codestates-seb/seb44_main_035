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

const ButtonWrapper = styled.div`
  text-align: right;
  margin-bottom: 100px;

  .pencil-icon {
    width: 5rem;
    height: 5rem;
    color: grey;
  }
`;

export default CreateButton;
