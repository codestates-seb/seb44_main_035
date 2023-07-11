import axios from "axios";

export const handleLoginClick = async (path: string) => {
  try {
    const response = await axios.get(`https://mainproject.ddns.net${path}`);
    window.location.href = response.data.url;
  } catch (error) {
    alert("로그인 요청 중 에러가 발생했습니다.");
  }
};
