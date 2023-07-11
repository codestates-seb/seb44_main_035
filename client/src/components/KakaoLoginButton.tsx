import { KakaoButton, KakaoIcon } from "../styles/SocailLoginStyles";
import { handleLoginClick } from "../services/Login";

const path = "/oauth2/authorization/kakao";

function KakaoLoginButton() {
  return (
    <KakaoButton onClick={() => handleLoginClick(path)}>
      <KakaoIcon />
      Kakao Login
    </KakaoButton>
  );
}

export default KakaoLoginButton;
