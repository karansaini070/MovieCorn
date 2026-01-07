 import api from "./api";

// ✅ POPULAR MOVIES
export const getPopularMovies = () => {
  return api.get("/movie/popular");
};

// ✅ TOP RATED MOVIES
export const getTopRatedMovies = () => {
  return api.get("/movie/top_rated");
};

// ✅ MOVIE DETAILS BY ID
export const getMovieDetails = (id) => {
  return api.get(`/movie/${id}`);
};

// ✅ SEARCH MOVIES
export const searchMovies = (query) => {
  return api.get("/search/movie", {
    params: {
      query,
    },
  });
};

// ✅ MOVIE TRAILER
export const getMovieTrailer = (id) => {
  return api.get(`/movie/${id}/videos`);
};

// ✅ UPCOMING MOVIES
export const getUpcomingMovies = () => {
  return api.get("/movie/upcoming");
};

// ✅ NOW PLAYING MOVIES
export const getNowPlayingMovies = () => {
  return api.get("/movie/now_playing");
};

