import { Skeleton } from "@/components/ui/skeleton";

const LinksSkeletons = () => {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="w-auto h-[80px] rounded" />
      ))}
    </div>
  );
};

export default LinksSkeletons;
