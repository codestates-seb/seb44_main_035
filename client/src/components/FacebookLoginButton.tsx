import { FacebookButton, FacebookIcon } from '../styles/SocailLoginStyles';
import { handleLoginClick } from '../services/Login';

const path = '/auth/facebook';

function FacebookLoginButton() {
  return (
    <FacebookButton onClick={() => handleLoginClick(path)}>
      <FacebookIcon />
      Facebook Login
    </FacebookButton>
  );
}

export default FacebookLoginButton;
