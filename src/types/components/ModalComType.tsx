export interface LogInModalPropsType {
  formName : string
  onHide: () => void;
  signModalShow: boolean;
}

export interface LogInFormType {
  id: string;
  password: string;
}