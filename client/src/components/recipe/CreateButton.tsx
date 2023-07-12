import styled from "styled-components";
import { PiPencilCircle } from "react-icons/pi";

function CreateButton() {
  return (
    <ButtonWrapper>
      <PiPencilCircle className="pencil-icon" />
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
