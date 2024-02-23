import rawdata from "@/data.json";
import { removeItem } from "./utils/arrayUtils";

export interface Data {
  id: number;
  type: string;
  content: string;
  page: string;
  dateString: string;
  date: Date;
  childrenIds?: number[];
  children?: Data[];
}

export const data: Data[] = rawdata
  .map((v) => ({
    date: new Date(v.dateString),
    ...v,
  }))
  .map(
    /// This parses childrenIds (w) to a children attribute which
    /// holds the data, and removes it from the main list (a).
    function parseChildren(v, _i, a) {
      if (!v.childrenIds) return v;

      const children = v.childrenIds.map((w) => {
        const v0 = a.find((x) => x.id === w);
        removeItem(a, v0);
        parseChildren(v0, 0, a);
        return v0;
      });

      return { ...v, children };
    }
  );

export function getYearlyData(year: number) {
  return data.filter((v) => v.date.getFullYear() === year && v.page === "Y");
}

export function getMonthlyData(month: number, year: number) {
  return data.filter(
    (v) =>
      v.date.getFullYear() === year &&
      v.date.getMonth() === month &&
      v.page === "M"
  );
}

export function getDailyData(date: number, month: number, year: number) {
  return data.filter(
    (v) =>
      v.date.getFullYear() === year &&
      v.date.getMonth() === month &&
      v.date.getDate() === date
  );
}
