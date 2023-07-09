import { useRecoilState } from "recoil";
import styled from "styled-components";
import { FaCircleXmark } from "react-icons/fa6";
import { ingreItemAtom } from "../atoms/atoms";

const BasketItem = () => {
  const [ingreState, setIngreState] = useRecoilState(ingreItemAtom);

  const handleDeleteClick = (el: string) => {
    const updatedIngreState = ingreState.filter((item) => item !== el);
    setIngreState(updatedIngreState);
  };

  return (
    <>
      {ingreState.length === 0 && <Font>재료를 추가해 주세요.</Font>}
      {ingreState.map((el) => (
        <IngreItem key={el}>
          <LeftElements>{el}</LeftElements>
          <RightElements>
            <FaCircleXmark size="20px" onClick={() => handleDeleteClick(el)} />
          </RightElements>
        </IngreItem>
      ))}
    </>
  );
};

export default BasketItem;

const Font = styled.p`
  font-size: large;
  font-weight: 200px;
  color: white;
`;

const IngreItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 56px;
  background-color: rgba(245, 241, 233, 1);
  color: rgba(105, 100, 100, 1);
  border-radius: 10px;
`;
const RightElements = styled.button`
  width: 40px;
  padding: 10px;
  border: none;
`;
const LeftElements = styled.div`
  text-align: left;
  width: 150px;
  font-size: 18px;
  margin-left: 10px;
`;
