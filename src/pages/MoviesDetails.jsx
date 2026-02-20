import { Star, Clock, Calendar, Play, Heart } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getMovieDetails, getMovieTrailer } from "../api/movieapi";
import Loading from "../components/Loading";

const MoviesDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [added, setAdded] = useState(false);

  // 3D Poster State
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const posterVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  // Fetch Movie
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await getMovieDetails(id);
        setMovie(res.data);

        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        const exists = watchlist.some((item) => item.id === res.data.id);
        setAdded(exists);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Trailer
  const handleWatchTrailer = async () => {
    const res = await getMovieTrailer(id);
    const trailer = res.data.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    if (trailer) {
      setTrailerKey(trailer.key);
      setShowTrailer(true);
    } else {
      alert("Trailer not available");
    }
  };

  // Watchlist Toggle
  const handleWatchlistToggle = () => {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    const exists = watchlist.some((item) => item.id === movie.id);

    if (exists) {
      watchlist = watchlist.filter((item) => item.id !== movie.id);
      setAdded(false);
    } else {
      watchlist.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      });
      setAdded(true);
    }

    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  };

  // 3D Mouse Handlers
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 20;
    const rotateX = -((y / rect.height) - 0.5) * 20;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
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
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        />
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-40 flex flex-col lg:flex-row gap-10 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Poster 3D */}
          <motion.div
            className="w-full lg:w-[320px] flex justify-center lg:justify-start shrink-0"
            variants={posterVariants}
            style={{ perspective: 1000 }}
          >
            <motion.img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-2xl shadow-2xl w-[220px] sm:w-[260px] lg:w-full cursor-pointer"
              animate={{
                rotateX: rotate.x,
                rotateY: rotate.y,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 15 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileHover={{
                boxShadow: "0px 30px 60px rgba(0,0,0,0.7)",
              }}
            />
          </motion.div>

          {/* Details */}
          <motion.div className="flex flex-col gap-6 max-w-3xl">
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
              {movie.title}
            </motion.h1>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
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
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-3 flex-wrap">
              {movie.genres?.map((g) => (
                <span key={g.id} className="px-4 py-1 rounded-full border border-white/30 text-sm">
                  {g.name}
                </span>
              ))}
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-300 leading-relaxed">
              {movie.overview}
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-4">
              {/* Trailer */}
              <motion.button
                onClick={handleWatchTrailer}
                whileHover={{
                  y: -5,
                  scale: 1.04,
                  boxShadow: "0px 12px 30px rgba(255,255,255,0.25)",
                }}
                whileTap={{ scale: 0.96, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium"
              >
                <Play size={20} />
                Watch Trailer
              </motion.button>

              {/* Watchlist Toggle */}
              <motion.button
                onClick={handleWatchlistToggle}
                whileHover={{
                  y: -5,
                  scale: 1.04,
                  boxShadow: "0px 12px 30px rgba(255,255,255,0.15)",
                }}
                whileTap={{ scale: 0.96, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full
                  ${
                    added
                      ? "bg-red-600 text-white"
                      : "border border-white/40 hover:bg-white/10"
                  }`}
              >
                <Heart
                  size={20}
                  className={added ? "fill-white text-white" : "text-white"}
                />
                {added ? "Remove from Watchlist" : "Add to Watchlist"}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0" onClick={() => setShowTrailer(false)} />
          <div className="relative z-10 w-full max-w-4xl aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MoviesDetails;