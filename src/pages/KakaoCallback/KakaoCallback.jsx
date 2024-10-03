import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { client } from '../../axios/client';
import useLocalStorage from '../../hooks/useLocalStorage';

function KakaoCallback() {
  const [storedValue, setValue] = useLocalStorage('USER_TOKEN', null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL에서 'code' 쿼리 파라미터를 가져오는 함수
  const getCode = () => searchParams.get('code');

  // 액세스 토큰 요청
  const getUserToken = async () => {
    const code = getCode();

    if (!code) {
      alert('인가코드를 정상적으로 받아오지 못했습니다!');
      navigate('/sign-in');
    }

    try {
      const { data } = await client.get(`/oauth/token/?code=${code}`);

      const token = data;
      console.log('카카오 콜백에서 알림 : ', token, typeof token);

      if (!token) {
        alert('유효한 토큰이 아닙니다!');
        navigate('/sign-in');
      }

      try {
        setValue(token);
        navigate('/');
      } catch (err) {
        console.error('로컬스토리지에 토큰 저장 실패 : ', err);
      }
    } catch (err) {
      console.error('토큰 요청에 실패했습니다 ', err);
    }
  };

  useEffect(() => {
    getUserToken();
  }, []);

  return;
}

export default KakaoCallback;
