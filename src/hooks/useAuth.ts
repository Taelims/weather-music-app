import axios from 'axios';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil'
import { userState } from '../store/atom/userState'
import { UserState } from '../types/state/stateType'
import { modalState } from '../store/atom/modalState'


export const useAuth = () => {
  const setUser = useSetRecoilState<UserState>(userState);
  const setShow = useSetRecoilState<boolean>(modalState)
  const token: string = localStorage.getItem('token')!;

  const getUserData = async (token: string) => {
    try {
      const res = await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(res.data){
        console.log(res)
      }else {
        localStorage.removeItem('token');
        setUser({
          id : '' ,
          playList: []
        })
        setShow(true)
      }
    } catch (error) {
      console.error(error);
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