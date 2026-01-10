import { Popcorn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Searchbar from "./Searchbar";

import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
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
      className="w-full fixed top-0 left-0 z-50 bg-transparent px-4 sm:px-6 lg:px-10 py-4"
    >
      {/* MOBILE GRID / DESKTOP FLEX */}
      <div className="grid grid-cols-2 gap-3 sm:flex sm:justify-between sm:items-center">
        
        {/* LOGO */}
        <motion.h1
          onClick={() => navigate("/")}
          className="flex gap-2 items-center bg-amber-500 px-4 py-2 text-black rounded-xl font-bold cursor-pointer w-fit"
        >
          <Popcorn color="black" size={22} />
          MovieCorn
        </motion.h1>

        {/* WATCHLIST */}
        <motion.button
          onClick={() => navigate("/watchlist")}
          className="bg-white/10 text-white px-4 py-2 rounded-xl text-sm sm:text-base justify-self-end"
        >
          ❤️ Watchlist
        </motion.button>

        {/* SEARCH */}
        <div className="col-span-1">
          <Searchbar />
        </div>

        {/* LOGIN / PROFILE */}
        <div className="justify-self-end">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-amber-500 px-3 py-2 rounded-xl text-black text-sm font-semibold">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
