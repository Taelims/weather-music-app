import { atom } from "recoil";

export const itemState = atom({
  key: "itemState",
  default: [{
    id : '',
    title: '',
    subTitle: '',
    text: '',
  }]
})