import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";

import Card from "./Card";

const Trandinglist = ({ movies }) => {
  return (
    <section className="relative">
      <h2 className="text-amber-500 text-2xl mb-6">Trending Movies</h2>

      <Swiper
        className="w-full py-6"
        modules={[Mousewheel, Navigation]}
        slidesPerView={2}
        spaceBetween={16}
        navigation
        mousewheel={{
          enabled: true,
          forceToAxis: true,   // 👉 Shift + Scroll = horizontal
          sensitivity: 1,
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Card elem={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Trandinglist;
