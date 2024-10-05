import React, { useEffect, useState } from 'react';
import CommonHeader from '../../components/CommonHeader/CommonHeader';
import diaryBgImg from '../../assets/images/diary-bg.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { client } from '../../axios/client';
import useLocalStorage from '../../hooks/useLocalStorage';
import styled from 'styled-components';
import { weatherIco } from '../../assets/images/weatherIcons/weatherIco';

function D_READ_000() {
  const [diaryData, setDiaryData] = useState('');
  const [storedValue] = useLocalStorage('USER_TOKEN');
  const navigate = useNavigate();
  const { date } = useParams();
  const year = date.split('-').join('').slice(0, 4);
  const month = date.split('-').join('').slice(4, 6);
  const day = date.split('-').join('').slice(6);
  console.log(month, year, day);

  const getDiaryData = async () => {
    try {
      const response = await client.get(`/diary/${date}/`, {
        headers: {
          Authorization: `Bearer ${storedValue.access}`,
        },
      });
      console.log(response.data.data);
      const data = await response.data.data;
      setDiaryData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditContent = () => {
    navigate(`/write/${date}/?mode=edit`);
  };

  console.log(date);

  const handleDeleteContent = async () => {
    const userAgree = confirm('일기를 정말로 지우시겠어요?');
    if (userAgree) {
      try {
        const response = await client.delete(`/diary/${date}/`, {
          headers: {
            Authorization: `Bearer ${storedValue.access}`,
          },
        });
        console.log(response.data.data);
        const data = await response.data.data;
        alert('일기가 정상적으로 삭제되었어요!');
        navigate('/');
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    } else {
    }
  };

  useEffect(() => {
    getDiaryData();
  }, []);

  return (
    <>
      <ReadContainer>
        <CommonHeader />
        <main>
          <Date>
            <h2>{`${year}년 ${month}월 ${day}일`}</h2>
            <img src={weatherIco?.find((ico) => ico?.id === diaryData?.weather)?.hover} alt={diaryData?.weather} />
          </Date>
          <DiaryImage>
            <img src={diaryBgImg} alt="일기 썸네일" />
          </DiaryImage>
          <Diary>
            <Content wrap="soft">{diaryData?.content}</Content>
            <Tag>
              <span>#일요일</span>
              <span>#믿을수없어</span>
              <span>#주말순삭소름</span>
            </Tag>
            <UtilityButtons>
              <button onClick={handleEditContent}>수정</button>
              <button onClick={handleDeleteContent}>삭제</button>
            </UtilityButtons>
          </Diary>
        </main>
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

  main {
    width: 100%;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    margin-top: 64px;
  }
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 2rem;

  h2 {
    font-weight: 400;
    text-align: center;
    margin-right: 12px;
  }

  img {
    position: absolute;
    top: -2px;
    left: 220px;
  }
`;

const Diary = styled.div`
  width: 100%;
`;

const DiaryImage = styled.div`
  width: 100%;
  min-height: 172px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  background-color: white;

  img {
    object-fit: contain;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 223px;
  margin-bottom: 2rem;
  overflow-y: auto;

  font-family: 'Ownglyph_jiwoosonang';
  font-size: 30px;
  font-weight: 400;
  overflow-wrap: break-word;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 12px;
  padding-bottom: 4px;
  line-height: 2;
  border: none;
  background-color: transparent;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: #c7c4b929;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c7c4b9;
    height: 112px;
    border-radius: 2px;
  }
`;

const Tag = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  margin-bottom: 3rem;

  span {
    font-family: 'Ownglyph_jiwoosonang';
    font-size: 24px;
    font-weight: 600;
    color: #1db571;
  }
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
