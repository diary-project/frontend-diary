import React, { useEffect } from 'react';
import { weatherIco } from '../../assets/images/weatherIcons/weatherIco';
import styled from 'styled-components';

function WeatherIcons({ clickedId, setClickedId, diaryData, setDiaryData }) {
  const handleIconToggle = (id) => {
    if (clickedId === id) {
      setClickedId(null); // 클릭 해제
    } else {
      setClickedId(id); // 클릭
    }
  };

  useEffect(() => {
    setDiaryData({
      ...diaryData,
      weather: clickedId,
    });
  }, [clickedId]);

  return (
    <WeatherIcoContainer>
      {weatherIco?.map((ico) => (
        <button key={ico.id} onClick={() => handleIconToggle(ico.id)}>
          <img src={clickedId === ico.id ? ico.hover : ico.img} alt={ico.id} />
        </button>
      ))}
    </WeatherIcoContainer>
  );
}

export default WeatherIcons;

const WeatherIcoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.8rem;
  gap: 12px;

  button {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
