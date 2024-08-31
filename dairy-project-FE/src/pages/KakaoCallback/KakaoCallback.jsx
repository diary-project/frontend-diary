import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { client } from '../../axios/client';
import useLocalStorage from '../../hooks/useLocalStorage';

function KakaoCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [setLocalStorage, getLocalStorage] = useLocalStorage();

  // URL에서 'code' 쿼리 파라미터를 가져오는 함수
  const getCode = () => searchParams.get('code');

  // 리프레시 토큰으로 새로운 엑세스 토큰 요청
  const updateToken = async (refreshToken) => {
    try {
      const { data } = await client.get(`/oauth/token/?code=${refreshToken}`);
      const status = await data.statusCode;

      if (status === 'SUCCESS') {
        const tokens = await data.data;
        setLocalStorage('USER_TOKEN', tokens);
        navigate('/');
      }
    } catch (err) {
      console.error('토큰 요청에 실패했습니다. ', err);
    }
  };

  // 엑세스 토큰 요청
  const getUserToken = async () => {
    const code = getCode();

    try {
      const { data } = await client.get(`/oauth/token/?code=${code}`);
      const status = await data.statusCode;

      if (status === 'SUCCESS') {
        const tokens = await data.data;
        setLocalStorage('USER_TOKEN', tokens);
        navigate('/');
      } else if (status === 'EXPIRED') {
        const tokens = getLocalStorage('USER_TOKEN');
        const refreshToken = tokens?.refresh_token;

        if (refreshToken) {
          updateToken(refreshToken);
        } else {
          console.error('리프레시 토큰이 없습니다.');
        }
      } else {
        console.error(`예상치 못한 상태 코드: ${status}`);
      }
    } catch (err) {
      console.error('토큰 요청에 실패했습니다 ', err);
    }
  };

  useEffect(() => {
    getUserToken();
  }, []);

  return <div>KakaoCallback</div>;
}

export default KakaoCallback;
