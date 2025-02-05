import { get, post, put } from './Axios';

export const getData = async (path) => {
  const data = await get(path);

  return data;
};

export const saveData = async (data) => {
  await post('languages', data);
};

export const updateData = async (data) => {
  await put(`languages/${data.id}`, data);
};
