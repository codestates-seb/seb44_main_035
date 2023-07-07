import FacebookLoginButton from '../components/FacebookLoginButton';
import GoogleLoginButton from '../components/GoogleLoginButton';
import KakaoLoginButton from '../components/KakaoLoginButton';
import GuestLoginButton from '../components/GuestLoginButton';
import LoginLogo from '../components/LoginLogo';
import { Container, ContentBox, BottonBox } from '../styles/SocailLoginStyles';

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
