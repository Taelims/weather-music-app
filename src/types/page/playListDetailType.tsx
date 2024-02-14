export type playListItem= {
  videoId: string
  title: string
  url: string
}

export interface playList {
  playListName: string,
  item: playListItem[]
}
