import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import HeroBanner from "./heroBanner/HeroBanner";

import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromAPI } from "../../utils/api";
import { getApiConfiguration } from "../../store/homeSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    apiTesting();
  }, []);

  const apiTesting = async () => {
    const res = await fetchDataFromAPI("/movie/popular");
    console.log(res);
    dispatch(getApiConfiguration(res));
  };

  return (
    <div>
      <HeroBanner />
    </div>
  );
};

export default Home;
