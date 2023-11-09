import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import HeroBanner from "./heroBanner/HeroBanner";

import { useDispatch } from "react-redux";
import { fetchDataFromAPI } from "../../utils/api";
import { getApiConfiguration } from "../../store/homeSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = async () => {
    const res = await fetchDataFromAPI("/configuration");
    console.log(res);

    const url = {
      backdrop: res.images.secure_base_url + "original",
      poster: res.images.secure_base_url + "original",
      profile: res.images.secure_base_url + "original",
    };
    dispatch(getApiConfiguration(url));
  };

  return (
    <div>
      <HeroBanner />
      <div style={{ height: "100vh" }}></div>
    </div>
  );
};

export default Home;
