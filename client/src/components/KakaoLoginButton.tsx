import { KakaoButton, KakaoIcon } from '../styles/SocailLoginStyles';
import { handleLoginClick } from '../services/Login';

const path = '/auth/kakao';

function KakaoLoginButton() {
  return (
    <KakaoButton onClick={() => handleLoginClick(path)}>
      <KakaoIcon />
      Kakao Login
    </KakaoButton>
  );
}

export default KakaoLoginButton;
