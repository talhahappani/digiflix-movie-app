import Hero from "../components/Hero";
import { Spinner } from "../components/Loaders";
import Row from "../components/Row";
import { useMovies } from "../hooks/useMovies";
import { useScroll } from "../hooks/useScroll";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const HomePage = () => {
  const isScrolled = useScroll(0);
  const { movies, loading } = useMovies("/movie/now_playing");
  useDocumentTitle("Home");
  return (
    <div className="relative">
      <Hero movies={movies} loading={loading} />
      <div className={`${isScrolled ? "bg-[#141414]" : "bg-transparent"} transition-colors duration-500 2xl:px-[60px] lg:h-[68px] flex items-center left-0 top-[50px] md:top-[68px] right-0 sticky h-auto md:h-[41px] px-4 md:px-[4%] z-10 bg-[#141414] py-2 md:py-0`}>
        <div className="items-center flex flex-grow flex-wrap m-0 min-h-0 p-0">
          <div className="flex items-center justify-start flex-grow">
            <h1 className="text-2xl md:text-[38px] font-medium mr-4 text-white">Now Playing</h1>
          </div>
        </div>
      </div>
      {loading ? <Spinner /> : movies && movies.length > 0 && <Row title={null} movies={movies} isTv={false} limit={18} />}
    </div>
  );
};

export default HomePage;
