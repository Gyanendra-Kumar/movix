import React, { useEffect } from "react";
import { fetchDataFromAPI } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(async () => {
    setLoading("Loading...");
    setData(null);
    setError(null);

    try {
      const res = await fetchDataFromAPI(url);
      setLoading(false);
      setData(res);
    } catch (error) {
      setLoading(false);
      setError("Something went wrong!...");
    }
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
