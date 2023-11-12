import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./SearchResult.scss";
import { fetchDataFromAPI } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import { ContentWrapper } from "../../components";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = async () => {
    setLoading(true);
    const res = await fetchDataFromAPI(
      `/search/multi?query=${query}&page=${pageNum}`
    );
    setData(res);
    setPageNum((prev) => prev + 1);
    setLoading(false);
    // console.log(res);
  };

  const fetchNextPageData = async () => {
    const res = await fetchDataFromAPI(
      `/search/multi?query=${query}&page=${pageNum}`
    );
    if (data?.results) {
      setData({
        ...data,
        results: [...data?.results, ...res?.results],
      });
    } else {
      setData(res);
    }
    setPageNum((prev) => prev + 1);
  };

  // console.log(data);
  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        // <ContentWrapper>
        //   {data?.results?.length > 0 ? (
        //     <>
        //       <div className="pageTitle">
        //         {`Search ${
        //           data?.results > 1 ? "results" : "result"
        //         } of '${query}'`}
        //       </div>

        //       <InfiniteScroll
        //         className="content"
        //         dataLength={data?.results?.length || []}
        //         next={fetchNextPageData}
        //         hasMore={pageNum <= data?.total_pages}
        //         loader={<Spinner />}
        //       >
        //         {data?.results?.map((item, index) => {
        //           if (item?.media_type) return;

        //           return (
        //             <MovieCard key={index} data={item} fromSearch={true} />
        //           );
        //         })}
        //       </InfiniteScroll>
        //     </>
        //   ) : (
        //     <span className="resultNotFound">
        //       <h1>Sorry, result not found!</h1>
        //     </span>
        //   )}
        // </ContentWrapper>
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
