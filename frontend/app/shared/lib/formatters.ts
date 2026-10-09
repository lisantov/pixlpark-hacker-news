export const dateToTimeAgo = (date: Date) => {
  const timeDiff = new Date().getTime() - date.getTime();
  const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
  if (hoursAgo === 0) return "Только что";
  else if (hoursAgo < 24) return `${hoursAgo}ч. назад`;
  return `${Math.floor(hoursAgo / 24)}д. назад`;
};
