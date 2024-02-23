export interface ModalProps {
  formType : string
  onHide: () => void;
  signModalShow: boolean;
}

export interface formInfo {
  id: string;
  password: string;
}

export type loginRes = {
  data : {
    token : string
  }
}