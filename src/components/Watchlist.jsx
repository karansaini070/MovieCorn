import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Trash2 } from "lucide-react";
import Empty from "./Empty"

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  const removeFromWatchlist = (id) => {
    const updated = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  if (watchlist.length === 0) {
    return (
      <Empty />
    );
  }

  return (
    <section className="px-4 pt-30  sm:px-8 lg:px-12  text-white">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-8">
        ❤️ My Watchlist
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {watchlist.map((movie) => (
          <div key={movie.id} className="relative group">

            {/* MOVIE CARD */}
            <Card elem={movie} />

            {/* REMOVE BUTTON */}
            <button
              onClick={() => removeFromWatchlist(movie.id)}
              className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white p-2 rounded-full 
              opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"

            >
              <Trash2 size={16} />
            </button>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Watchlist;
