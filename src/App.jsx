import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MoviesDetails from "./pages/MoviesDetails";
import NotFound from "./components/Notfound";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import Watchlist from "./components/Watchlist";

const AppContent = () => {
  const location = useLocation();

  // ❌ Navbar sirf NotFound page par hide hoga
  const hideNavbar =
    location.pathname !== "/" &&
    location.pathname !== "/search"&&
    location.pathname !=="/watchlist"

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviesDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
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
