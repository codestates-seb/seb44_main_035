import styled from 'styled-components';

const KakaoButton = styled.button`
  width: 190px;
  height: 44px;
  padding: 0;
  background-color: #fee500;
  border: 1px solid transparent;
  border-radius: 3px;
  line-height: 44px;
  text-align: center;
  color: #3c1e1e;
  font-size: 16px;
  font-weight: bold;
`;

const KAKAO_CLIENT_ID: string = import.meta.env.VITE_KAKAO_CLIENT_ID || '';
const KAKAO_REDIRECT_URI: string =
  import.meta.env.VITE_KAKAO_REDIRECT_URI || '';

function KakaoLoginButton() {
  const handleClick = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return <KakaoButton onClick={handleClick}>Kakao Login</KakaoButton>;
}

export default KakaoLoginButton;
