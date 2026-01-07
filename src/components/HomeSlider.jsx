import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Mousewheel } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

const HomeSlider = ({ movies }) => {
  const navigate = useNavigate();

  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, Mousewheel]}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        mousewheel={{
          enabled: true,
          forceToAxis: true,   // Shift + scroll
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full h-[60vh] sm:h-[70vh]"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="w-full h-full bg-cover bg-center flex items-end"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              {/* OVERLAY */}
              <div className="w-full bg-black/60 p-6 sm:p-10">
                <h1 className="text-white text-2xl sm:text-4xl font-bold">
                  {movie.title}
                </h1>

                <p className="text-gray-300 mt-2 max-w-xl line-clamp-3">
                  {movie.overview}
                </p>

                <button
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="mt-4 inline-block bg-amber-500 text-black font-semibold px-6 py-3 rounded-full hover:bg-amber-400 transition"
                >
                  Watch Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeSlider;
