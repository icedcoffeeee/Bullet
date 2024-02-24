import { DocType, getDB } from "@/lib/rxdb";
import { removeItem } from "./utils/arrayUtils";
import { Dispatch, SetStateAction } from "react";
import { Subscription } from "rxjs";

export interface Data {
  id: number;
  type: string;
  content: string;
  dateString: string;
  plan: boolean;
  childrenIds?: number[];
  date: Date;
  children?: Data[];
}

export function parseData(u: DocType[]) {
  return u
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
}

export function updateData(setData: Dispatch<SetStateAction<Data[]>>) {
  return function () {
    let sub: Subscription;
    (async function () {
      sub = (await getDB())
        .find()
        .$.subscribe((data) => setData(parseData(data)));
    })();
    return () => {
      if (sub && sub.unsubscribe) sub.unsubscribe();
    };
  };
}

export function getYearlyData(data: Data[], year: number) {
  return data.filter((v) => v.date.getFullYear() === year && v.plan);
}

export function getMonthlyData(data: Data[], month: number, year: number) {
  return data.filter(
    (v) =>
      v.date.getFullYear() === year && v.date.getMonth() === month && v.plan
  );
}

export function getDailyData(
  data: Data[],
  date: number,
  month: number,
  year: number
) {
  return data.filter(
    (v) =>
      v.date.getFullYear() === year &&
      v.date.getMonth() === month &&
      v.date.getDate() === date
  );
}
