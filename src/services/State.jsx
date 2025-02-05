import { get } from './Axios';

export const getData = async () => {
  const data = await get('states');

  return data;
};
