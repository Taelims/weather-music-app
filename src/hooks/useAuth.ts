import axios from 'axios';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil'
import { userAtom } from '../store/atom/userAtom'
import { UserAtomType } from '../types/state/AtomType'
import { modalShowAtom } from '../store/atom/modalShowAtom'
import Swal from 'sweetalert2'


export const useAuth = () => {
  const setUser = useSetRecoilState<UserAtomType>(userAtom);
  const setShow = useSetRecoilState<boolean>(modalShowAtom)
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
        await Swal.fire({
          icon: 'warning',
          title: '인증 오류',
          text: '로그인을 해주세요',
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