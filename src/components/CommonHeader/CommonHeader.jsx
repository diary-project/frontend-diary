import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CommonHeader.module.scss';
import prevPageBtn from '../../assets/images/prev-page.svg';

function CommonHeader() {
  const navigate = useNavigate();
  return (
    <header style={styles}>
      <button onClick={() => navigate(-1)}>
        <img src={prevPageBtn} alt="이전페이지" />
      </button>
    </header>
  );
}

export default CommonHeader;
