import { get, post } from './Axios';

export const getData = async () => {
  const data = await get('home');

  return data;
};

export const saveData = async (data) => {
  await post('home', data);
};
