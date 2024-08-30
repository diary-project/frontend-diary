import axios from 'axios';

export const kakao = axios.create({
  baseURL: 'https://kauth.kakao.com/oauth/authorize',
});
