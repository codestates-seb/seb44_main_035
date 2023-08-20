import styled from "styled-components";
import { IoMdCloseCircle } from "react-icons/io";

interface HelpModalProps {
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <StyledWrapper>
      <AppBox>
        <Modal>
          <div className="modalContent">
            <IoMdCloseCircle className="closeButton" onClick={onClose} />
          </div>
          <Body>
            <div className="firstBox">
              <p>1️⃣ 선택 재료에 담기</p>
              <p>꼭 사용하고 싶은 재료를 클릭해보세요.</p>
              <p>재료를 클릭하면, 선택 재료에 담기게 됩니다.</p>
            </div>
            <HelpTextBox>
              <HelpText>
                <p> 2️⃣ 냉장고 속 재료를 </p>
                <p> 1개 이상 포함한 레시피를 보여줍니다. </p>
              </HelpText>
              <HelpText>
                <p> 3️⃣ 선택한 재료를 </p>
                <p> 모두 포함한 레시피를 보여줍니다. </p>
              </HelpText>
            </HelpTextBox>
          </Body>
        </Modal>
      </AppBox>
    </StyledWrapper>
  );
};

export default HelpModal;

const StyledWrapper = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  z-index: 1;
  background-color: rgba(241, 241, 241, 0.5);
`;

const AppBox = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  max-width: 420px;
  width: 100%;
  height: 100%;
  position: relative;
  .closeButton {
    float: right;
    margin: 2px;
    color: black;
    font-size: 30px;
    cursor: pointer;
  }
`;

const Body = styled.div`
  font-size: 15px;
  padding-top: 80%;
  width: 100%;
  height: 80%;
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .firstBox {
    background-color: white;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Modal = styled.div`
  float: right;
  margin: 5px;
  color: black;
  font-size: 32px;
  cursor: pointer;
`;

const HelpText = styled.div`
  background-color: #ffffff;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  margin-top: 95%;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

const HelpTextBox = styled.div`
  display: flex;
`;
