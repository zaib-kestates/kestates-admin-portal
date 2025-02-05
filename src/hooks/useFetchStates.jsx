import { useState, useEffect } from 'react';
import { getData } from '../services/State';

function useFetchStates() {
  const [states, setStates] = useState();

  // Function to get data
  const fetchStates = async () => {
    const data = await getData();
    setStates(data);
  };

  useEffect(() => {
    fetchStates();
  }, []);

  return states;
}

export default useFetchStates;
