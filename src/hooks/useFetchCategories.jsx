import { useState, useEffect } from 'react';
import { getData } from '../services/BlogCategory';

function useFetchCategories() {
  const [data, setData] = useState();

  // Function to get data
  const fetchCategories = async () => {
    const data = await getData('blog-categories');
    setData(data);
  };

  // Get data
  useEffect(() => {
    fetchCategories();
  }, []);

  return data;
}

export default useFetchCategories;
