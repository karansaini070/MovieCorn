import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Searchbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search?query=${query}`);

  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white/5 backdrop-blur-md hover:bg-white/10 flex justify-between w-85 py-2 px-5 rounded-2xl"
    >
      <input
        className="text-white outline-none placeholder:text-gray-200 bg-transparent flex-1"
        type="text"
        placeholder="Search Movies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      <motion.button
        onClick={handleSearch}
        whileTap={{ scale: 0.85 }}
        whileHover={{ rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-2xl text-white ml-3"
      >
        <Search />
      </motion.button>
    </motion.div>
  );
}

export default Searchbar;
