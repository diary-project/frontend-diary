import React, { useState } from 'react';
import styles from './D_SIGNIN_000.module.scss';
import KakaoLoginBtn from '../../components/KakaoLoginBtn/KakaoLoginBtn';

function D_SIGNIN_000() {
  const handleKakaoLogin = () => {
    // 카카오 동의 페이지
    window.location.href = import.meta.env.VITE_REDIRECT_URI;
  };

  return (
    <>
      <div className={styles.container}>
        <h1>그땐 그랬지</h1>
        <button onClick={handleKakaoLogin}>
          <span>카카오로 시작</span>
          <KakaoLoginBtn />
        </button>
      </div>
    </>
  );
}

export default D_SIGNIN_000;
