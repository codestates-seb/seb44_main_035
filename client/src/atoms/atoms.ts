import { atom } from "recoil";

/* ----- 재료 아이템의 상태 -----  */
export const ingreItemAtom = atom<string[]>({
  key: "ingreItemAtom",
  default: [],
});
