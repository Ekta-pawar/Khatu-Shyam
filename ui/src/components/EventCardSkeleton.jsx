import Shimmer from "./Shimmer";

export default function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-yellow-100 shadow">
      <Shimmer className="aspect-[4/3] w-full" />

      <div className="p-6 space-y-3">
        <Shimmer className="h-6 w-3/4" />
        <Shimmer className="h-4 w-1/2" />
        <Shimmer className="h-4 w-2/3" />
      </div>
    </div>
  );
}
