import { createContext, useContext, useState } from "react";
import Modal from "../components/Modal";
import { useMovies } from "../hooks/useMovies";
import { AnimatePresence } from "framer-motion";
import { Spinner } from "../components/Loaders";
import Image from "../components/Image";

const MovieModalContext = createContext();

export const useMovieModal = () => useContext(MovieModalContext);

// eslint-disable-next-line react/prop-types
export const MovieModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [movieId, setMovieId] = useState(null);

  const [mediaType, setMediaType] = useState("movie");

  const detailEndpoint = movieId ? `/${mediaType}/${movieId}?append_to_response=videos,credits` : null;
  const { movies: movieDetails, loading: detailLoading } = useMovies(detailEndpoint);

  const openModal = (id, type = "movie") => {
    setMovieId(id);
    setMediaType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMovieId(null);
    setMediaType("movie");
  };
  const imgURL = "https://image.tmdb.org/t/p/original/";
  const imgURLSmall = "https://image.tmdb.org/t/p/w200";
  const title = movieDetails?.title || movieDetails?.name;
  const date = movieDetails?.release_date || movieDetails?.first_air_date;
  const year = date ? date.substring(0, 4) : "N/A";

  const modalContent = (
    <>
      <AnimatePresence>
        {isOpen && (
          <Modal isOpen={isOpen} onClose={closeModal}>
            {detailLoading || !movieDetails ? (
              <div className="w-full h-[300px] md:h-[500px] flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="rounded-t-md overflow-hidden bg-black cursor-pointer relative">
                  {(() => {
                    const trailer = movieDetails.videos?.results?.find((vid) => vid.type === "Trailer" && vid.site === "YouTube" && vid.official);
                    const anyTrailer = movieDetails.videos?.results?.find((vid) => vid.type === "Trailer" && vid.site === "YouTube");
                    const firstVideo = movieDetails.videos?.results?.[0];

                    const videoToPlay = trailer || anyTrailer || firstVideo;

                    if (videoToPlay && videoToPlay.site === "YouTube") {
                      const embedUrl = `https://www.youtube.com/embed/${videoToPlay.key}?autoplay=1&mute=0&controls=0&loop=1&playlist=${videoToPlay.key}&modestbranding=1&rel=0&iv_load_policy=3`;

                      return (
                        <>
                          <div className="relative pt-[56.25%]">
                            <iframe src={embedUrl} title={videoToPlay.name || title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute top-0 left-0 w-full h-full"></iframe>
                          </div>
                          <div className="h-full top-0 w-full absolute custom-background-2 pointer-events-none"></div>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <div className="w-full relative">
                            <Image src={imgURL + movieDetails.backdrop_path} alt={title} className="object-cover aspect-[16/9] w-full" />
                          </div>
                          <div className="h-full top-0 w-full absolute custom-background-2 pointer-events-none"></div>
                        </>
                      );
                    }
                  })()}
                  <div className="flex gap-4 items-center z-20 w-[90%] md:w-[70%] bottom-4 left-4 md:bottom-0 md:left-12 absolute">
                    <div className="h-[60px] w-[60px] md:h-[84px] md:w-[84px] xl:h-24 xl:w-24 2xl:w-[100px] 2xl:h-[100px] rounded-sm overflow-hidden shadow-lg hidden md:block">
                      <Image src={imgURLSmall + movieDetails.poster_path} className="w-full h-full object-fill" />
                    </div>
                    <div className="flex flex-col justify-center gap-1 md:gap-2">
                      <h1 className="text-white mt-[2px] p-0 leading-[27px] text-lg font-medium sm:text-xl sm:leading-[30px]sm:font-medium xl:text-2xl xl:font-medium">{title}</h1>
                      <div className="flex gap-2 items-center">
                        {movieDetails.genres?.map((genre, index) => (
                          <div className="flex items-center gap-2" key={index}>
                            <span className="text-xs md:text-base font-medium text-[rgb(188,188,188)]">{genre.name}</span>
                            {index !== movieDetails.genres.length - 1 && <span className="w-[6px] h-[6px] bg-white/70 rounded-full"></span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:grid relative w-full md:grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] gap-y-6 md:gap-x-8 px-4 md:px-12 mt-4">
                  <p className="text-sm md:text-base text-[#d2d2d2] md:text-white">{movieDetails.overview}</p>
                  <div className="flex flex-col justify-start gap-2">
                    <span className="text-[#777] text-sm">
                      Categories:
                      {movieDetails.genres?.map((genre, index) => (
                        <span className="text-white" key={index}>
                          &nbsp;
                          {genre.name}
                          {index !== movieDetails.genres.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                    <span className="text-[#777] text-sm">
                      Release Year:
                      <span className="text-white"> {year}</span>
                    </span>
                    <span className="text-[#777] text-sm">
                      Rating:
                      {movieDetails.vote_average > 0 && <span className="text-white"> {movieDetails.vote_average?.toFixed(1)} / 10</span>}
                    </span>
                  </div>
                </div>
              </>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <MovieModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalContent}
    </MovieModalContext.Provider>
  );
};
