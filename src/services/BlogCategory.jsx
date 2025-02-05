import { get, post, put } from './Axios';

export const getData = async (path) => {
  const data = await get(path);

  return data;
};

export const postData = async (data) => {
  const response = await post('blog-categories', data);

  return response;
};

export const update = async (id, data) => {
  const response = await put(`blog-categories/${id}`, data);

  return response;
};
