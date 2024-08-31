import React from 'react';
import style from './D_MY_000.module.scss';
import prevPageBtn from '../../assets/images/prev-page.svg';
import cancelBtn from '../../assets/images/cancel-btn.svg';
import { useNavigate } from 'react-router-dom';
import alertInfoIco from '../../assets/images/circle-alert.svg';

function D_MY_000() {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <header>
        <button onClick={() => navigate('/')}>
          <img src={prevPageBtn} alt="이전페이지" />
        </button>
      </header>
      <form>
        <input type="text" placeholder={'칠리맛치킨옥수수'} />
        <div>
          <img src={alertInfoIco} alt="경고아이콘" />
          <p>닉네임은 2자 이상, 8자 이하로 입력해주세요</p>
        </div>

        <button>
          <img src={cancelBtn} alt="입력취소" />
        </button>
      </form>

      <div>
        <button>로그아웃</button>
        <button disabled={true}>회원 탈퇴</button>
      </div>
    </div>
  );
}

export default D_MY_000;
