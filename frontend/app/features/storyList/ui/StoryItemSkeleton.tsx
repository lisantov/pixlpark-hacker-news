import styles from "./StoryItem.module.css";

export default function StoryItemSkeleton() {
  return (
    <article className="w-full p-4 flex flex-col gap-6 bg-gray-50 rounded-2xl">
      <div className="flex-1 flex justify-between items-start">
        <div className="flex-1 flex flex-col gap-2">
          <div
            className={"w-full max-w-md h-8 rounded-xl " + styles.skeleton}
          ></div>
          <div
            className={"w-full max-w-40 h-5 rounded-xl " + styles.skeleton}
          ></div>
        </div>
        <div
          className={"flex-1 w-full max-w-25 h-8 rounded-xl " + styles.skeleton}
        ></div>
      </div>
      <div className="flex-1 flex justify-end gap-2 items-center">
        <div
          className={
            "flex-1 w-full max-w-2xs h-12 rounded-xl " + styles.skeleton
          }
        ></div>
      </div>
    </article>
  );
}
