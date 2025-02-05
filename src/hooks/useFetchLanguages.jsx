import { useState, useEffect } from 'react';
import { getData } from '../services/Language';

function useFetchLanguages() {
  const [data, setData] = useState();

  // Function to get data
  const fetchLanguages = async () => {
    const data = await getData('languages');
    setData(data);
  };

  // Get data
  useEffect(() => {
    fetchLanguages();
  }, []);

  return data;
}

export default useFetchLanguages;
