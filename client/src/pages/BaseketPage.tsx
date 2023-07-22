import axios from "axios";
import { useRecoilState } from "recoil";
import { ingreItemAtom } from "../atoms/atoms";
import { BASE_URL } from "../constants/constants";
import { useEffect } from "react";

export default function BaseketPage() {
  // 장바구니에 재료가 있는 경우 => 장바구니 속 재료 모두 있는 레시피 뿌려주기
  // 선택된 재료 = 장바구니에 담긴 재료 = ingreState(get) -> 보내주신 대로 가져오기
  // http://localhost:8080/recipes/select?ingredients=양파&ingredients=마늘

  const [ingreState, setIngreState] = useRecoilState(ingreItemAtom);

  const searchBasket = async () => {
    try {
      const headers = {
        "ngrok-skip-browser-warning": "true",
      };
      const queryString = ingreState
        .map((ingre) => `ingredients=${encodeURIComponent(ingre)}`)
        .join("&");
      const url = BASE_URL + `recipes/select?${queryString}`;
      console.log(url);
      const response = await axios.get(url, { headers });

      // 서버로부터 받은 데이터를 처리합니다.
      console.log(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    searchBasket();
  }, []);

  return <div>BaseketPage</div>;
}
