// https://api.themoviedb.org/3/movie/popular?api_key=30e23191ff147606bc741ce5f49ebfa8
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export default api