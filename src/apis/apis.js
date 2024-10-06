import { client } from '../axios/client';

export const fetchAllDiaryData = async (formattedDate, token) => {
  console.log('월별 일기 유저데이터 페칭함수실행');

  try {
    const response = await client.get(`/diary/?${formattedDate}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.dates;
  } catch (err) {
    return null;
  }
};

export const fetchDiaryData = async (date, token) => {
  console.log('특정 날짜 조회 유저일기데이터 패칭함수실행');
  try {
    const response = await client.get(`/diary/${date}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchUserName = async (token) => {
  console.log('유저 닉네임데이터 페칭함수실행');
  try {
    const response = await client.get('/user/nickname', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.nickname;
  } catch (err) {
    console.error('유저 데이터를 fetch 하는데 실패했습니다. : ', err);
  }
};

export const editUserName = async (editedName, token) => {
  try {
    const response = await client.put(
      '/user/nickname/',
      {
        nickname: editedName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.data;
    return data.nickname;
  } catch (err) {
    console.error(err);
  }
};

export const deleteUserDiary = async (date, token) => {
  console.log('유저 일기 지우기 함수 실행');
  const userAgree = confirm('일기를 정말로 지우시겠어요?');
  if (userAgree) {
    try {
      const response = await client.delete(`/diary/${date}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      alert('일기가 정상적으로 삭제되었어요!');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  } else {
    return false;
  }
};
