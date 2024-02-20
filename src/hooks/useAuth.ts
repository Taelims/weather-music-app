import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { userState } from '../store/atom/userState'

const useFetchUserData = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const getUserData = async (token: any) => {
      try {
        const response = await axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    };

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await getUserData(token);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setUser]);

  return user;
};

export default useFetchUserData;