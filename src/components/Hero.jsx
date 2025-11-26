import { IoInformationCircleOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import { genres } from "../data/genres";
import { useMovieModal } from "../context/MovieModalContext";
import { HeroSkeleton } from "./Loaders";
import Image from "./Image";

const Hero = ({ movies, loading }) => {
  const imgURL = "https://image.tmdb.org/t/p/";
  const { openModal } = useMovieModal();

  if (loading) return <HeroSkeleton />;
  if (!movies || movies.length === 0) return null;

  return (
    <div className="h-auto aspect-[16/9] md:h-screen z-0 mt-[-50px] md:mt-[-70px] overflow-hidden w-screen relative custom-background">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            const poster = movies[index]?.poster_path;
            return `
                  <div class="${className} !w-full inline-block px-[.2vw] relative whitespace-normal z-1 !h-auto !rounded-none !bg-transparent !m-0 pointer">
                    <div class=" w-full">
                      <img src="${imgURL + "w200" + poster}" class="!w-full !h-auto object-cover aspect-[2/3] rounded-[.2vw]" />
                    </div>
                  </div>
                `;
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="relative">
            <Image src={imgURL + "original" + movie.backdrop_path} alt={movie.title} className="object-cover h-full w-full" />

            <div className="top-0 left-0 right-[40%] bottom-0 custom-background-3 absolute"></div>
            <div className="px-4 xl:px-16 absolute bottom-4 md:bottom-[35%] lg:bottom-[40%] w-full md:max-w-[50%] flex gap-2 md:gap-4 flex-col">
              <div className="flex gap-4 items-center">
                <img className="object-cover h-[60px] w-[60px] md:h-[84px] md:w-[84px] rounded-lg xl:h-24 xl:w-24 2xl:w-[100px] 2xl:h[100px]" src={imgURL + "w200" + movie.poster_path} />
                <h1 className="text-white mt-[2px] p-0 leading-[27px] text-lg font-medium sm:text-xl sm:leading-[30px]sm:font-medium xl:text-2xl xl:font-medium sm:mt-[4px] xl:mt-2">{movie.title}</h1>
              </div>
              <div className="flex gap-2 items-center flex-wrap">
                {movie.genre_ids.map((genre, index) => (
                  <div className="flex items-center gap-2" key={index}>
                    <span className="text-xs md:text-base font-medium text-white">{genres[genre]}</span>
                    {index !== movie.genre_ids.length - 1 && <span className="w-[4px] h-[4px] md:w-[6px] md:h-[6px] bg-white/70 rounded-full"></span>}
                  </div>
                ))}
              </div>
              <p className="hidden md:block 2xl:text-xl xl:text-lg text-white font-medium text-sm md:text-base line-clamp-3">{movie.overview}</p>

              <button onClick={() => openModal(movie.id)} className="px-6 md:px-16 md:py-[0.8rem] text-white items-center appearance-none flex justify-center relative bg-[rgba(109,109,110,0.7)] will-change-[background-color,color] whitespace-nowrap border-none break-words w-auto gap-2 hover:bg-[rgba(109,109,110,0.4)] text-sm md:text-[1.6rem] font-medium leading-10 self-start rounded-[4px] mt-2">
                <IoInformationCircleOutline className="w-5 h-5 md:w-8 md:h-8" color="white" />
                More Info
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination hidden md:flex mt-4 absolute bottom-0 2xl:!bottom-[10%] !left-0 right-0 z-10 px-[60px]"></div>
    </div>
  );
};

export default Hero;
