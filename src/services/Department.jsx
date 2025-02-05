import { get, post, put } from './Axios';

export const getDepartments = async (path) => {
  const data = await get(path);

  return data;
};

export const saveData = async (data) => {
  await post('departments', data);
};

export const updateData = async (data) => {
  await put(`departments/${data.id}`, data);
};
