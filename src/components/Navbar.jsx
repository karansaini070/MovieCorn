import { Popcorn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down
        setHidden(true);
      } else {
        // scrolling up
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-120%" : "0%" }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`
        w-full
        
        flex flex-col sm:flex-row
        gap-4 sm:gap-0
        justify-between items-center
        px-4 sm:px-6 lg:px-10
        py-4
        fixed top-0 left-0 z-50
        transition-colors duration-300
        bg-transparent
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

      {/* SEARCH + WATCHLIST */}
      <div className="w-full sm:w-auto flex justify-center gap-2 sm:justify-end">
        <motion.button
          onClick={() => navigate("/watchlist")}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="cursor-pointer bg-white/5 backdrop-blur-md hover:bg-white/10 flex justify-center items-center w-fit px-5 rounded-2xl
             text-black dark:text-white"
        >
          ❤️ Watchlist
        </motion.button>


        <Searchbar />
      </div>
    </motion.header>
  );
};

export default Navbar;
