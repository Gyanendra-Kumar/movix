import React, { useState } from "react";
import "../Home.scss";
import { Carousel, ContentWrapper } from "../../../components";
import SwitchTabs from "../../../components/SwitchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";

const Trending = () => {
  const [endPoints, setEndPoints] = useState("day");

  const { data, loading } = useFetch(`/trending/all/${endPoints}`);

  const onTabChange = (tab) => {
    setEndPoints(tab === "Day" ? "day" : "week");
  };

  return (
    <div className="carouselSection">
      <div className="contentWrapper">
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
