import styled from "styled-components";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <IconContainer>
      <BsArrowLeftCircle
        className="icon"
        onClick={() => {
          navigate(-1);
        }}
      />
    </IconContainer>
  );
}

const IconContainer = styled.span`
  .icon {
    width: 2rem;
    height: 2rem;
    color: darkgray;
    cursor: pointer;
  }
`;

export default BackButton;
