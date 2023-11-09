import React, { useState, useEffect } from "react";
import styles from "./HeroBanner.module.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { ContentWrapper, Img } from "../../../components";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  console.log(data);

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className={styles.heroBanner}>
      {!loading && (
        <div className={styles["backdrop-img"]}>
          <Img src={background} />
        </div>
      )}

      <div className={styles["opacity-layer"]}></div>

      <ContentWrapper>
        <div className={styles.wrapper}>
          <div className={styles.heroBannerContent}>
            <span className={styles.title}>Welcome</span>
            <span className={styles.subTitle}>
              Millions of movies, TV shows and people to discover. Explore now.
            </span>

            <div className={styles.searchInput}>
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <button>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
