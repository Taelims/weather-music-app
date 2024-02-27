import axios from 'axios';
import { useSetRecoilState } from 'recoil'
import { userAtom } from '../store/atom/userAtom'
import { UserAtomType } from '../types/state/AtomType'


export const useSignInUp = () => {
  const setUser = useSetRecoilState<UserAtomType>(userAtom);
  const login = async (id: string, password: string) => {
    const data: {token : string} = await axios.post('/api/login', { id, password });
    const token : string = data.token;
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