import axios from 'axios';
import { BASE_URL } from '../constants/keys';

axios.defaults.withCredentials = true;

export const client = axios.create({
  baseURL: BASE_URL,
});
