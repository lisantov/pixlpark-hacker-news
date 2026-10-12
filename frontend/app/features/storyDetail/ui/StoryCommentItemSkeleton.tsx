export default function StoryCommentItemSkeleton() {
  return (
    <article className="w-full flex flex-col gap-3 p-5 bg-white rounded-2xl border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="h-4 w-24 rounded-lg bg-gray-100 animate-pulse" />
        <div className="h-4 w-16 rounded-lg bg-gray-100 animate-pulse" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-4 w-full rounded-lg bg-gray-100 animate-pulse" />
        <div className="h-4 w-11/12 rounded-lg bg-gray-100 animate-pulse" />
        <div className="h-4 w-2/3 rounded-lg bg-gray-100 animate-pulse" />
      </div>
    </article>
  );
}
