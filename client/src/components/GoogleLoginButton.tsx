import { GoogleButton, GoogleIcon } from '../styles/SocailLoginStyles';
import { handleLoginClick } from '../services/Login';

const path = '/auth/google';

function GoogleLoginButton() {
  return (
    <GoogleButton onClick={() => handleLoginClick(path)}>
      <GoogleIcon />
      Google Login
    </GoogleButton>
  );
}

export default GoogleLoginButton;
