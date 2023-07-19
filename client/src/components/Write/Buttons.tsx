import styled from "styled-components";

const Buttons = () => {
  return (
    <BtnContainer>
      <SaveBtn>저장하기</SaveBtn>
      <CancelBtn>취소하기</CancelBtn>
    </BtnContainer>
  );
};

export default Buttons;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const SaveBtn = styled.button`
  width: 139px;
  height: 63px;
  border-radius: 20px;
  background-color: rgba(96, 150, 255, 1);
  color: white;
  margin-right: 15px;
`;
const CancelBtn = styled.button`
  width: 139px;
  height: 63px;
  border-radius: 20px;
  background-color: rgba(255, 118, 118, 1);
  color: white;
  margin-left: 15px;
`;
