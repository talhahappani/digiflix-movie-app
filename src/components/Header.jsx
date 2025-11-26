import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useScroll } from "../hooks/useScroll";
import { useState, useRef, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import { IoCaretDown } from "react-icons/io5";

const Header = () => {
  const isScrolled = useScroll(0);
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef(null);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [prevPath, setPrevPath] = useState("/");
  const { currentProfile, logoutProfile } = useProfile();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");

    if (location.pathname.includes("/search") && query) {
      setKeyword(query);
      setShowSearch(true);
    } else if (!location.pathname.includes("/search")) {
      setShowSearch(false);
      setKeyword("");
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (value.length > 0) {
      navigate(`/search?q=${value}`, { replace: true });
    } else {
      navigate(prevPath);
    }
  };

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const handleBlur = () => {
    if (!keyword) {
      setShowSearch(false);
    }
  };

  const toggleSearch = () => {
    if (!showSearch) {
      if (!location.pathname.includes("/search")) {
        setPrevPath(location.pathname);
      }
      setShowSearch(true);
    }
  };

  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
      setShowProfileMenu(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setShowProfileMenu(false);
    }
  };

  const handleClick = () => {
    setShowProfileMenu((prev) => !prev);
  };

  return (
    <header className={`${isScrolled ? "bg-[#141414]" : "bg-[linear-gradient(180deg,rgba(0,0,0,.7)_10%,transparent)]"} transition-colors duration-500 sticky top-0 h-auto z-50 w-full`}>
      <div className="bg-transparent left-0 relative right-0 top-0 z-[1]">
        <div className="bg-transparent md:h-[68px] h-[50px] z-[2] px-4 xl:px-16 xl:text-sm items-center flex relative justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="hidden md:inline-block mr-4 md:mr-6 text-xl md:text-2xl text-red-600 cursor-pointer font-bold">
              DIGIFLIX
            </NavLink>
            <ul className="items-center flex m-0 p-0">
              <li className="block md:ml-4 xl:ml-5">
                <NavLink to="/" className={({ isActive }) => `${isActive ? "font-bold text-white cursor-default" : "font-medium text-[#e5e5e5] hover:text-[#b3b3b3] cursor-pointer"} flex h-full relative transition-all duration-300 text-xs md:text-sm`}>
                  Home
                </NavLink>
              </li>
              <li className="block ml-4 xl:ml-5">
                <NavLink to="/movies" className={({ isActive }) => `${isActive ? "font-bold text-white cursor-default" : "font-medium text-[#e5e5e5] hover:text-[#b3b3b3] cursor-pointer"} font-medium flex h-full relative transition-all duration-300 text-xs md:text-sm`}>
                  Movies
                </NavLink>
              </li>
              <li className="block ml-4 xl:ml-5">
                <NavLink to="/tvshows" className={({ isActive }) => `${isActive ? "font-bold text-white cursor-default" : "font-medium text-[#e5e5e5] hover:text-[#b3b3b3] cursor-pointer"} font-normal flex h-full relative transition-all duration-300 text-xs md:text-sm`}>
                  TV Shows
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="items-center flex flex-grow h-full justify-end absolute top-0 right-[4%] xl:right-[60px]">
            <div className="mr-2 md:mr-4 flex items-center">
              <div
                className={`flex items-center border border-solid transition-all duration-300 ease-in-out overflow-hidden
                  ${showSearch ? "bg-[rgba(0,0,0,0.75)] border-[hsla(0,0%,100%,.85)] px-1 py-1" : "bg-transparent border-transparent p-0"}`}
              >
                <button onClick={toggleSearch} className="bg-transparent border-none outline-none cursor-pointer px-0.5 md:px-1.5">
                  <IoSearch color="white" size={16} className="md:w-6 md:h-6" />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Titles, people, genres"
                  className={`bg-transparent text-white text-xs md:text-sm outline-none border-none transition-all duration-300 ease-in-out
                    ${showSearch ? "w-[100px] md:w-[210px] opacity-100 ml-0 md:ml-2 pl-1" : "w-0 opacity-0 ml-0 pl-0"}`}
                  value={keyword}
                  onChange={handleSearchChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            {currentProfile && (
              <div className="flex items-center gap-2 cursor-pointer relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
                <img src={currentProfile.avatar} alt={currentProfile.name} className="w-6 h-6 md:w-8 md:h-8 rounded-md object-cover" />
                <IoCaretDown className={`text-white transition-transform ${showProfileMenu ? "rotate-180" : ""}`} size={12} />
                <div className={`absolute top-full right-0 w-40 transition-all duration-200 ${showProfileMenu ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                  <div className="pt-4">
                    <div className="bg-[rgba(0,0,0,0.9)] border border-[#333] py-2 rounded-sm shadow-lg relative z-50">
                      <div className="absolute -top-2 right-2 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white/90"></div>
                      <p className="px-4 py-2 text-white text-sm border-b border-[#333] mb-1 cursor-default flex items-center gap-2">
                        <img src={currentProfile.avatar} alt={currentProfile.name} className="w-8 h-8 rounded-md object-cover" /> {currentProfile.name}
                      </p>
                      <button onClick={logoutProfile} className="w-full text-left px-4 py-2 text-white text-sm hover:underline font-medium">
                        Sign out of Digiflix
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
