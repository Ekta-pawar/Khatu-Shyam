import Shimmer from "./Shimmer";

export default function EventArticleSkeleton() {
  return (
    <div className="grid overflow-hidden rounded-3xl bg-card shadow-elegant md:grid-cols-2 md:items-center">
      <Shimmer className="h-full min-h-[260px] w-full rounded-none" />
      <div className="space-y-4 p-8 md:p-12">
        <Shimmer className="h-3 w-24" />
        <Shimmer className="h-8 w-3/4" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-5/6" />
        <div className="space-y-3 pt-2">
          <Shimmer className="h-4 w-1/2" />
          <Shimmer className="h-4 w-1/2" />
          <Shimmer className="h-4 w-1/2" />
        </div>
        <Shimmer className="h-10 w-40 rounded-full" />
      </div>
    </div>
  );
}
