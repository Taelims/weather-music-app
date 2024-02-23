export interface BoardPropsType {
  onHide: () => void;
  boardModalShow: boolean;
}

export interface BoardFormInfo {
  id : string,
  title : string,
  text: string,
  addDate: string,
}

export type loginRes = {
  data : {
    token : string
  }
}