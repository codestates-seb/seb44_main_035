import styled from "styled-components";
import { BsArrowLeftCircle } from "react-icons/bs";

function BackButton() {
  return (
    <IconContainer>
      <BsArrowLeftCircle className="icon" />
    </IconContainer>
  );
}

const IconContainer = styled.span`
  .icon {
    width: 2rem;
    height: 2rem;
    color: darkgray;
  }
`;

export default BackButton;
