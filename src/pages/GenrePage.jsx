import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import { useMovies } from "../hooks/useMovies";
import { SkeletonCard } from "../components/Loaders";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const GenrePage = () => {
  useDocumentTitle();
  const { type, genreId } = useParams();
  const [searchParams] = useSearchParams();
  const genreName = searchParams.get("name");

  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);

  const endpoint = `/discover/${type}?with_genres=${genreId}&page=${page}`;
  const { movies: newBatch, loading } = useMovies(endpoint);

  useEffect(() => {
    setAllMovies([]);
    setPage(1);
  }, [type, genreId]);

  useEffect(() => {
    if (newBatch && newBatch.length > 0) {
      setAllMovies((prev) => {
        if (page === 1) return newBatch;
        const existingIds = new Set(prev.map((m) => m.id));
        const uniqueNewMovies = newBatch.filter((m) => !existingIds.has(m.id));
        return [...prev, ...uniqueNewMovies];
      });
    }
  }, [newBatch, page]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.scrollHeight) {
      if (!loading) {
        setPage((prev) => prev + 1);
      }
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="pt-28 px-[4%] 2xl:px-[60px] pb-10 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{genreName || "Category"}</h1>
        <p className="text-gray-400 text-sm md:text-base">{type === "tv" ? "TV Shows" : "Movies"}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {loading && [...Array(10)].map((_, i) => <SkeletonCard key={`skel-${i}`} />)}
        {allMovies.map((movie) => (
          <Card key={`${movie.id}-${movie.genre_ids ? movie.genre_ids[0] : "gen"}`} movie={movie} isTv={type === "tv"} />
        ))}
      </div>

      {!loading && allMovies.length === 0 && <p className="text-white text-center mt-10">No results found.</p>}
    </div>
  );
};

export default GenrePage;
