import { useEffect, useState } from "react";
import Trandinglist from "../components/Trandinglist";
import TopRated from "../components/TopRated";
import HomeSlider from "../components/HomeSlider";
import {
  getPopularMovies,
  getTopRatedMovies,
} from "../api/movieapi";
import Loading from "../components/Loading";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [popularRes, topRatedRes] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
        ]);

        setTrending(popularRes.data.results);
        setTopRated(topRatedRes.data.results);
      } catch (error) {
        console.log("Home data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 ">
      {/* 🔥 HERO SLIDER */}
      <HomeSlider movies={trending.slice(0, 5)} />

      {/* 🎬 LISTS */}
      <div className="p-4 sm:p-6 lg:p-10 flex flex-col gap-12">
        <Trandinglist movies={trending} />
        <TopRated movies={topRated} />
      </div>
    </div>
  );
};

export default Home;
