import axios from 'axios';

export const handleLoginClick = async (path: string) => {
  try {
    const response = await axios.get(
      `https://ec2-3-34-241-235.ap-northeast-2.compute.amazonaws.com${path}`
    );
    window.location.href = response.data.url;
  } catch (error) {
    alert('로그인 요청 중 에러가 발생했습니다.');
  }
};
