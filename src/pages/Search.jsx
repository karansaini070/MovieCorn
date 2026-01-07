import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/movieapi";
import Card from "../components/Card";
import Loading from "../components/Loading";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchSearchMovies = async () => {
      try {
        setLoading(true);
        const res = await searchMovies(query);
        setMovies(res.data.results);
      } catch (error) {
        console.log("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchMovies();
  }, [query]);

  return (
    <section className="px-4 sm:px-8 lg:px-12 py-6 sm:py-10 text-white">

      {/* TITLE */}
      <h1 className="text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6">
        Results for:{" "}
        <span className="text-yellow-400 break-words">{query}</span>
      </h1>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center py-10">
          <Loading />
        </div>
      )}

      {/* NO RESULT */}
      {!loading && movies.length === 0 && (
        <p className="text-center text-gray-300 mt-10">
          No movies found 😢
        </p>
      )}

      {/* MOVIE GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {movies.map((elem, idx) => (
          <Card key={idx} elem={elem} />
        ))}
      </div>

    </section>
  );
};

export default Search;
