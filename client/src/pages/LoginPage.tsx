import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLogo from "../components/Main/MainLogo";
import styled from "styled-components";
import axios from "axios";
/* ----- 로그인, 유저 타입 -----  */
export interface LoginInput {
  email: string;
  password: string;
}

export interface Validation {
  username: string;
  nickname: string;
  email: string;
  password: string;
  checkPassword: string;
}
const loginInput: LoginInput = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const [randomId, setRandomId] = useState("");
  const [loginState, setLoginState] = useState(loginInput);
  const url = `${import.meta.env.VITE_API_URL}/login`;
  const navigate = useNavigate();
  //TODO 라우트 연결
  const handleNavigate = () => {
    navigate("/Signup");
  };

  //통신
  const login = async (loginState: LoginInput) => {
    try {
      const response = await axios.post(url, loginState);
      //   const { authorization: Authorization, refresh: Refresh } =
      //     response.headers;
      const Authorization = response.headers.authorization;
      const Refresh = response.headers.refresh;

      sessionStorage.setItem(
        "token",
        JSON.stringify({
          access: Authorization,
          refresh: Refresh,
        })
      );

      sessionStorage.setItem(
        "user",
        JSON.stringify({
          email: response.data.email,
        })
      );

      navigate("/");
    } catch (error) {
      alert("가입되지 않은 유저입니다.");
    }
  };

  //입력 됐는지 검사
  const handleLogin = () => {
    if (!loginState.email) {
      alert("email을 입력해 주세요.");
      return;
    }

    if (!loginState.password) {
      alert("Password를 입력해 주세요.");
      return;
    }
  };

  const handleInputChange = (key: keyof LoginInput, value: string) => {
    setLoginState({
      ...loginState,
      [key]: value,
    });
  };

  const handleInputKeyDown =
    (handleLogin: () => void) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleLogin();
      }
    };
  const handleguest = async () => {
    try {
      const response = await axios.get(`${url}/random-id`); // 'url'은 랜덤 아이디를 제공하는 API 엔드포인트의 URL로 대체해야 합니다.
      setRandomId(response.data.randomId);
    } catch (error) {
      console.error("랜덤 아이디 가져오기 실패:", error);
      setRandomId("랜덤 아이디를 가져오는데 실패했습니다.");
    }
  };

  return (
    <StyledWrapper>
      <AppBox>
        <LogoBox>
          <Logo>
            <Font>냉 파 고</Font>
            <SubFont>우리집 냉장고 파먹기 솔루션</SubFont>
          </Logo>
        </LogoBox>
        <MainBox>
          <EmailInput
            type="text"
            placeholder="email"
            value={loginState.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("email", e.target.value)
            }
            onKeyDown={handleInputKeyDown(handleLogin)}
          />
          <PasswordInput
            type="password"
            placeholder="password"
            value={loginState.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("password", e.target.value)
            }
            onKeyDown={handleInputKeyDown(handleLogin)}
          />
          <LoginBox onClick={handleLogin}>로그인</LoginBox>
          <LoginBox onClick={handleNavigate}>회원가입</LoginBox>
        </MainBox>
      </AppBox>
    </StyledWrapper>
  );
};
export default LoginPage;

const StyledWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(241, 241, 241, 0.5);
`;

const AppBox = styled.div`
  background-color: rgba(209, 232, 238, 1);
  max-width: 420px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const MainBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  border-radius: 5% 5% 0 0;
  width: 100%;
  height: 80%;
  padding: 30px;
  margin-bottom: 60px;
`;

const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  width: 300px;
  height: 62px;
  background-color: rgba(134, 154, 177, 1);
  border-radius: 20px;
  font-size: large;
  color: white;
`;

const EmailInput = styled.input`
  margin: 10px;
  width: 300px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #d6d9dc;
  padding: 4px;
`;

const PasswordInput = styled.input`
  margin: 10px;
  width: 300px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #d6d9dc;
  padding: 4px;
`;
const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20%;
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
