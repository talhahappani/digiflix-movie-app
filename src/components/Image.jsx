import { useState } from "react";
import { Skeleton } from "./Loaders";
import { IoImageOutline } from "react-icons/io5";

const Image = ({ src, alt, className, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isInvalidSrc = !src || src.includes("null") || src.includes("undefined");

  if (isInvalidSrc || hasError) {
    return (
      <div className={`bg-[#1f1f1f] flex flex-col items-center justify-center text-[#444] ${className}`}>
        <IoImageOutline size={40} />
        <span className="text-xs font-medium mt-1 uppercase tracking-widest opacity-50">No Image</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && <Skeleton className="absolute inset-0 w-full h-full z-10" />}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        {...props}
      />
    </div>
  );
};

export default Image;
