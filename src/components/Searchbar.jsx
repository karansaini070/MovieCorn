import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { searchMovies } from "../api/movieapi"; // 👈 aapki file ka path

function Searchbar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔍 Search trigger
  const handleSearch = (value = query) => {
    if (!value.trim()) return;
    setSuggestions([]);
    navigate(`/search?query=${value}`);
  };

  // 🧠 Debounced API call
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await searchMovies(query);
        setSuggestions(res.data.results.slice(0, 5)); // top 5
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce delay

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white/5 backdrop-blur-md hover:bg-white/10 
                 h-12 flex items-center w-[300px] px-4 rounded-2xl"
    >
      {/* Input */}
      <input
        type="text"
        placeholder="Search Movies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="flex-1 bg-transparent outline-none 
                   placeholder:text-white text-white"
      />

      {/* Search Button */}
      <motion.button
        onClick={() => handleSearch()}
        whileTap={{ scale: 0.85 }}
        whileHover={{ rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="ml-2 text-white"
      >
        <Search />
      </motion.button>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {(suggestions.length > 0 || loading) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 mt-2 w-full 
                       bg-black/80 backdrop-blur-md rounded-xl 
                       overflow-hidden z-50"
          >
            {loading && (
              <div className="px-4 py-2 text-sm text-gray-400">
                Searching...
              </div>
            )}

            {suggestions.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleSearch(movie.title)}
                className="px-4 py-2 cursor-pointer 
                           hover:bg-white/10 text-white"
              >
                {movie.title}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Searchbar;
