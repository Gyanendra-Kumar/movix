import React, { useEffect } from "react";
import "./Home.scss";
import HeroBanner from "./heroBanner/HeroBanner";

import { useDispatch } from "react-redux";
import { fetchDataFromAPI } from "../../utils/api";
import { getApiConfiguration, getGenres } from "../../store/homeSlice";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    genresCall();
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

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromAPI(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    // console.log(data);

    {
      data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
      });
      // console.log(allGenres);
      dispatch(getGenres(allGenres));
    }
  };

  return (
    <div>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
