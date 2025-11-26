import { useSearchParams } from "react-router-dom"; // URL'den veri okumak için
import { useMovies } from "../hooks/useMovies";
import Row from "../components/Row";
import { Spinner } from "../components/Loaders";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  useDocumentTitle(query ? query : "Search");

  const { movies, loading } = useMovies(query ? `/search/multi?query=${query}` : "");
  const validMovies = movies?.filter((item) => (item.poster_path || item.backdrop_path) && item.media_type !== "person");

  return (
    <div className="relative mt-9">
      {query ? (
        <>
          <div className="overflow-hidden flex mx-4 md:mx-[60px]">
            <div>
              <h1 className="text-base font-normal text-[rgba(255,255,255,0.5)]">
                Results for: <span className="text-white">&quot;{query}&quot;</span>
              </h1>
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : validMovies && validMovies.length > 0 ? (
            <Row title={null} movies={validMovies} isTv={false} />
          ) : (
            <div className="w-full text-center px-4 md:px-0">
              <div className="inline-block text-left">
                <p className="text-white text-sm md:text-xl">Your search for &quot;{query}&quot; did not have any matches.</p>
                <p className="text-white mt-2 text-left">Suggestions:</p>
                <ul className="text-white text-sm md:text-[18px] mt-4 list-disc text-left px-12">
                  <li>Try different keywords</li>
                  <li>Looking for a movie or TV show?</li>
                  <li>Try using a movie, TV show title, or an actor name</li>
                </ul>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-white">Please type something to search.</p>
      )}
    </div>
  );
};

export default SearchPage;
