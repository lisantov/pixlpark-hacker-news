import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { dateToTimeAgo, formatDate } from "./formatters";

const HOUR = 1000 * 60 * 60;
const now = new Date("2024-06-15T12:00:00.000Z");

describe("dateToTimeAgo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("возвращает «Только что» для текущего момента", () => {
    expect(dateToTimeAgo(now)).toBe("Только что");
  });

  it("возвращает «Только что» для разницы меньше часа", () => {
    expect(dateToTimeAgo(new Date(now.getTime() - HOUR + 1))).toBe(
      "Только что",
    );
  });

  it("возвращает часы для разницы меньше суток", () => {
    expect(dateToTimeAgo(new Date(now.getTime() - 3 * HOUR))).toBe(
      "3ч. назад",
    );
    expect(dateToTimeAgo(new Date(now.getTime() - 23 * HOUR))).toBe(
      "23ч. назад",
    );
  });

  it("переключается на дни ровно на 24 часах", () => {
    expect(dateToTimeAgo(new Date(now.getTime() - 24 * HOUR))).toBe(
      "1д. назад",
    );
  });

  it("возвращает дни для разницы больше суток", () => {
    expect(dateToTimeAgo(new Date(now.getTime() - 50 * HOUR))).toBe(
      "2д. назад",
    );
  });
});

describe("formatDate", () => {
  it("форматирует дату как YYYY-MM-DD HH:mm", () => {
    expect(formatDate(new Date(2024, 0, 15, 10, 30))).toBe("2024-01-15 10:30");
  });

  it("дополняет месяц, день, часы и минуты нулями", () => {
    expect(formatDate(new Date(2024, 8, 5, 3, 7))).toBe("2024-09-05 03:07");
  });
});
