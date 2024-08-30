import React from 'react';
import style from './KakaoLoginBtn.module.scss';
import { BiChatFill } from './BiChatFill';

function KakaoLoginBtn() {
  return (
    <div className={style.container}>
      <div></div>
      <div></div>
      <BiChatFill />
    </div>
  );
}

export default KakaoLoginBtn;
