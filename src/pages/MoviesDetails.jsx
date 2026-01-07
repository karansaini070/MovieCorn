import { Star, Clock, Calendar, Play, Heart, X } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, getMovieTrailer } from "../api/movieapi";
import Loading from "../components/Loading";

const MoviesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await getMovieDetails(id);
        setMovie(res.data);

        // ✅ check already in watchlist
        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        const exists = watchlist.some((item) => item.id === res.data.id);
        setAdded(exists);
      } catch (error) {
        console.error("Movie details error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleWatchTrailer = async () => {
    try {
      const res = await getMovieTrailer(id);

      const trailer = res.data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        alert("Trailer not available 😢");
      }
    } catch (error) {
      console.log("Trailer error:", error);
    }
  };

  // ✅ ADD TO WATCHLIST
  const handleAddToWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (!watchlist.some((item) => item.id === movie.id)) {
      watchlist.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      });

      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      setAdded(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <section className="relative min-h-screen w-full text-white">

        {/* BACKGROUND POSTER */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/70" />

        {/* CLOSE ICON */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 right-6 z-20 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition"
        >
          <X size={24} />
        </button>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* POSTER */}
          <div className="w-full lg:w-[320px] flex justify-center lg:justify-start shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-2xl shadow-2xl w-[220px] sm:w-[260px] lg:w-full"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col gap-6 max-w-3xl">

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              {movie.title}
            </h1>

            {/* META INFO */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-300 text-sm">
              <span className="flex items-center gap-2">
                <Star size={18} className="text-yellow-400" />
                {movie.vote_average?.toFixed(1)}
              </span>

              <span className="flex items-center gap-2">
                <Clock size={18} />
                {movie.runtime} min
              </span>

              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {movie.release_date?.slice(0, 4)}
              </span>
            </div>

            {/* GENRES */}
            <div className="flex gap-3 flex-wrap">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-4 py-1 rounded-full border border-white/30 text-xs sm:text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {movie.overview}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">

              <button
                onClick={handleWatchTrailer}
                className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition"
              >
                <Play size={20} />
                Watch Trailer
              </button>

              <button
                onClick={handleAddToWatchlist}
                disabled={added}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full transition
                   ${added
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : "border border-white/40 hover:bg-white/10"
                  }`}
              >
                <Heart
                  size={20}
                  className={added ? "text-red-500 fill-red-500" : "text-white"}
                />
                {added ? "Added to Watchlist" : "Add to Watchlist"}
              </button>


            </div>
          </div>
        </div>
      </section>

      {/* TRAILER MODAL */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">

          <div
            className="absolute inset-0"
            onClick={() => setShowTrailer(false)}
          />

          <div className="relative z-10 w-full max-w-4xl aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailerKey}?rel=0&modestbranding=1`}
              title="Movie Trailer"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MoviesDetails;
