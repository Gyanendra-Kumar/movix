import React, { useState } from "react";
import "../Home.scss";
import { Carousel, ContentWrapper } from "../../../components";
import SwitchTabs from "../../../components/SwitchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";

const TopRated = () => {
  const [endPoints, setEndPoints] = useState("movie");

  const { data, loading } = useFetch(`/${endPoints}/top_rated`);

  const onTabChange = (tab) => {
    setEndPoints(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <div className="contentWrapper">
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} endpoint={endPoints} />
    </div>
  );
};

export default TopRated;
