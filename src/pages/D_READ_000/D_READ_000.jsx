import React, { useState } from 'react';
import CommonHeader from '../../components/CommonHeader/CommonHeader';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import styled, { keyframes } from 'styled-components';

import { useQuery } from '@tanstack/react-query';
import { deleteUserDiary, fetchDiaryData } from '../../apis/apis';
import { getFormattedDay } from '../../utils/getFormattedDay';
import Date from './components/Date';
import DiaryImage from './components/DiaryImage';
import DiaryLayout from './components/DiaryLayout';
import DiaryTag from './components/DiaryTag';
import DiaryContent from './components/DiaryContent';

function D_READ_000() {
  const { date } = useParams();
  const navigate = useNavigate();
  const formattedDay = getFormattedDay(date);
  const [storedValue] = useLocalStorage('USER_TOKEN');
  const { isLoading, data: diaryData } = useQuery({
    queryKey: ['diaryData', date],
    queryFn: async () => {
      const data = await fetchDiaryData(date, storedValue.access);
      if (!data) {
        navigate('/');
      }

      return data;
    },
  });

  const handleEditContent = () => {
    navigate(`/write/${date}/?mode=edit`);
  };

  const handleDeleteContent = async () => {
    const isDeleted = await deleteUserDiary(date, storedValue.access);
    if (isDeleted) {
      navigate('/');
    }
  };

  return (
    <>
      <ReadContainer>
        <CommonHeader />
        <DiaryLayout diaryData={diaryData} isLoading={isLoading}>
          <Date formattedDay={formattedDay} />
          <DiaryImage />
          <DiaryContent />
          <DiaryTag />
          <UtilityButtons>
            <button onClick={handleEditContent}>수정</button>
            <button onClick={handleDeleteContent}>삭제</button>
          </UtilityButtons>
        </DiaryLayout>
      </ReadContainer>
    </>
  );
}

export default D_READ_000;

const ReadContainer = styled.div`
  width: 100%;
  max-width: 700px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const UtilityButtons = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;

  button {
    width: 60px;
    height: 40px;
    border: 2px solid black;
    background-color: white;
  }
`;
