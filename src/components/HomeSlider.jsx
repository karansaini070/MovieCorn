import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

/* slide fade – thoda slow */
const slideVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

/* background zoom – slow & cinematic */
const bgZoom = {
  hidden: { scale: 1 },
  visible: {
    scale: 1.03,
    transition: { duration: 7, ease: "easeOut" },
  },
};

/* text animation – smooth stagger */
const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.75,
      ease: "easeOut",
    },
  }),
};

const HomeSlider = ({ movies }) => {
  const navigate = useNavigate();

  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Mousewheel]}
        slidesPerView={1}
        loop

        /* 🔥 MOST IMPORTANT FIX */
        mousewheel={{
          forceToAxis: true,
          sensitivity: 0.25,     // 🔥 slow scroll
          thresholdDelta: 80,    // 🔥 ek proper scroll par hi slide
          releaseOnEdges: true,
        }}

        pagination={{ clickable: true }}

        autoplay={{
          delay: 5200,           // thoda gap
          disableOnInteraction: false,
        }}

        speed={1100}             // 🔥 slide transition slow

        className="w-full h-[60vh] sm:h-[70vh]"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            {({ isActive }) => (
              <motion.div
                key={isActive ? movie.id : "inactive"}
                className="w-full h-full relative overflow-hidden"
                variants={slideVariants}
                initial="hidden"
                animate={isActive ? "visible" : "hidden"}
              >
                {/* BACKGROUND */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                  }}
                  variants={bgZoom}
                  initial="hidden"
                  animate={isActive ? "visible" : "hidden"}
                />

                {/* OVERLAY + TEXT (UNCHANGED) */}
                <div className="relative z-10 w-full h-full flex items-end">
                  <div className="w-full bg-black/60 p-6 sm:p-10">
                    <motion.h1
                      key={`title-${movie.id}-${isActive}`}
                      className="text-white text-2xl sm:text-4xl font-bold"
                      variants={textVariants}
                      initial="hidden"
                      animate={isActive ? "visible" : "hidden"}
                      custom={0.15}
                    >
                      {movie.title}
                    </motion.h1>

                    <motion.p
                      key={`desc-${movie.id}-${isActive}`}
                      className="text-gray-300 mt-2 max-w-xl line-clamp-3"
                      variants={textVariants}
                      initial="hidden"
                      animate={isActive ? "visible" : "hidden"}
                      custom={0.3}
                    >
                      {movie.overview}
                    </motion.p>

                    <motion.button
                      key={`btn-${movie.id}-${isActive}`}
                      onClick={() => navigate(`/movie/${movie.id}`)}
                      className="mt-4 inline-block bg-amber-500 text-black font-semibold px-6 py-3 rounded-full hover:bg-amber-400 transition"
                      variants={textVariants}
                      initial="hidden"
                      animate={isActive ? "visible" : "hidden"}
                      custom={0.45}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Watch Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeSlider;
