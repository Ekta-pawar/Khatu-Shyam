import Shimmer from "./Shimmer";

export default function TeamCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-card shadow-elegant">
      <Shimmer className="aspect-4/3 w-full rounded-none" />
      <div className="space-y-3 px-6 pb-6 pt-8">
        <Shimmer className="h-6 w-2/3" />
        <Shimmer className="h-4 w-1/3" />
        <div className="space-y-2 pt-2">
          <Shimmer className="h-3 w-1/2" />
          <Shimmer className="h-3 w-2/5" />
        </div>
        <Shimmer className="h-4 w-28" />
      </div>
    </div>
  );
}
