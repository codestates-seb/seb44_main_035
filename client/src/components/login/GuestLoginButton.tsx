import { GuestButton } from "../../styles/SocailLoginStyles";
import { useNavigate } from "react-router-dom";

function GuestLoginButton() {
  const navigate = useNavigate();
  return <GuestButton onClick={() => navigate("/")}>Guest Login</GuestButton>;
}

export default GuestLoginButton;
