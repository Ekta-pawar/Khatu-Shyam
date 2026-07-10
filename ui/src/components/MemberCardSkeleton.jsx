import Shimmer from "./Shimmer";

export default function MemberCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <Shimmer className="h-60 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Shimmer className="h-5 w-2/3" />
        <Shimmer className="h-4 w-1/3" />
        <div className="space-y-2 pt-2">
          <Shimmer className="h-3 w-1/2" />
          <Shimmer className="h-3 w-2/5" />
        </div>
        <Shimmer className="h-4 w-24" />
      </div>
    </div>
  );
}
