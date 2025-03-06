import { get, post, put } from './Axios';

export const getData = async (path) => {
  const data = await get(path);

  return data;
};

export const saveData = async (data) => {
  await post('properties', data);
};

export const updateData = async (id, data) => {
  await put(`properties/${id}`, data);
};
