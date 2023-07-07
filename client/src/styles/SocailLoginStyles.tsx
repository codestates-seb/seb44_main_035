import styled from 'styled-components';
import { FaComment } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ContentBox = styled.div``;

export const BottonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:not(:last-child) {
    margin-bottom: 15px;
  }
`;

export const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 200px;
  max-width: 250px;
  height: 56px;
  padding: 0;
  background-color: #fee500;
  border: 1px solid transparent;
  border-radius: 3px;
  line-height: 44px;
  text-align: center;
  color: #3c1e1e;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5d600;
  }
`;

export const KakaoIcon = styled(FaComment)`
  font-size: 1.5rem;
  margin-right: 5px;
`;

export const GoogleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 200px;
  max-width: 250px;
  height: 56px;
  background-color: #ffffff;
  color: black;
  font-size: 16px;
  border-radius: 2px;
  border: 1px solid rgb(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const GoogleIcon = styled.span`
  background: url('https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg')
    no-repeat;
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
  background-size: cover;
  margin-right: 10px;
`;

export const FacebookButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4267b2;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  width: 100%;
  min-width: 200px;
  max-width: 250px;
  height: 56px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #34519d;
  }
`;

export const FacebookIcon = styled(FaFacebookF)`
  margin-right: 5px;
  font-size: 1.5rem;
`;
export const GuestButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #525252;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  width: 100%;
  min-width: 200px;
  max-width: 250px;
  height: 56px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #424242;
  }
`;
