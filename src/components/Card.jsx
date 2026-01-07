import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Card = ({ elem }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/movie/${elem.id}`)}
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 120 }}
      className=" shrink-0
        cursor-pointer relative flex flex-col
        p-2 sm:p-3 md:p-4
        rounded-xl sm:rounded-2xl
      "
    >
      {/* POSTER */}
      <img
        className="
          w-full object-cover rounded-xl sm:rounded-2xl
          h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px]
        "
        src={`https://image.tmdb.org/t/p/w500${elem.poster_path}`}
        alt={elem.title}
      />

      {/* TITLE */}
      <h1
        className="
          text-xs sm:text-sm md:text-base
          mt-2 sm:mt-3
          text-center line-clamp-2
        "
      >
        {elem.title}
      </h1>
    </motion.div>
  );
};

export default Card;
