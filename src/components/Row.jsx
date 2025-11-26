import { useMovies } from "../hooks/useMovies";
import Card from "./Card";
import { Link } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";
import { SkeletonCard } from "./Loaders";

const Row = ({ title, movies, endpoint, limit, isTv, genreId }) => {
  const { movies: fetchedMovies, loading } = useMovies(endpoint || "");
  const dataToDisplay = movies || fetchedMovies;
  const isLoading = !movies && loading;

  if (isLoading) {
    return (
      <div className="my-8 relative px-4 md:px-[4%] 2xl:px-[60px]">
        <div className="h-6 w-32 bg-[#2f2f2f] animate-pulse rounded mb-4"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(limit || 5)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!dataToDisplay || dataToDisplay.length === 0) return null;

  const finalMovies = limit ? dataToDisplay.slice(0, limit) : dataToDisplay;
  return (
    <div className="my-6 md:my-8 relative group/row">
      {title &&
        (genreId ? (
          <Link to={`/genre/${isTv ? "tv" : "movie"}/${genreId}?name=${title}`} className="flex items-center group/title cursor-pointer mx-4 md:mx-[4%] 2xl:mx-[60px] my-4 md:my-8">
            <h2 className="font-medium text-[#e5e5e5] text-lg md:text-[1.4vw] transition-colors duration-300 group-hover/title:text-white">{title}</h2>
            <div className="flex items-center text-[#54b9c5] text-sm font-bold opacity-0 -translate-x-4 transition-all duration-700 ease-out group-hover/title:opacity-100 group-hover/title:translate-x-0 h-full mt-1 ml-2">
              <span className="hidden md:inline max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-[1000ms] ease-in-out group-hover/title:max-w-[150px] group-hover/title:opacity-100 -mr-2 group-hover/title:mr-0">Explore All</span>
              <IoChevronForward size={20} className="transition-transform duration-700 group-hover/title:translate-x-1" />
            </div>
          </Link>
        ) : (
          <h2 className="font-medium text-[#e5e5e5] text-lg md:text-[1.4vw] min-w-[6em] mx-4 md:mx-[4%] 2xl:mx-[60px] mb-4">{title}</h2>
        ))}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 px-4 md:px-[4%] 2xl:px-[60px] gap-4 md:gap-8">
        {finalMovies.map((movie) => (
          <Card key={movie.id} movie={movie} isTv={isTv} />
        ))}
      </div>
    </div>
  );
};

export default Row;
