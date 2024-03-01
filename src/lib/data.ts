import { Dispatch, SetStateAction } from "react";
import { Subscription } from "rxjs";
import { DocType } from "./rxdb";
import { useDB } from "./stores/dbStore";
import { removeItem } from "./utils/arrayUtils";
import { RxDocument } from "rxdb";

export type Data = DocType & {
  date: Date;
  children?: Data[];
};

export function parseData(u: RxDocument<DocType>[]): Data[] {
  return u
    .map((v) => ({
      ...v._data,
      date: new Date(v.dateString),
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
      },
    );
}

export function updateData(setData: Dispatch<SetStateAction<Data[]>>) {
  const { user } = useDB(({ user }) => ({ user }));
  return function () {
    let sub: Subscription;
    (async function () {
      if (user)
        sub = user.find().$.subscribe((data) => {
          setData(parseData(data));
        });
    })();
    return () => {
      if (sub && sub.unsubscribe) sub.unsubscribe();
    };
  };
}

export function getYearlyData(data: Data[], year: number) {
  return data.filter((v) => v.date.getFullYear() === year && v.planned);
}

export function getMonthlyData(data: Data[], month: number, year: number) {
  return data.filter(
    (v) =>
      v.date.getFullYear() === year && v.date.getMonth() === month && v.planned,
  );
}

export function getDailyData(
  data: Data[],
  date: number,
  month: number,
  year: number,
) {
  return data.filter(
    (v) =>
      v.date.getFullYear() === year &&
      v.date.getMonth() === month &&
      v.date.getDate() === date,
  );
}
