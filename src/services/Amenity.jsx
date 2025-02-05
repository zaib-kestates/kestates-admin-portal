import { get, post, put } from './Axios';

export const getData = async (path) => {
  const data = await get(path);

  return data;
};

export const saveData = async (data) => {
  await post('amenities', data);
};

export const updateData = async (data) => {
  await put(`amenities/${data.id}`, data);
};
