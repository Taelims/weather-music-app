import axios from 'axios';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil'
import { userState } from '../store/atom/userState'
import { loginRes } from '../types/components/ModalComType'


export const useAuthQuery = () => {
  const [user, setUser] = useRecoilState(userState);

  const getUserData = async (token: string| null) => {
    try {
      const response: loginRes = await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
      setUser({ id : '' , password: ''})
    }
  };

  const fetchUserData = async () => {
    try {
      const token: string | null = localStorage.getItem('token');
      const userData: {token:string} | undefined = await getUserData(token);
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  return useQuery('userInfo', fetchUserData, {
  });
};