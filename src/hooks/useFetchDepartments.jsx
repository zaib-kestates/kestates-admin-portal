import { useEffect, useState } from 'react';
import { getDepartments } from '../services/Department';

function useFetchDepartments() {
  const [data, setData] = useState();

  // Function to get data
  const fetchDepartments = async () => {
    const data = await getDepartments('departments');
    setData(data);
  };

  // Get data
  useEffect(() => {
    fetchDepartments();
  }, []);

  return data;
}

export default useFetchDepartments;
