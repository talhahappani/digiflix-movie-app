import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoCaretDown } from "react-icons/io5";
import { movieGenres, tvGenres } from "../data/genres";

const GenreDropdown = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentGenres = type === "movie" ? movieGenres : tvGenres;
  const genreIds = Object.keys(currentGenres);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mx-1 md:mx-[30px] z-20" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center bg-black text-white border border-[hsla(0,0%,100%,.9)] px-3 py-1 hover:bg-white/10 transition-colors duration-300 text-base md:text-[1.25rem] font-medium tracking-[1px] pl-1.5 md:pl-2.5 pr-6 md:pr-[50px] h-10 text-left">
        Genres
        <IoCaretDown className={`absolute top-[35%] right-2.5`} size={14} />
      </button>

      <div className={`absolute top-10 left-0 bg-[rgba(0,0,0,0.9)] border border-[hsla(0,0%,100%,.15)] w-[250px] md:w-[400px] py-[5px] grid grid-rows-8 grid-flow-col gap-2 transition-all duration-200 origin-top-left ${isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
        {genreIds.map((id) => (
          <Link key={id} to={`/genre/${type}/${id}?name=${currentGenres[id]}`} className="text-[#e5e5e5] text-xs md:text-sm hover:underline hover:text-white py-[1px] pr-[10px] md:pr-[20px] pl-[5px] md:pl-[10px] md:whitespace-nowrap" onClick={() => setIsOpen(false)}>
            {currentGenres[id]}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreDropdown;
