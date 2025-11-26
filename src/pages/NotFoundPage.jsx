import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const NotFoundPage = () => {
  useDocumentTitle();
  return (
    <div className="h-screen flex flex-col items-center justify-center text-white text-center px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl mb-4">Lost your way?</h2>
      <p className="text-gray-400 mb-8">Sorry, we can&apos;t find that page. You&apos;ll find loads to explore on the home page.</p>
      <Link to="/" className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-opacity-80 transition">
        Digiflix Home
      </Link>
    </div>
  );
};
export default NotFoundPage;
