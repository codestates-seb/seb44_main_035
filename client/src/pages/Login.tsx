import FacebookLoginButton from "../components/login/FacebookLoginButton";
import GoogleLoginButton from "../components/login/GoogleLoginButton";
import KakaoLoginButton from "../components/login/KakaoLoginButton";
import GuestLoginButton from "../components/login/GuestLoginButton";
import LoginLogo from "../components/login/LoginLogo";
import { Container, ContentBox, BottonBox } from "../styles/SocailLoginStyles";

function Login() {
  return (
    <Container>
      <ContentBox>
        <LoginLogo />
        <BottonBox>
          <FacebookLoginButton />
          <GoogleLoginButton />
          <KakaoLoginButton />
          <GuestLoginButton />
        </BottonBox>
      </ContentBox>
    </Container>
  );
}

export default Login;
