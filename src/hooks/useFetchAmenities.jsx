import { useState, useEffect } from "react";
import { getData } from "../services/Amenity";

function useFetchAmenities() {
  const [data, setData] = useState();

  const fetchAmenities = async () => {
    const data = await getData("amenities");
    setData(data);
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  return data;
}

export default useFetchAmenities;
