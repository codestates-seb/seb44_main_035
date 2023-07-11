import { GoogleButton, GoogleIcon } from "../styles/SocailLoginStyles";
import { handleLoginClick } from "../services/Login";

const path = "/oauth2/authorization/google";

function GoogleLoginButton() {
  return (
    <GoogleButton onClick={() => handleLoginClick(path)}>
      <GoogleIcon />
      Google Login
    </GoogleButton>
  );
}

export default GoogleLoginButton;
