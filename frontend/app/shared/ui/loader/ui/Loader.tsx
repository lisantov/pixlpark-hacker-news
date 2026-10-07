import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className="flex flex-col gap-2 items-center">
      <p className="text-xl font-medium text-orange-400">Hacker News</p>
      <div className={styles.barLoader}></div>
    </div>
  );
}
