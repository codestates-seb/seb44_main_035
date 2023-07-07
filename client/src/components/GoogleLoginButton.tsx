import axios from 'axios';
import { GoogleButton, GoogleIcon } from '../styles/SocailLoginStyles';

const GoogleLoginButton = () => {
  const handleLoginClick = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auth/google');
      window.location.href = response.data.url;
    } catch (error) {
      console.error('로그인 요청 중 에러가 발생했습니다.', error);
    }
  };

  return (
    <GoogleButton onClick={handleLoginClick}>
      <GoogleIcon />
      Google Login
    </GoogleButton>
  );
};

export default GoogleLoginButton;
