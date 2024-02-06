import { atom } from "recoil";

export const weatherState = atom({
  key: "weatherState",
  default: {
    temp : 0,
    weather : ''
  }
})