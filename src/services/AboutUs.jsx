import { get, post } from './Axios';

export const getData = async () => {
  const data = await get('aboutus');

  return data;
};

export const saveData = async (data) => {
  await post('aboutus', data);
};
