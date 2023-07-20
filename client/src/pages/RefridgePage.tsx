import React from "react";

export default function RefridgePage() {
  //장바구니에 재료 없는 경우, 냉장고 속 재료 하나라도 있으면 뿌려주기
  //재료 추가 (post) 후에 메인에서 다시 get해서 냉장고에 있는 재료를 담아오는 방식 ...
  //냉장고에 담긴 재료 = ingreList (post) -> 유저 아이디랑 같이 가져오기

  const findRefridge = async () => {
    //냉장고에 담긴 재료 레시피 조회
  };

  return <div>RefridgePage</div>;
}
