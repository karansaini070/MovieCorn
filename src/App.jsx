import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MoviesDetails from "./pages/MoviesDetails";
import NotFound from "./components/Notfound";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import Watchlist from "./components/Watchlist";

/* 🔹 Page animation variants */
const pageVariants = {
  initial: {
    clipPath: "inset(0 0 100% 0)",
  },
  animate: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    clipPath: "inset(100% 0 0 0)",
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

/* 🔹 Wrapper for every page */
const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
);

const AppContent = () => {
  const location = useLocation();

  // Navbar/Footer sirf specific pages par
  const hideNavbar =
    location.pathname !== "/" &&
    location.pathname !== "/search" &&
    location.pathname !== "/watchlist";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />

          <Route
            path="/movie/:id"
            element={
              <PageWrapper>
                <MoviesDetails />
              </PageWrapper>
            }
          />

          <Route
            path="/search"
            element={
              <PageWrapper>
                <Search />
              </PageWrapper>
            }
          />

          <Route
            path="/watchlist"
            element={
              <PageWrapper>
                <Watchlist />
              </PageWrapper>
            }
          />

          <Route
            path="*"
            element={
              <PageWrapper>
                <NotFound />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>

      {!hideNavbar && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
