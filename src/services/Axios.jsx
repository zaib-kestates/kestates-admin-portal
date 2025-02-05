import axios from 'axios';

export const get = async (path) => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_API}${path}`);

  return response.data.data;
};

export const post = async (path, data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}${path}`,
    data
  );

  return response;
};

export const put = async (path, data) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASE_API}${path}`,
    data
  );

  return response;
};
