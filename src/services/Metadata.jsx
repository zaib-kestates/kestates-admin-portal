import { get, put } from './Axios';

export const getData = async (page) => {
  const data = await get(`metadata/${page}`);

  return data;
};

export const saveData = async (data, page) => {
  await put(`metadata/${page}`, data);
};
