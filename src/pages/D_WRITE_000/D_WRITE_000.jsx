import React, { useEffect, useState } from 'react';
import { client } from '../../axios/client';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import WeatherIcons from '../../components/WeatherIcons/WeatherIcons';

function D_WRITE_000() {
  const [storedValue] = useLocalStorage('USER_TOKEN');
  const navigate = useNavigate();
  const params = useParams();
  const [clickedId, setClickedId] = useState(null);
  const [diaryData, setDiaryData] = useState({
    content: '',
    weather: null,
  });
  const currentDay = new window.Date();
  const month = currentDay.getMonth() + 1;
  const date = currentDay.getDate();

  const handleTextAreaValue = (e) => {
    setDiaryData({
      ...diaryData,
      content: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postUserData();
  };

  const postUserData = async () => {
    try {
      const response = await client.post(
        '/diary/',
        {
          ...diaryData,
        },
        {
          headers: {
            Authorization: `Bearer ${storedValue.access}`,
          },
        }
      );
      const data = await response.data;
      console.log(data);
      navigate(`/read/${data.data.date}`);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserData = async () => {
    try {
      const response = await client.get(`/diary/${params.date}`, {
        headers: {
          Authorization: `Bearer ${storedValue.access}`,
        },
      });
      const data = await response.data.data;

      if (!data) return;

      setDiaryData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserData();
    console.log(diaryData);
  }, []);

  return (
    <>
      <WriteContainer>
        <Title>오늘 하루를 기록해보세요</Title>
        <ContentWrapper>
          <Header>
            <Date>
              {diaryData?.content !== '' && diaryData?.weather !== null
                ? `${diaryData?.date.split('-').join('').slice(5, 1)}월 ${diaryData?.date.split('-').join('').slice(6, 2)}일`
                : `${month}월 ${date}일`}
            </Date>
            <WeatherIcons
              diaryData={diaryData}
              setDiaryData={setDiaryData}
              clickedId={clickedId}
              setClickedId={setClickedId}
            />
          </Header>
          <TextArea
            placeholder="기록하고 싶은 오늘의 이야기는?"
            value={diaryData?.content}
            onChange={handleTextAreaValue}
            maxLength={1000}
          ></TextArea>
        </ContentWrapper>
        <TextLength>{`${diaryData?.content ? diaryData?.content?.length : 0}/1000`}</TextLength>
        {diaryData?.content?.length > 0 ? <SubmitButton onClick={handleSubmit}>오늘의 일기 끝</SubmitButton> : null}
      </WriteContainer>
    </>
  );
}

export default D_WRITE_000;

const WriteContainer = styled.div`
  width: 375px;
  height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const ContentWrapper = styled.div`
  height: 420px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid black;
  padding: 1rem 0.6rem;
`;

const Date = styled.p`
  position: relative;
  padding-right: 24px;

  &::after {
    content: '';
    width: 2px;
    height: 15px;

    position: absolute;
    top: 1px;
    right: 0;
    background-color: #b9b7b354;
  }
`;

const TextArea = styled.textarea`
  height: 100%;
  font-size: 24px;
`;

const TextLength = styled.p`
  width: 100%;
  text-align: end;
  margin-top: 12px;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 52px;
  font-size: 16px;
  position: absolute;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);
  color: white;
  background-color: #2a2927;
`;
