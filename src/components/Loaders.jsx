export const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[200px]">
      <div className="w-12 h-12 border-4 border-transparent border-t-red-600 rounded-full animate-spin"></div>
    </div>
  );
};

export const Skeleton = ({ className }) => {
  return <div className={`bg-[#2f2f2f] animate-pulse rounded-md ${className}`}></div>;
};

export const SkeletonCard = () => {
  return (
    <div className="w-full">
      <Skeleton className="aspect-[2/3] w-full mb-2" />
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-6 rounded-full" />
      </div>

      <div className="flex gap-2 mb-2">
        <Skeleton className="h-3 w-10" />
        <Skeleton className="h-3 w-10" />
      </div>

      <div className="flex gap-2">
        <Skeleton className="h-2 w-12" />
        <Skeleton className="h-2 w-12" />
      </div>
    </div>
  );
};

export const HeroSkeleton = () => {
  return (
    <div className="relative h-screen w-full bg-[#141414] overflow-hidden -mt-[70px]">
      <div className="absolute inset-0 bg-[#1f1f1f] animate-pulse"></div>

      <div className="absolute bottom-[30%] left-[4%] xl:left-[60px] w-full max-w-[500px] flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-20 h-28" />
          <Skeleton className="w-64 h-8" />
        </div>

        <div className="space-y-2 mt-4">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-[90%] h-4" />
          <Skeleton className="w-[80%] h-4" />
        </div>
        <Skeleton className="w-40 h-12 mt-4 rounded-md" />
      </div>
    </div>
  );
};
