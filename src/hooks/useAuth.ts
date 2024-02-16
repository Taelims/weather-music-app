import axios from 'axios';
import { useQuery } from 'react-query';


export const useAuth = () => {
  const token = localStorage.getItem('token');

  return useQuery('userInfo', async () => {
    const response = await axios.get('/api/auth', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }, {
    enabled: !!token,
    refetchOnWindowFocus: false
  });
};