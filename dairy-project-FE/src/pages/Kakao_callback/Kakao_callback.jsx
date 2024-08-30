import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Kakao_callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL에서 'code' 쿼리 파라미터를 가져오는 함수
  const getCode = () => searchParams.get('code');

  useEffect(() => {
    const code = getCode();
    console.log(code);
    navigate('/');
  }, []);

  return <div>Kakao_callback</div>;
}

export default Kakao_callback;
