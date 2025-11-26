import { useMovieModal } from "../context/MovieModalContext";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { genres } from "../data/genres";
import Image from "./Image";

const Card = ({ movie, isTv }) => {
  const { openModal } = useMovieModal();
  isTv = isTv || movie.media_type === "tv";
  const date = movie?.release_date || movie?.first_air_date;
  const year = date ? date.substring(0, 4) : "-";
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <div key={movie.id} className="rounded-[.2vw] overflow-hidden transition-all duration-500 hover:scale-105">
      <div className="aspect-[2/3] w-full cursor-pointer" onClick={() => openModal(movie.id, isTv ? "tv" : "movie")}>
        <Image src={posterUrl} alt={movie.title || movie.name} className="w-full h-full" />
      </div>
      <div className="flex items-center gap-2 justify-between mt-2 cursor-pointer" onClick={() => openModal(movie.id, isTv ? "tv" : "movie")}>
        <p className="text-base md:text-xl text-white font-medium line-clamp-1">{movie.title || movie.name}</p>
        <IoChevronDownCircleOutline size={32} color="white" className="min-w-8" />
      </div>
      <div className="flex items-center gap-2 mt-1 md:mt-2">
        <p className="text-xs md:text-sm xl:text-base font-medium text-[#bcbcbc]">{year}</p>
        {movie?.vote_average > 0 && <span className="text-xs md:text-sm xl:text-base font-medium text-[#bcbcbc]"> {movie?.vote_average?.toFixed(1)} / 10</span>}
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        {movie.genre_ids?.map((genre, index) =>
          index < 3 ? (
            <div className="flex items-center gap-2" key={index}>
              <span className="text-[10px] md:text-sm xl:text-base font-medium text-[#bcbcbc]">{genres[genre]}</span>
              {index !== movie.genre_ids.length - 1 && index !== 2 && <span className="w-[4px] h-[4px] md:w-[6px] md:h-[6px] bg-white/70 rounded-full"></span>}
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default Card;
