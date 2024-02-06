import { atom } from "recoil";

export const weatherPlayListState = atom({
  key: "weatherPlayListState",
  default: {
    item: [
      {
        videoId : '',
        title: '',
        url: ''
      },
    ],
  }
})

export const categoryPlayListState = atom({
  key: "categoryPlayListState",
  default: {
    item: [
      {
        videoId : '',
        title: '',
        url: ''
      },
    ],
  }
})