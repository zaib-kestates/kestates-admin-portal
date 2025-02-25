import { useState, useEffect } from 'react';
import { getData } from '../services/PropertyType';

function useFetchPropertyTypes() {
  const [data, setData] = useState();

  const fetchPropertyTypes = async () => {
    const data = await getData('property-types');
    setData(data);
  };

  useEffect(() => {
    fetchPropertyTypes();
  }, []);

  return data;
}

export default useFetchPropertyTypes;
