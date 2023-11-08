import React, { useState } from "react";
import styles from "./HeroBanner.module.scss";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className={styles.heroBanner}>
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
    </div>
  );
};

export default HeroBanner;
