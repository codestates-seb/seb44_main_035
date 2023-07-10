import { FaHome, FaRegListAlt, FaUserCircle, FaLock } from 'react-icons/fa';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: #d9d9d9;
  border-radius: 15px 15px 0 0;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #3d5067;
`;

const BottomNavBar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  return (
    <NavBarContainer>
      <NavButton onClick={() => navigate('/recipes')}>
        <FaRegListAlt />
        <p>Recipes</p>
      </NavButton>
      <NavButton onClick={() => navigate('/home')}>
        <FaHome />
        <p>Home</p>
      </NavButton>
      {isLogin ? (
        <NavButton onClick={() => navigate('/mypage')}>
          <FaUserCircle />
          <p>MyPage</p>
        </NavButton>
      ) : (
        <NavButton onClick={() => navigate('/login')}>
          <FaLock />
          <p>Login</p>
        </NavButton>
      )}
    </NavBarContainer>
  );
};

export default BottomNavBar;
