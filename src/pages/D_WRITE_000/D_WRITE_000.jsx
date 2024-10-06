import React, { useEffect, useState } from 'react';
import { client } from '../../axios/client';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import WeatherIcons from '../../components/WeatherIcons/WeatherIcons';
import CommonHeader from '../../components/CommonHeader/CommonHeader';

function D_WRITE_000() {
  const [storedValue] = useLocalStorage('USER_TOKEN');
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [clickedId, setClickedId] = useState(null);
  const [diaryData, setDiaryData] = useState({
    content: '',
    weather: '',
  });
  const currentDay = new window.Date();
  const paramDate = Number(params.date.split('-').join('').slice(6));
  const editMonth = params.date.split('-').join('').slice(4, 6);
  const editDate = params.date.split('-').join('').slice(6);

  console.log(editMonth);
  const month = currentDay.getMonth() + 1;
  const date = currentDay.getDate();

  const isEditMode = searchParams.get('mode') === 'edit';

  console.log(params);

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
        `/diary/`,
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
      setDiaryData(data);
    } catch (err) {
      if (paramDate === date) {
        return;
      } else {
        navigate('/');
      }
    }
  };

  const putUserData = async () => {
    try {
      const response = await client.put(
        `/diary/${params.date}/`,
        {
          content: diaryData?.content,
          weather: diaryData?.weather,
        },
        {
          headers: {
            Authorization: `Bearer ${storedValue.access}`,
          },
        }
      );
      const data = await response.data.data;
      console.log(data);
      navigate(`/read/${params.date}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
    console.log(diaryData);

    if (isEditMode) {
      return;
    } else if (!isEditMode && diaryData.content !== '' && diaryData.weather !== '') {
      navigate('/');
    }
  }, [isEditMode]);

  return (
    <>
      <WriteContainer>
        <CommonHeader />
        <Title>오늘 하루를 기록해보세요</Title>
        <ContentWrapper>
          <Header>
            <Date>{isEditMode ? `${editMonth}월 ${editDate}일` : `${month}월 ${date}일`}</Date>
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
        {diaryData?.content?.length > 0 ? (
          <SubmitButton onClick={isEditMode ? putUserData : handleSubmit}>
            {isEditMode ? '오늘의 일기 수정 끝' : '오늘의 일기 끝'}
          </SubmitButton>
        ) : null}
      </WriteContainer>
    </>
  );
}

export default D_WRITE_000;

const WriteContainer = styled.div`
  width: 100%;
  max-width: 700px;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin-top: 64px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const ContentWrapper = styled.div`
  height: 100%;
  min-height: 400px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
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
  min-height: 400px;
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
  max-width: 636px;
  height: 52px;
  font-size: 16px;
  position: sticky;
  left: 0px;
  color: white;
  background-color: #2a2927;
`;
