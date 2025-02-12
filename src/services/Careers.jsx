import { get, post } from './Axios';

export const getData = async () => {
  const data = await get('careers');

  return data;
};

export const saveData = async (data) => {
  await post('careers', data);
};
