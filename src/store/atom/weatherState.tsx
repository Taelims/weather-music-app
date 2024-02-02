import { atom } from "recoil";

export const weatherState = atom({
  key: "weatherState",
  default: {
    weather: [
      {
        main: ''
      }
    ],
    main: {
      temp: 0
    }
  }
})