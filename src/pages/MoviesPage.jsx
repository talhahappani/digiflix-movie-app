import Row from "../components/Row";
import GenreDropdown from "../components/GenreDropdown";
import { genres, movieGenres } from "../data/genres";
import { useScroll } from "../hooks/useScroll";
import { useMovies } from "../hooks/useMovies";
import { useMovieModal } from "../context/MovieModalContext";
import { IoInformationCircleOutline } from "react-icons/io5";
import { HeroSkeleton } from "../components/Loaders";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const movieGenreIds = Object.keys(movieGenres);

const MoviesPage = () => {
  useDocumentTitle("Movies");
  const isScrolled = useScroll(0);
  const { movies: heroMovies, loading: heroLoading } = useMovies("/movie/popular");
  const { openModal } = useMovieModal();
  const imgURL = "https://image.tmdb.org/t/p/";
  const heroMovie = !heroLoading && heroMovies.length > 0 ? heroMovies[0] : null;

  if (heroLoading) return <HeroSkeleton />;

  return (
    <div className="relative">
      {heroMovie && (
        <div className="h-auto aspect-[16/9] md:h-screen z-0 mt-[-50px] md:mt-[-70px] overflow-hidden w-screen relative custom-background max-w-full">
          <img className="object-cover h-full w-full" src={imgURL + "original" + heroMovie.backdrop_path} alt={heroMovie.title} />
          <div className="top-0 left-0 right-[40%] bottom-0 custom-background-3 absolute"></div>
          <div className="px-4 xl:px-16 absolute bottom-4 md:bottom-[40%] max-w-full md:max-w-[50%] flex gap-2 md:gap-4 flex-col pl-4">
            <div className="flex gap-2 md:gap-4 items-center">
              <img className="object-cover h-[60px] w-[60px] md:h-[84px] md:w-[84px] rounded-lg xl:h-24 xl:w-24 2xl:w-[100px] 2xl:h[100px]" src={imgURL + "w200" + heroMovie.poster_path} alt="poster" />
              <h1 className="text-white mt-[2px] p-0 leading-[27px] text-lg font-medium sm:text-xl sm:leading-[30px] sm:font-medium xl:text-2xl xl:font-medium sm:mt-[4px] xl:mt-2">{heroMovie.title}</h1>
            </div>

            <div className="flex gap-2 items-center flex-wrap">
              {heroMovie.genre_ids.map((genre, index) => (
                <div className="flex items-center gap-2" key={index}>
                  <span className="text-xs md:text-base font-medium text-white">{genres[genre]}</span>
                  {index !== heroMovie.genre_ids.length - 1 && <span className="w-[4px] h-[4px] md:w-[6px] md:h-[6px] bg-white/70 rounded-full"></span>}
                </div>
              ))}
            </div>

            <p className="hidden md:block 2xl:text-xl xl:text-lg text-white font-medium text-sm line-clamp-3">{heroMovie.overview}</p>

            <button onClick={() => openModal(heroMovie.id)} className="px-6 md:px-16 py-2 md:py-[0.8rem] text-white items-center appearance-none flex justify-center relative bg-[rgba(109,109,110,0.7)] will-change-[background-color,color] whitespace-nowrap border-none break-words w-auto gap-2 hover:bg-[rgba(109,109,110,0.4)] text-sm md:text-[1.6rem] font-medium leading-10 self-start rounded-[4px] mt-2">
              <IoInformationCircleOutline className="w-5 h-5 md:w-8 md:h-8" color="white" />
              More Info
            </button>
          </div>
        </div>
      )}

      <div className={`${isScrolled ? "bg-[#141414]" : "bg-transparent"} transition-colors duration-500 2xl:px-[60px] lg:h-[68px] flex items-center left-0 top-[50px] md:top-[68px] right-0 sticky h-auto md:h-[41px] px-4 md:px-[4%] z-10 bg-[#141414] py-2 md:py-0`}>
        <div className="items-center flex flex-grow flex-wrap m-0 min-h-0 p-0">
          <div className="flex items-center justify-start flex-grow">
            <h1 className="text-2xl md:text-[38px] font-medium mr-4 text-white">Movies</h1>
            <GenreDropdown type="movie" />
          </div>
        </div>
      </div>
      {movieGenreIds.map((id) => (
        <Row key={id} title={genres[id]} endpoint={`/discover/movie?with_genres=${id}`} limit={6} genreId={id} isTv={false} />
      ))}
    </div>
  );
};

export default MoviesPage;
