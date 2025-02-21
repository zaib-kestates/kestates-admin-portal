import { get, post, put } from './Axios';

export const getData = async (path) => {
    const data = await get(path);

    return data;
}