import { useState, useEffect } from 'react';
import { getData } from '../services/BlogCategory';

function useFetchBlogCategories(path) {
  const [data, setData] = useState();

  // Function to get data
  const fetchBlogCategories = async () => {
    const data = await getData(path);
    setData(data);
  };

  // Get data
  useEffect(() => {
    fetchBlogCategories();
  }, []);

  return data;
}

export default useFetchBlogCategories;
