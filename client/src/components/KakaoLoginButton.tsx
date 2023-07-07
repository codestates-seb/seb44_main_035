import axios from 'axios';
import { KakaoButton, KakaoIcon } from '../styles/SocailLoginStyles';

function KakaoLoginButton() {
  const handleLoginClick = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auth/kakao');
      window.location.href = response.data.url;
    } catch (error) {
      console.error('로그인 요청 중 에러가 발생했습니다.', error);
    }
  };
  return (
    <KakaoButton onClick={handleLoginClick}>
      <KakaoIcon />
      Kakao Login
    </KakaoButton>
  );
}

export default KakaoLoginButton;
