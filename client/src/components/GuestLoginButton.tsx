import axios from 'axios';
import { GuestButton } from '../styles/SocailLoginStyles';

function GuestLoginButton() {
  const handleLoginClick = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auth/guest');
      window.location.href = response.data.url;
    } catch (error) {
      console.error('로그인 요청 중 에러가 발생했습니다.', error);
    }
  };
  return <GuestButton onClick={handleLoginClick}>Guest Login</GuestButton>;
}

export default GuestLoginButton;
