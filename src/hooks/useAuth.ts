import axios from 'axios';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil'
import { userState } from '../store/atom/userState'
import { UserState } from '../types/state/stateType'


export const useAuth = () => {
  const setUser = useSetRecoilState<UserState>(userState);
  const token: string = localStorage.getItem('token')!;

  const getUserData = async (token: string) => {
    try {
      await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
      setUser({
        id : '' ,
        playList: []
      })
    }
  };

  const fetchUserData = async () => {
    try {
      if (token) {
        await getUserData(token);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return useQuery('userInfo', fetchUserData, {
    enabled: !!token,
  });
};