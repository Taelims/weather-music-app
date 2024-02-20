export interface ModalProps {
  formType : string
  onHide: () => void;
  show: boolean;
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