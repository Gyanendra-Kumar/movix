import React, { useEffect } from "react";
import styles from "./Details.module.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import { useDispatch } from "react-redux";
import { fetchDataFromAPI } from "../../utils/api";
import { getApiConfiguration } from "../../store/homeSlice";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendations from "./carousels/Recommendations";

const Details = () => {
  const { mediaType, id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = async () => {
    const res = await fetchDataFromAPI("/configuration");
    // console.log(res);

    const url = {
      backdrop: res.images.secure_base_url + "original",
      poster: res.images.secure_base_url + "original",
      profile: res.images.secure_base_url + "original",
    };
    dispatch(getApiConfiguration(url));
  };

  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  // console.log(params);

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendations mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
