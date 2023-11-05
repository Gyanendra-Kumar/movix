import React, { useEffect } from "react";
import { fetchDataFromAPI } from "./utils/api";

const App = () => {
  useEffect(() => {
    // apiTesting();
  }, []);

  const apiTesting = async () => {
    const res = await fetchDataFromAPI("/movie/popular");
    console.log(res);
  };

  return <div>App</div>;
};

export default App;
