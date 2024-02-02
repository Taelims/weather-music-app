import { atom } from "recoil";

export const playListState = atom({
  key: "playListState",
  default: {
    items: [
      {
        id: {
           videoId : ''
        },
        snippet: {
          title: '',
          thumbnails: {
            medium: {
              url: ''
            }
          }
        }
      }
    ],
  }
})