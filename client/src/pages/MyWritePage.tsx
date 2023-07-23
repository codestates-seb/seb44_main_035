import styled from "styled-components";
const MyWritePage = () => {
  return (
    <StyledWrapper>
      <AppBox>
        <ListBox>
          <Box>
            <Image></Image>
            <Title></Title>
          </Box>
        </ListBox>
      </AppBox>
    </StyledWrapper>
  );
};
export default MyWritePage;
const StyledWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(241, 241, 241, 0.5);
`;

const AppBox = styled.div`
  background-color: white;
  max-width: 420px;
  width: 100%;
  height: 100%;
  position: relative;
  /* overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  } */
`;
const ListBox = styled.div``;
const Box = styled.div`
  width: 346px;
  height: 139px;
  background-color: rgba(231, 231, 231, 0);
`;
const Image = styled.div``;
const Title = styled.div``;
