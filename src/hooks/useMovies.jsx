import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.themoviedb.org/3";

export const useMovies = (endpoint) => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!endpoint) {
      setMovies(null);
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const seperator = endpoint.includes("?") ? "&" : "?";
        let url = `${API_URL}${endpoint}${seperator}api_key=${API_KEY}`;
        if (endpoint.startsWith("/movie/") && !endpoint.includes("now_playing")) {
          url += "&append_to_response=videos";
        }
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results || data);
      } catch (err) {
        console.error("Fetch error:", err);
        setMovies(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint]);

  return { movies, loading };
};
