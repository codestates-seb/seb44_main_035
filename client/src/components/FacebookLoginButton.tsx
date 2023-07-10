import axios from 'axios';
import { FacebookButton, FacebookIcon } from '../styles/SocailLoginStyles';

function FacebookLoginButton() {
  const handleLoginClick = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auth/facebook');
      window.location.href = response.data.url;
    } catch (error) {
      console.error('로그인 요청 중 에러가 발생했습니다.', error);
    }
  };

  return (
    <FacebookButton onClick={handleLoginClick}>
      <FacebookIcon />
      Facebook Login
    </FacebookButton>
  );
}

export default FacebookLoginButton;
