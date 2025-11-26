import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import TvShowsPage from "./pages/TvShowsPage";
import SearchPage from "./pages/SearchPage";
import GenrePage from "./pages/GenrePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfileSelectionPage from "./pages/ProfileSelectionPage";
import { Routes, Route } from "react-router-dom";
import { MovieModalProvider } from "./context/MovieModalContext";
import { ProfileProvider, useProfile } from "./context/ProfileContext";

const MainContent = () => {
  const { currentProfile } = useProfile();
  if (!currentProfile) {
    return <ProfileSelectionPage />;
  }

  return (
    <main className="min-h-screen min-w-[100vw] bg-[#141414]">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tvshows" element={<TvShowsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/genre/:type/:genreId" element={<GenrePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
};

function App() {
  return (
    <ProfileProvider>
      <MovieModalProvider>
        <MainContent />
      </MovieModalProvider>
    </ProfileProvider>
  );
}

export default App;
