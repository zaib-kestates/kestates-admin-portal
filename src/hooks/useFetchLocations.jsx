import { useState, useEffect } from 'react';
import { getData } from '../services/Location';

function useFetchLocations() {
  const [data, setData] = useState();

  const fetchLocations = async () => {
    const data = await getData('locations');
    setData(data);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return data;
}

export default useFetchLocations;
