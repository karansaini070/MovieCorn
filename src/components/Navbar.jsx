import { Popcorn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 Home page check
  const isHome = location.pathname === "/";

  return (
    <header
      className={`
        w-full
        flex flex-col sm:flex-row
        gap-4 sm:gap-0
        justify-between items-center
        px-4 sm:px-6 lg:px-10
        py-4
        fixed top-0 left-0 z-50
        transition-colors duration-300
        ${isHome ? "bg-transparent" : "bg-black"}
      `}
    >
      {/* LOGO */}
      <motion.h1
        onClick={() => navigate("/")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="
          flex gap-2 items-center
          text-black font-bold
          text-lg sm:text-xl
          bg-amber-500
          px-4 py-2 sm:p-4
          rounded-xl sm:rounded-2xl
          cursor-pointer select-none
        "
      >
        <Popcorn color="black" size={24} className="sm:hidden" />
        <Popcorn color="black" size={30} className="hidden sm:block" />
        MovieCorn
      </motion.h1>

      {/* SEARCH BAR */}
      <div className="w-full sm:w-auto flex justify-center gap-2 sm:justify-end">
        <motion.button
          onClick={() => navigate("/watchlist")}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white/5 backdrop-blur-md hover:bg-white/10 flex justify-center items-center w-fit   px-5 rounded-2xl"
        >
          ❤️ Watchlist
        </motion.button>
        <Searchbar />
      </div>
    </header>
  );
};

export default Navbar;
