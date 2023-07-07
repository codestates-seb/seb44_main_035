import styled from 'styled-components';

const LoginLogo = () => {
  return (
    <LogoBox>
      <Logo>
        <Font>냉 파 고</Font>
        <SubFont>우리집 냉장고 파먹기 솔루션</SubFont>
      </Logo>
    </LogoBox>
  );
};

export default LoginLogo;

const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20%;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(245, 241, 233, 1);
  margin-bottom: 30px;
`;

const Font = styled.p`
  font-weight: bold;
  font-size: 30px;
  color: rgba(61, 80, 103, 1);
`;

const SubFont = styled.p`
  font-weight: bold;
  color: rgba(61, 80, 103, 1);
`;
