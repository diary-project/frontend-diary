// fetchUserData.js
import { useNavigate } from 'react-router-dom';
import { client } from '../axios/client';
import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

const useFetchUserData = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [storedValue] = useLocalStorage('USER_TOKEN', null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!storedValue || !storedValue.access) {
      console.error('토큰이 없습니다.');
      navigate('/sign-in');
      return;
    }

    const token = storedValue.access.replace(/\"/gi, '');

    const fetchUserData = async () => {
      try {
        const res = await client.get('/user/nickname', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(res.data);
      } catch (err) {
        console.error('유저 데이터를 fetch 하는데 실패했습니다. : ', err);
        navigate('/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [storedValue]);

  return { userData, isLoading, storedValue };
};

export default useFetchUserData;
