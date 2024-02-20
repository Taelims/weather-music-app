import axios from 'axios';
import { useRecoilState } from 'recoil'
import { userState } from '../store/atom/userState'
import { UserState } from '../types/state/stateType'
import { loginRes } from '../types/components/ModalComType'


export const useSignInUp = () => {
  const [user, setUser] = useRecoilState<UserState>(userState);
  const login = async (id: string, password: string) => {
    const response: loginRes = await axios.post('/api/login', { id, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    setUser({ id: id , playList: []})
  };

  const createAccount = async (id: string, password: string) => {
    await axios.post('/api/create/account', { id, password });
  };

  return {
    login,
    createAccount
  };
};