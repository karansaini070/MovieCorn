import api from "./api";

// ✅ POPULAR MOVIES
export const getPopularMovies = () => {
  return api.get("/movie/popular");
};
// ✅ Top MOVIES
export const getTopRatedMovies = () => {
  return api.get("/movie/top_rated");
};

// ✅ MOVIE DETAILS BY ID
export const getMovieDetails = (id) => {
  return api.get(`/movie/${id}`);
};

// ✅ SEARCH MOVIES
export const searchMovies = (query) => {
  return api.get(`/search/movie`, {
    params: {
      query: query,
    },
  });
};
// ✅ MOVIE TRAILER
export const getMovieTrailer = (id) => {
  return api.get(`/movie/${id}/videos`);
};
