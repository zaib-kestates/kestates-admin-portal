import { useEffect, useState } from 'react';
import { getData } from '../services/Team';

function useFetchTeams() {
  const [data, setData] = useState();

  const fetchTeams = async () => {
    const data = await getData('teams');
    setData(data);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return data;
}

export default useFetchTeams;
