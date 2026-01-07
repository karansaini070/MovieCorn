import { useEffect, useState } from "react";
import HomeSlider from "../components/HomeSlider";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../api/movieapi";
import Loading from "../components/Loading";
import Listslider from "../components/Listslider";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [popularRes, topRatedRes, upcomingRes,nowPlayingRs] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
          getNowPlayingMovies(),
        ]);

        setTrending(popularRes.data.results);
        setTopRated(topRatedRes.data.results);
        setUpcoming(upcomingRes.data.results);
        setNowPlaying(nowPlayingRs.data.results);
        
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
        <Listslider movies={nowPlaying} listname={"NowPlaying List"} />
        <Listslider movies={trending} listname={"Tranding List"} />
        <Listslider movies={topRated} listname={"TopRated List"} />
        <Listslider movies={upcoming} listname={"UpComing List"} />
      </div>
    </div>
  );
};

export default Home;
